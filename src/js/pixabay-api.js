import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = searchedQuery => {
  const params = new URLSearchParams({
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    key: '45452240-d9bf2a206a145f9e2645b735d',
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
