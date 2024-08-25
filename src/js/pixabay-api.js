import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchedQuery, page) => {
  const axiosOptions = {
    params: {
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
      key: '45452240-d9bf2a206a145f9e2645b735d',
    },
  };

  const response = await axios.get('', axiosOptions);
  return response.data;
};
