import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('companor');

  const { foodByRestaurantName, page = 1, limit = 10 } = req.query; 

  var foodByRestaurant = null;

  if(foodByRestaurantName){
    let restaurant = await db.collection('restaurants').findOne({
      name: { $regex: foodByRestaurantName, $options: 'i' }
    });

    if(restaurant){
      foodByRestaurant = restaurant._id;
    }
  }

  try {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;

    let foodItems = await db.collection('fooditems')
      .find({ 'restaurants.restaurantId': new ObjectId(foodByRestaurant) })
      .skip(skip)
      .limit(limitInt)
      .toArray();

    const restaurant = await db.collection('restaurants').findOne({ _id: new ObjectId(foodByRestaurant) });
    
    const totalItems = await db.collection('fooditems')
      .countDocuments({ 'restaurants.restaurantId': new ObjectId(foodByRestaurant) });
    const totalPages = Math.ceil(totalItems / limitInt);

    foodItems = await Promise.all(foodItems.map(async (item) => {
      const city = await db.collection('cities').findOne({ _id: new ObjectId(item.city) });

      return {
        ...item, 
        city: city ? city.cityName : null,
        restaurant: restaurant.name
      };
    }));

    res.json({ foodItems, totalPages, currentPage: pageInt });
  } catch (error) {
    console.error('Error fetching food items by restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
