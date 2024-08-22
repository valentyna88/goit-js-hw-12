import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = searchedQuery => {
  const axiosOptions = {
    params: {
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      key: '45452240-d9bf2a206a145f9e2645b735d',
    },
  };

  return axios.get(``, axiosOptions);
};
