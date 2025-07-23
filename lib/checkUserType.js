// middleware/checkUserType.js

import jwt from 'jsonwebtoken';
import clientPromise from '../../lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET; // Make sure this is set in your .env

export const checkUserType = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Authentication token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ _id: new globalThis.ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach role and user info to the request for further use
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    return user.role; // You can return or use this inside your API handler

  } catch (error) {
    console.error("Auth check failed:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
