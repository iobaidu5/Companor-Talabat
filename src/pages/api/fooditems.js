import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('scrapped');

    const { cityId, restaurantId, page = 1, limit = 8 } = req.query;

    // Validate and parse page/limit as numbers
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 8);

    // Fetch city and restaurant details
    const city = await db.collection('cities').findOne({ _id: new ObjectId(cityId) });
    const restaurant = await db.collection('restaurants').findOne({ _id: new ObjectId(restaurantId) });

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Calculate the number of documents to skip
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch food items with pagination
    const foodItems = await db.collection('fooditems')
      .find({
        city: new ObjectId(cityId),
        'restaurants.restaurantId': new ObjectId(restaurantId),
      })
      .skip(skip)
      .limit(itemsPerPage)
      .toArray();

    const totalItems = await db.collection('fooditems').countDocuments({
      city: new ObjectId(cityId),
      'restaurants.restaurantId': new ObjectId(restaurantId),
    });

    const foodItemsWithCityName = foodItems.map((item) => ({
      ...item,
      city: city.cityName,
      restaurant: restaurant.name,
    }));

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Send response with paginated food items
    res.json({
      foodItems: foodItemsWithCityName,
      totalItems,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
