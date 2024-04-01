import axios from 'axios';

export async function searchImages(query, currentPage) {
  const API_KEY = '43146865-68c1cea507737b224ce08763a';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const res = await axios.get(BASE_URL, { params });
  return res.data;
}
