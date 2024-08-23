import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

// Отримуємо посилання на елементи DOM
const searchFormEl = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

// Ініціалізація SimpleLightbox для галереї
let lightbox = new SimpleLightbox('.js-gallery a');

// Глобальні змінні для зберігання пошукового запиту та поточної сторінки
let searchedValue = '';
let page = 1;
let totalHits = 0; // Додаємо змінну для зберігання загальної кількості зображень
const perPage = 15; // Кількість зображень на сторінку

// Функції для керування видимістю завантажувача та кнопки "Load more"
const showLoader = () => loader.classList.remove('is-hidden');
const hideLoader = () => loader.classList.add('is-hidden');
const showLoadBtn = () => loadBtn.classList.remove('is-hidden');
const hideLoadBtn = () => loadBtn.classList.add('is-hidden');

// Функція для обробки запитів до API та рендерингу зображень
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
      totalHits = response.data.totalHits; // Оновлюємо загальну кількість зображень при новому пошуку
      gallery.innerHTML = renderImages(response.data.hits);
    } else {
      gallery.insertAdjacentHTML('beforeend', renderImages(response.data.hits));
    }

    page += 1;
    lightbox.refresh();

    // Перевіряємо, чи досягнуто кінця колекції
    const totalPages = Math.ceil(totalHits / perPage);
    if (page > totalPages) {
      hideLoadBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadBtn();
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

// Обробник події відправки форми пошуку
const onSearchFormSubmit = async event => {
  event.preventDefault();
  page = 1; // Скидання сторінки на 1 при новому пошуковому запиті

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
  searchFormEl.reset(); // Скидання форми незалежно від результату
};

// Обробник події кліку по кнопці "Load more"
const onLoadMoreClick = async () => {
  showLoader();
  hideLoadBtn();

  await fetchAndRenderImages();
};

// Додаємо обробники подій для форми пошуку та кнопки "Load more"
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadBtn.addEventListener('click', onLoadMoreClick);
