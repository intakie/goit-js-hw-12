import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// =========================================

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

let query = '';
let currentPage = 1;
let maxPage = 0;
const pageSize = 15;
// =========================================

searchForm.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', handleClick);

async function handleSubmit(e) {
  e.preventDefault();

  query = searchForm.elements.search.value.trim();
  gallery.innerHTML = '';
  currentPage = 1;

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query',
    });
    return;
  }

  try {
    showLoader();
    const data = await searchImages(query, currentPage);
    maxPage = Math.ceil(data.totalHits / pageSize);
    renderImages(data.hits);
  } catch (err) {
    console.log(err);
  }

  hideLoader();
  checkBtn();
  e.target.reset();
}

async function handleClick() {
  currentPage += 1;
  showLoader();

  try {
    const data = await searchImages(query, currentPage);
    renderImages(data.hits);
  } catch (error) {
    console.log(error);
  }

  myScroll();
  checkBtn();
  hideLoader();
}

function showLoadMore() {
  loadBtn.classList.remove('hidden');
}

function hideLoadMore() {
  loadBtn.classList.add('hidden');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function checkBtn() {
  if (currentPage >= maxPage) {
    hideLoadMore();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMore();
  }
}

function myScroll() {
  const height = gallery.firstChild.getBoundingClientRect().height;
  scrollBy({
    top: height * 1.5,
    behavior: 'smooth',
  });
}
