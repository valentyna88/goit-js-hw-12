import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

// Получаем ссылки на элементы DOM
const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

// Инициализация SimpleLightbox для галереи
let lightbox = new SimpleLightbox('.js-gallery a');

// Глобальные переменные для хранения поискового запроса и текущей страницы
let searchedValue = '';
let page = 1;
let totalHits = 0; // Переменная для хранения общего количества изображений
const perPage = 15; // Количество изображений на страницу

// Функции для управления видимостью загрузчика и кнопки "Load more"
const showLoader = () => loader.classList.remove('is-hidden');
const hideLoader = () => loader.classList.add('is-hidden');
const showLoadBtn = () => loadBtn.classList.remove('is-hidden');
const hideLoadBtn = () => loadBtn.classList.add('is-hidden');

// Функция для плавного прокручивания страницы
const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

// Функция для обработки запросов к API и рендеринга изображений
const fetchAndRenderImages = async (isNewSearch = false) => {
  try {
    const response = await fetchImages(searchedValue, page);

    if (response.data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      if (isNewSearch) gallery.innerHTML = '';
      return false;
    }

    if (isNewSearch) {
      totalHits = response.data.totalHits; // Обновляем общее количество изображений при новом поиске
      gallery.innerHTML = renderImages(response.data.hits);
    } else {
      gallery.insertAdjacentHTML('beforeend', renderImages(response.data.hits));
    }

    page += 1;
    lightbox.refresh();

    // Проверяем, достигнут ли конец коллекции
    const totalPages = Math.ceil(totalHits / perPage);
    if (page > totalPages || response.data.hits.length < perPage) {
      hideLoadBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadBtn();
    }

    // Добавляем вызов функции плавного прокручивания
    if (!isNewSearch) {
      smoothScroll();
    }

    return true;
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
    return false;
  } finally {
    hideLoader();
  }
};

// Обработчик события отправки формы поиска
const onSearchFormSubmit = async event => {
  event.preventDefault();
  page = 1; // Сброс страницы на 1 при новом поисковом запросе

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
  const success = await fetchAndRenderImages(true);
  searchFormEl.reset(); // Сброс формы независимо от результата
};

// Обработчик события клика по кнопке "Load more"
const onLoadMoreClick = async () => {
  showLoader();
  hideLoadBtn();
  await fetchAndRenderImages();
};

// Добавляем обработчики событий для формы поиска и кнопки "Load more"
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadBtn.addEventListener('click', onLoadMoreClick);
