import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('scrapped');

    const { foodItemId } = req.query;

    if (!foodItemId) {
      return res.status(400).json({ error: 'Food item ID is required' });
    }

    const foodItem = await db.collection('fooditems').findOne({
      _id: new ObjectId(foodItemId),
    });

    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    const city = await db.collection('cities').findOne({
      _id: new ObjectId(foodItem.city),
    });

    const restaurant = await db.collection('restaurants').findOne({
      _id: new ObjectId(foodItem.restaurants[0].restaurantId),
    });

    const foodItemWithDetails = {
      ...foodItem,
      city: city ? city.cityName : 'City not found',
      restaurant: restaurant ? restaurant.name : 'Restaurant not found',
    };

    res.json(foodItemWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
