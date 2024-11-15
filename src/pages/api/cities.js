// /pages/api/cities.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  const cities = await db.collection('cities').find().toArray();
  res.json({ cities });
}
