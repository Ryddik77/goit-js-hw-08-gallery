const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const elements = getElements();

initListener();
renderImgs();

function getElements() {
  return {
    ul: document.querySelector("#js-gallery"),
    modal: document.querySelector("#js-lightbox"),
    lightboxModal: document.querySelector("#js-lightbox .lightbox__image"),
    lightBoxCloseBtn: document.querySelector("#js-lightbox .js-close-btn"),
  };
}

function initListener() {
  elements.ul.addEventListener("click", onClickImgGallery);
  elements.lightBoxCloseBtn.addEventListener("click", closeLightBox);
  elements.modal.addEventListener("keydown", onKeyModal);
}

function onKeyModal(event) {
  const keyWhiteList = ["Escape", "ArrowLeft", "ArrowRight"];
  if (!keyWhiteList.includes(event.key)) {
    return;
  }

  if (event.key === "Escape") {
    closeLightBox();
  } else {
    slideGallery(event);
  }
}

function slideGallery(event) {
  const galleryCurrentImgIdx = galleryItems.findIndex(
    (g) => g.original === elements.lightboxModal.src
  );

  let iterNumber;

  if (event.key === "ArrowLeft") {
    iterNumber = galleryCurrentImgIdx === 0 ? 0 : -1;
  } else if (event.key === "ArrowRight") {
    iterNumber = galleryCurrentImgIdx === galleryItems.length - 1 ? 0 : 1;
  }

  elements.lightboxModal.src =
    galleryItems[galleryCurrentImgIdx + iterNumber].original;
}

function closeLightBox() {
  elements.modal.classList.remove("is-open");
}

function onClickImgGallery(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const imgUrl = event.target.dataset.source;
  elements.lightboxModal.src = imgUrl;

  elements.modal.classList.add("is-open");
  elements.modal.focus();
}

function renderImgs() {
  elements.ul.innerHTML = createItems(galleryItems);
}

function createItems(galleryItems) {
  return galleryItems
    .map((elem) => {
      const { preview, original, description } = elem;
      return `
        <li class="gallery__item">
          <a
            class="gallery__link js-gallery-link"
            href='javascript:;'
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`;
    })
    .join("");
}
