const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const dataSources = [];
const refs = {
  gallery: document.querySelector(".js-gallery"),
  image: document.querySelector(".lightbox__image"),
  buttonClose: document.querySelector(".lightbox__button"),
  overlay: document.querySelector(".lightbox__overlay"),
  lightbox: document.querySelector('.js-lightbox')
};

const cardsMarkup = createImageCardsMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);


function createImageCardsMarkup(Items) {
  return Items
    .map(({preview, original, description}) => {
      dataSources.push(original)
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;})
    .join('');
}
// Прослушивание нажатия и открытие модалки
refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(evt) {
  const isImgSwatchEl = evt.target.classList.contains('gallery__image');

  if (!isImgSwatchEl) {
  return;
}
  evt.preventDefault();
  const swatchEl = evt.target;
    refs.image.src = '';
    refs.image.alt = '';
    refs.image.src = swatchEl.dataset.source;
    refs.image.alt = swatchEl.alt;
    refs.lightbox.classList.add("is-open");
    
}
// Закрытие модалки

function onCloseModal() {
  refs.lightbox.classList.remove('is-open')
};
const handleCloseModal = e => {
  if (e.code === "Escape"&& refs.lightbox.classList.contains('is-open')) {
   return onCloseModal();
  }
};

refs.buttonClose.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click',onCloseModal);
document.addEventListener('keydown', handleCloseModal);

// Переключение с помощью кнопок
document.addEventListener('keydown', e => {
  const currentIndex = dataSources.indexOf(refs.image.src);
  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex);
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex);
  }
});

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1;
  }
  refs.image.src = dataSources[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSources.length) {
    nextIndex = 0;
  }
  refs.image.src = dataSources[nextIndex];
}