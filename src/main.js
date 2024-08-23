// import iziToast from 'izitoast';
// import SimpleLightbox from 'simplelightbox';
// import { fetchImages } from './js/pixabay-api';
// import { renderImages } from './js/render-functions';

// // Отримуємо посилання на елементи DOM
// const searchFormEl = document.querySelector('.js-search-form');
// const gallery = document.querySelector('.js-gallery');
// const loader = document.querySelector('.loader');
// const loadBtn = document.querySelector('.load-btn');

// // Ініціалізація Simplelightbox для галереї
// let lightbox = new SimpleLightbox('.js-gallery a');

// // Глобальні змінні для зберігання пошукового запиту та поточної сторінки
// let searchedValue = '';
// let page = 1;

// // Функції для керування видимістю завантажувача та кнопки "Load more"
// const showLoader = () => loader.classList.remove('is-hidden');
// const hideLoader = () => loader.classList.add('is-hidden');
// const showLoadBtn = () => loadBtn.classList.remove('is-hidden');
// const hideLoadBtn = () => loadBtn.classList.add('is-hidden');

// // Обробник події відправки форми пошуку
// const onSearchFormSubmit = async event => {
//   event.preventDefault();
//   page = 1; // Скидання сторінки на 1 при новому пошуковому запиті

//   // Отримуємо значення пошукового запиту
//   searchedValue = searchFormEl.elements.user_query.value.trim();

//   // Перевіряємо, що запит не порожній
//   if (searchedValue === '') {
//     iziToast.error({
//       message: 'Please enter a search query!',
//       position: 'topRight',
//     });
//     return;
//   }

//   // Показуємо завантажувач та ховаємо кнопку "Load more"
//   showLoader();
//   hideLoadBtn();

//   try {
//     // Виконуємо запит до API для отримання зображень
//     const response = await fetchImages(searchedValue, page);

//     // Перевіряємо, чи є результати
//     if (response.data.hits.length === 0) {
//       iziToast.error({
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//       });
//       gallery.innerHTML = '';
//       return;
//     }
//     // Очищуємо галерею перед додаванням нових зображень
//     gallery.innerHTML = '';

//     // Рендеримо зображення та оновлюємо галерею
//     const galleryMarkup = renderImages(response.data.hits);
//     gallery.insertAdjacentHTML('beforeend', galleryMarkup);

//     // Збільшуємо номер сторінки та оновлюємо lightbox
//     page += 1;
//     lightbox.refresh();

//     showLoadBtn(); // Показуємо кнопку "Load more", якщо є результати
//   } catch (error) {
//     console.error(error);
//     iziToast.error({
//       message: 'Failed to fetch images. Please try again later.',
//       position: 'topRight',
//     });
//   } finally {
//     // Ховаємо завантажувач та скидаємо форму пошуку
//     hideLoader();
//     searchFormEl.reset();
//   }
// };

// // Обробник події кліку по кнопці "Load more"
// const onLoadMoreClick = async () => {
//   // Показуємо завантажувач та ховаємо кнопку "Load more"
//   showLoader();
//   hideLoadBtn();

//   try {
//     // Виконуємо запит до API для отримання додаткових зображень
//     const response = await fetchImages(searchedValue, page);

//     // Рендеримо додаткові зображення та додаємо їх до галереї
//     const galleryMarkup = renderImages(response.data.hits);
//     gallery.insertAdjacentHTML('beforeend', galleryMarkup);

//     // Збільшуємо номер сторінки та оновлюємо lightbox
//     page += 1;
//     lightbox.refresh();

//     showLoadBtn(); // Показуємо кнопку "Load more" після завантаження
//   } catch (error) {
//     console.error(error);
//     iziToast.error({
//       message: 'Failed to fetch more images. Please try again later.',
//       position: 'topRight',
//     });
//   } finally {
//     hideLoader(); // Ховаємо завантажувач
//   }
// };

// // Додаємо обробники подій для форми пошуку та кнопки "Load more"
// searchFormEl.addEventListener('submit', onSearchFormSubmit);
// loadBtn.addEventListener('click', onLoadMoreClick);

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

    const galleryMarkup = renderImages(response.data.hits);
    if (isNewSearch) {
      gallery.innerHTML = galleryMarkup;
    } else {
      gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    }

    page += 1;
    lightbox.refresh();
    showLoadBtn();
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
  searchFormEl.reset();
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
