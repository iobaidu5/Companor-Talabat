const getImageFromGoogleSearch = async (itemName) => {
  const apiKey = 'YOUR_GOOGLE_API_KEY';
  const cx = 'YOUR_SEARCH_ENGINE_ID';
  
  const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${itemName}&cx=${cx}&key=${apiKey}&searchType=image`);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].link; 
  }

  return '/assets/images/img-placeholder.svg';
};
