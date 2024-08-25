import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-btn');
let lightbox = new SimpleLightbox('.js-gallery a', { captionsData: 'alt' });

let currentPage = 1;
let searchedValue = '';
let cardHeight = 0;
const perPage = 15;

const renderGallery = images => {
  const galleryCardsTemplate = images
    .map(imgDetails => createGalleryCardTemplate(imgDetails))
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

  const galleryCardEl = galleryEl.querySelector('li');
  if (galleryCardEl) {
    cardHeight = galleryCardEl.getBoundingClientRect().height;
  }

  lightbox.refresh();
};

const checkEndOfResults = totalHits => {
  const totalPages = Math.ceil(totalHits / perPage);
  if (currentPage >= totalPages) {
    loadMoreBtnEl.classList.add('is-hidden');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    loadMoreBtnEl.classList.remove('is-hidden');
  }
};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchedValue = searchFormEl.elements.user_query.value.trim();
    currentPage = 1;

    if (searchedValue === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search term.',
        position: 'topRight',
      });
      return;
    }

    loader.classList.remove('is-hidden');

    const response = await fetchImages(searchedValue, currentPage);

    if (response.data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    galleryEl.innerHTML = '';
    renderGallery(response.data.hits);
    checkEndOfResults(response.data.totalHits);
  } catch (err) {
    console.error(err);
  } finally {
    loader.classList.add('is-hidden');
  }
};

const onLoadMoreBtnClick = async () => {
  try {
    currentPage++;

    const response = await fetchImages(searchedValue, currentPage);
    renderGallery(response.data.hits);

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    checkEndOfResults(response.data.totalHits);
  } catch (error) {
    console.error(error);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
