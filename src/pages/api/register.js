// src/pages/api/register.js

import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { hash } from "bcryptjs";
import { registerUserSchema } from "../../../lib/validators/registerUserSchema";
import { logRequest } from "../../../lib/logRequest";
import auditLogger from "../../../lib/auditLogger";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const parsed = registerUserSchema.safeParse(req.body);

    if (!parsed.success) {
      await logRequest(req, { success: false, error: "Invalid input", details: parsed.error });
      return res.status(400).json({ error: "Invalid input", issues: parsed.error.errors });
    }

    const { email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await logRequest(req, { success: false, error: "User already exists" });
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Create new user
    const newUser = await User.create({ ...parsed.data, passwordHash });

    await auditLogger(req, newUser._id, "user", "create", "New user registration");
    await logRequest(req, { success: true, userId: newUser._id });

    return res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    console.error("Registration error:", err);
    await logRequest(req, { success: false, error: "Internal server error", details: err.message });
    return res.status(500).json({ error: "Internal server error" });
  }
}
