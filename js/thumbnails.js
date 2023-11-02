const picturesList = document.querySelector('.pictures');

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('a');

const fragmentPhotoThumbnails = document.createDocumentFragment();

const removeCards = () => {
  document.querySelectorAll('.picture').forEach((card) => {
    card.remove();
  });
};

const createPhotoThumbnail = (photoArray) => {
  photoArray.forEach(({ url, description, likes, comments }) => {
    const photoElement = thumbnailTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent =
      comments.length;

    fragmentPhotoThumbnails.appendChild(photoElement);
  });
  removeCards();
  picturesList.appendChild(fragmentPhotoThumbnails);
};

export { createPhotoThumbnail };
