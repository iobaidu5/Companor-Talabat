// /pages/api/food-items-by-city.js
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  const { foodByCity, page = 1, limit = 10 } = req.query;  // Default to page 1, 10 items per page

  try {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;

    // Fetch food items with pagination
    const foodItems = await db.collection('fooditems')
      .find({ city: new ObjectId(foodByCity) })
      .skip(skip)
      .limit(limitInt)
      .toArray();

    // Get total count of food items for the city to calculate total pages
    const totalItems = await db.collection('fooditems')
      .countDocuments({ city: new ObjectId(foodByCity) });
    const totalPages = Math.ceil(totalItems / limitInt);

    res.json({ foodItems, totalPages, currentPage: pageInt });
  } catch (error) {
    console.error('Error fetching food items by city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
