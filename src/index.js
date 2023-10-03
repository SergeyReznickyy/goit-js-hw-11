import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { pixabayApi } from './PixabayApi';

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('search-form');
  const galleryContainer = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.load-more');
  let searchQuery = '';
  const perPage = 40;
  let currentPage = 1;

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    currentPage = 1;

    searchQuery = event.currentTarget.elements.searchQuery.value;
    if (!searchQuery) {
      Notiflix.Notify.warning('Please enter a search query.');
      return;
    }

    try {
      const response = await pixabayApi(searchQuery, perPage, currentPage);
      const images = response.data;

      galleryContainer.textContent = '';

      if (images.hits.length === 0) {
        showNoResultsMessage();
        return;
      }

      displayImages(images.hits);

      if (images.totalHits > currentPage * perPage) {
        showLoadMoreButton();
        currentPage++;
      } else {
        hideLoadMoreButton();
      }
    } catch (error) {
      console.error(error);
      showErrorMessage();
    }
  });

  loadMoreButton.addEventListener('click', async function (event) {
    try {
      const response = await pixabayApi(searchQuery, perPage, currentPage);
      const images = response.data;

      displayImages(images.hits);
      if (images.totalHits > currentPage * perPage) {
        currentPage++;
      } else {
        hideLoadMoreButton();
      }
    } catch (error) {
      console.error(error);
      showErrorMessage();
    }
  });

  function displayImages(images) {
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

  function showLoadMoreButton() {
    loadMoreButton.classList.remove('hidden');
  }

  function hideLoadMoreButton() {
    loadMoreButton.classList.add('hidden');
  }
});
