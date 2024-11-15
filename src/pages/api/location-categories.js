import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  try {
    // Fetch the names and IDs of up to 10 cities
    const cities = await db.collection('cities')
      .find({}, { projection: { _id: 1, cityName: 1, country: 1 } }) // Select only `_id` and `cityName` fields
      .limit(10) // Limit the response to 10 cities
      .toArray();

    res.json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
