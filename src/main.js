import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');
let lightbox = new SimpleLightbox('.js-gallery a');
let searchedValue = '';
let page = 1;

const showLoader = () => loader.classList.remove('is-hidden');
const hideLoader = () => loader.classList.add('is-hidden');
const showLoadBtn = () => loadBtn.classList.remove('is-hidden');
const hideLoadBtn = () => loadBtn.classList.add('is-hidden');

const onSearchFormSubmit = async event => {
  event.preventDefault();
  page = 1;

  searchedValue = searchFormEl.elements.user_query.value.trim();

  if (searchedValue === '') {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  hideLoadBtn();

  try {
    const response = await fetchImages(searchedValue, page);

    if (response.data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      gallery.innerHTML = '';
      return;
    }

    const galleryMarkup = renderImages(response.data.hits);
    gallery.innerHTML = galleryMarkup;

    page += 1;
    lightbox.refresh();

    showLoadBtn();
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchFormEl.reset();
  }
};

const onLoadMoreClick = async () => {
  showLoader();
  hideLoadBtn();

  try {
    const response = await fetchImages(searchedValue, page);

    const galleryMarkup = renderImages(response.data.hits);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);

    page += 1;
    lightbox.refresh();

    showLoadBtn();
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Failed to fetch more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadBtn.addEventListener('click', onLoadMoreClick);
