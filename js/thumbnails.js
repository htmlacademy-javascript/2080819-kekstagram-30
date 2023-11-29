const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('a');

const fragmentPhotoThumbnails = document.createDocumentFragment();

const removeCards = () => {
  document.querySelectorAll('.picture').forEach((card) => {
    card.remove();
  });
};

const createPhotoThumbnail = (photos, container) => {
  photos.forEach(({ url, description, likes, comments, id }) => {
    const photoElement = thumbnailTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent =
      comments.length;
    photoElement.dataset.photoElementId = id;

    fragmentPhotoThumbnails.appendChild(photoElement);
  });
  removeCards();
  container.appendChild(fragmentPhotoThumbnails);
};

export { createPhotoThumbnail };
