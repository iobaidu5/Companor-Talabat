// /pages/api/fooditems.js
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  const { cityId, restaurantId } = req.query;

  const foodItems = await db.collection('fooditems').find({
    city: new ObjectId(cityId),
    'restaurants.restaurantId': new ObjectId(restaurantId)
  }).toArray();

  res.json({ foodItems });
}
