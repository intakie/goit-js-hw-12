import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

function imageTemplate(obj) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = obj;
  return `<li class="gallery-item">
        <a href="${largeImageURL}" data-lightbox="gallery">
            <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
        </a>
        <div class="image-details">
            <p>Likes: ${likes}</p>
            <p>Views: ${views}</p>
            <p>Comments: ${comments}</p>
            <p>Downloads: ${downloads}</p>
        </div>
    </li>`;
}

function imagesTemplate(arr) {
  return arr.map(imageTemplate).join('');
}

export function renderImages(arr) {
  const markup = imagesTemplate(arr);
  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}
