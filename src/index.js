import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import PixabayApi from './API_KEY';

const pixabayApi = new PixabayApi();
const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value;
  if (!searchQuery) {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  try {
    const images = await pixabayApi.searchImages(searchQuery);

    if (images.length === 0) {
      showNoResultsMessage();
      return;
    }

    displayImages(images);
  } catch (error) {
    console.error(error);

    showErrorMessage();
  }
});

function displayImages(images) {
  // Очищуємо попередні результати перед відображенням нових
  galleryContainer.innerHTML = '';

  images.forEach(image => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes: </b>${image.likes}</p>
        <p class="info-item"><b>Views: </b>${image.views}</p>
        <p class="info-item"><b>Comments: </b>${image.comments}</p>
        <p class="info-item"><b>Downloads: </b>${image.downloads}</p>
      </div>
    `;
    galleryContainer.appendChild(card);
  });
}

function showNoResultsMessage() {
  Notiflix.Notify.info(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function showErrorMessage() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong. Please try again later.'
  );
}
