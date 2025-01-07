import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('companor');

    const { category, page = 1, limit = 10 } = req.query;

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    // const foodItems = await db
    //   .collection('fooditems')
    //   .find({ category })
    //   .skip(skip)
    //   .limit(limitNumber)
    //   .toArray();

    const foodItems = await db.collection('fooditems')
      .aggregate([
        { $match: { category } },
        {
          $group: {
            _id: "$itemName",
            doc: { $first: "$$ROOT" }
          }
        },
        { $replaceRoot: { newRoot: "$doc" } },
        { $skip: skip },
        { $limit: limitNumber }
      ])
      .toArray();

    const totalItems = await db.collection('fooditems').countDocuments({ category });
    const totalPages = Math.ceil(totalItems / limitNumber);

    const updatedFoodItems = await Promise.all(
      foodItems.map(async (item) => {
        const city = await db
          .collection('cities')
          .findOne({ _id: new ObjectId(item.city) });
        const cityName = city ? city.cityName : 'Unknown';

        const restaurant = await db.collection('restaurants').findOne({ _id: new ObjectId(item.restaurants[0]?.restaurantId) });
        const restaurantName = restaurant ? restaurant.name : 'Unknown';

        return {
          ...item,
          city: cityName,
          restaurant: restaurantName,
        };
      })
    );

    res.status(200).json({ foodItems: updatedFoodItems, currentPage: pageNumber, totalPages, totalItems });
  } catch (error) {
    console.error('Error fetching food items by category:', error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
}
