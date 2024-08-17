import axios from 'axios';

export async function fetchImages(query, currentPage) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '45452240-d9bf2a206a145f9e2645b735d',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: currentPage,
  });

  const response = await axios.get('', { params });
  return response.data;
}
