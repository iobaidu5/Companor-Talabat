import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('scrapped');

  try {
    // Use MongoDB aggregation to get distinct categories and limit the results to 10
    const categories = await db.collection('fooditems')
      .aggregate([
        { $group: { _id: "$category" } }, // Group by category to get unique categories
        { $limit: 10 }, // Limit to 10 categories
        { $project: { title: "$_id", _id: 0 } } // Format result with title key
      ])
      .toArray();

    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
