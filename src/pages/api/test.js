//test

import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {
  
  try {
    const client = await clientPromise;
    const db = client.db(); // default DB from URI
    const collections = await db.listCollections().toArray();

    return res.status(200).json({  collections });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}




