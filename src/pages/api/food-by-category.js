// /pages/api/food-by-category.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('scrapped');

    const { category, page = 1, limit = 10 } = req.query;

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const foodItems = await db
      .collection('fooditems')
      .find({ category })
      .skip(skip)
      .limit(limitNumber)
      .toArray();

    const totalItems = await db.collection('fooditems').countDocuments({ category });
    const totalPages = Math.ceil(totalItems / limitNumber);

    res.status(200).json({ foodItems, page: pageNumber, totalPages, totalItems });
  } catch (error) {
    console.error('Error fetching food items by category:', error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
}
