import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const skip = (page - 1) * limit;
    const foodItems = await db
      .collection('fooditems')
      .find({ itemName: { $regex: query, $options: 'i' } })
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    const totalItems = await db
      .collection('fooditems')
      .countDocuments({ itemName: { $regex: query, $options: 'i' } });

    const totalPages = Math.ceil(totalItems / limit);

    res.json({ foodItems, totalPages });
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
