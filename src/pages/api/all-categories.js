import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('scrapped');

    const categories = await db.collection('fooditems').distinct('category');

    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    }

    const limitedCategories = categories.slice(0, 20);

    res.status(200).json({ categories: limitedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
