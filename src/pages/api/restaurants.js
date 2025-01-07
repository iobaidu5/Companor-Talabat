import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('companor');

  const { cityId } = req.query;
  console.log("cityId -: ", cityId);

  // Convert cityId to an ObjectId
  const restaurants = await db.collection('restaurants').find({ cityId: new ObjectId(cityId) }).toArray();
  
  console.log("restaurants -: ", restaurants);
  res.json({ restaurants });
}
