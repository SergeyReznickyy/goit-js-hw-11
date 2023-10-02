import axios from 'axios';

const API_KEY = '39778143-5903b31245878590f4fb837ac'; // ключ доступу до API

export default class PixabayApi {
  constructor() {
    this.baseUrl = 'https://pixabay.com/api/';
    this.perPage = 40; // Кількість результатів на сторінці
    this.page = 1; // Номер поточної сторінки
  }

  async searchImages(query) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`
      );
      this.incrementPage(); // Збільшуємо номер сторінки для наступних запитів
      return response.data.hits; // Повертаємо масив зображень, якщо є результати
    } catch (error) {
      console.error(error);
      throw error; // Обробляємо помилки та кидаємо їх для подальшої обробки
    }
  }

  incrementPage() {
    this.page += 1; // Збільшуємо номер сторінки
  }

  resetPage() {
    this.page = 1; // Скидаємо номер сторінки на першу
  }
}
