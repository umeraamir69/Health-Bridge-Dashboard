import AuditLog from "@/models/AuditLog";
import { getClientIp } from "request-ip";
import useragent from "useragent";

/**
 * Audit logger middleware
 * Logs sensitive operations like updates, deletions, etc.
 *
 * @param {String} action - The type of operation (e.g. 'UPDATE_PROFILE')
 * @param {Object} oldData - The previous data (optional)
 * @param {Object} newData - The new/changed data (optional)
 */
const auditLogger = async (req, action, oldData = {}, newData = {}) => {
  try {
    const userId = req.user?._id || null;
    const ip = getClientIp(req);
    const agent = useragent.parse(req.headers["user-agent"]);
    const userAgent = `${agent.family} ${agent.major} on ${agent.os.family}`;

    const changedData = {
      before: oldData || null,
      after: newData || null
    };

    const log = new AuditLog({
      userId,
      action,
      changedData,
      ip,
      userAgent
    });

    await log.save();
  } catch (error) {
    console.error("❌ Audit log error:", error);
  }
};

export default auditLogger;
