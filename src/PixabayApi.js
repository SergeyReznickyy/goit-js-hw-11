import axios from 'axios';

const API_KEY = '39778143-5903b31245878590f4fb837ac';

export const pixabayApi = (query, perPage, currentPage) =>
  axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`
  );
