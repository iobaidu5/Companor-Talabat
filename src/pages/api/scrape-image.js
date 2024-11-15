// /pages/api/scrape-image.js

import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { link, itemName } = req.query;
    
    if (!link || !itemName) {
      return res.status(400).json({ error: 'Missing required parameters: link and itemName' });
    }

    // Fetch the page HTML
    const response = await axios.get(link);
    const html = response.data;
    
    // Use Cheerio to parse the HTML and find the image source based on itemName
    const $ = cheerio.load(html);
    let imageSrc = null;

    $('img').each((i, img) => {
      const altText = $(img).attr('alt');
      if (altText && altText.includes(itemName)) {
        imageSrc = $(img).attr('src');
        return false; // Break out of the loop once we find the match
      }
    });

    // Check if an image was found
    if (!imageSrc) {
      return res.status(404).json({ error: 'Image not found for the provided itemName' });
    }

    res.status(200).json({ imageSrc });
  } catch (error) {
    console.error('Error scraping image:', error);
    res.status(500).json({ error: 'Failed to scrape image' });
  }
}
