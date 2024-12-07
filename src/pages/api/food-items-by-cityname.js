// /pages/api/food-items-by-city.js
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  const { cityName, page = 1, limit = 10 } = req.query; 

  var foodByCity = null;

  if(cityName){
    let cityId = await db.collection('cities').findOne({
      cityName: { $regex: cityName, $options: 'i' }
    });
    if(cityId){
      foodByCity = cityId._id;
    }
  }

  try {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;

    let foodItems = await db.collection('fooditems')
      .find({ city: new ObjectId(foodByCity) })
      .skip(skip)
      .limit(limitInt)
      .toArray();


    let cityName = await db.collection('cities').findOne({ _id: new ObjectId(foodByCity) });
    const restaurant = await db.collection('restaurants').findOne({ cityId: new ObjectId(foodByCity) });

    const totalItems = await db.collection('fooditems')
      .countDocuments({ city: new ObjectId(foodByCity) });
    const totalPages = Math.ceil(totalItems / limitInt);

    foodItems = foodItems.map(item => ({
      ...item, 
      city: cityName.cityName,
      restaurant: restaurant.name
    }));  

    res.json({ foodItems, totalPages, currentPage: pageInt });
  } catch (error) {
    console.error('Error fetching food items by city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
