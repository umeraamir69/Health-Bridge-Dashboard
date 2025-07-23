// middleware/logRequest.js

import RequestLog from "@/models/RequestLog";
import UAParser from "ua-parser-js";
import geoip from "geoip-lite";

// Optional: use high-res timers
const getHrTimeDurationMs = (start) => {
  const diff = process.hrtime(start);
  return Math.round((diff[0] * 1e9 + diff[1]) / 1e6); // ms
};

export const logRequest = async (req, res, next) => {
  const start = process.hrtime();

  const parser = new UAParser(req.headers['user-agent']);
  const ua = parser.getResult();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const geo = geoip.lookup(ip);

  const requestData = {
    method: req.method,
    endpoint: req.url,
    status: "success", // default, will update later
    statusCode: 200,
    ip,
    userAgent: req.headers['user-agent'],
    platform: ua.os.name || "",
    deviceType: ua.device.type || "desktop",
    appSource: req.headers['x-app-source'] || "dashboard",
    appVersion: req.headers['x-app-version'] || "",
    userId: req.user?.id || null,
    headers: req.headers,
    queryParams: req.query || {},
    body: sanitizeBody(req.body),
    referrer: req.headers['referer'] || "",
    geoLocation: geo || {},
    tags: [],
  };

  // Save later to update duration & error
  res.on('finish', async () => {
    requestData.statusCode = res.statusCode;
    requestData.status = res.statusCode >= 400 ? "error" : "success";
    requestData.responseTimeMs = getHrTimeDurationMs(start);

    if (res.locals && res.locals.logMessage) {
      requestData.message = res.locals.logMessage;
    }

    if (res.locals && res.locals.errorStack) {
      requestData.errorStack = res.locals.errorStack;
    }

    try {
      await RequestLog.create(requestData);
    } catch (err) {
      console.error("Error logging request:", err);
    }
  });

  if (next) next(); // for Express-style, otherwise ignore in Next.js
};

// Optional: remove sensitive data
const sanitizeBody = (body) => {
  if (!body || typeof body !== "object") return {};
  const clean = { ...body };
  delete clean.password;
  delete clean.token;
  return clean;
};
