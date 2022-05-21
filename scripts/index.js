const editButton = document.querySelector('.profile__edit-button'); // Кнопка изменения
const profileCloseButton = document.querySelector('.popup__close-icon') // Кнопка закрытия поп-ап
const profileForm = document.querySelector('.popup__form') // На изменение профиля
const nameInput = document.querySelector('.popup__input_field_title');
const jobInput = document.querySelector('.popup__input_field_subtitle');
const profilePopup = document.querySelector('.profile-popup');
const nameTitle = document.querySelector('.profile__info-text-title');
const jobSubtitle = document.querySelector('.profile__info-text-subtitle');
const buttonAdd = document.querySelector('.profile__add-button')
const cardsPopup  = document.querySelector('.popup-cards')
const cardsPopupCloseBtn = cardsPopup.querySelector('.popup__close-icon')
const cardForm = cardsPopup.querySelector('.popup__form')
const inputName = document.querySelector('.popup-cards__container-field-title-plus');
const inputLink = document.querySelector('.popup-cards__container-field-subtitle-plus');
const elements = document.querySelector('.elements');
const popupImgOpen = document.querySelector('.popup-img')
const imgPopup = popupImgOpen.querySelector('.popup-img__img-img')
const imgPopupCloseBtn = popupImgOpen.querySelector('.popup__close-icon')
const popupImgText = document.querySelector('.popup-img__text');
const cardTemplate = document.querySelector('.card-template').content;
const saveButton = cardsPopup.querySelector('.popup__button')
const spanTitleError = document.querySelector('.title-input-error')
const spanSubtitleError = document.querySelector('.subtitle-input-error')
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Челябинск',
      link: 'https://www.alltime.ru/obj/article/image-blog/Chelyabinsk/Chelyabinsk_1.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
  spanTitleError.classList.remove('popup__error_visible')
  spanSubtitleError.classList.remove('popup__error_visible')
  nameInput.classList.remove('popup__input_type_error')
  jobInput.classList.remove('popup__input_type_error')
}

editButton.addEventListener('click' , openProfilePopup);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

profileCloseButton.addEventListener('click' , closeProfilePopup);

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closeProfilePopup()
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Пробуем новое
// Создаем элемент
function createCard(item) {
  const initialCardItem = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const titleCard = initialCardItem.querySelector('.elements__title')
  const imgCard = initialCardItem.querySelector('.elements__mask-group')

  titleCard.textContent = item.name;
  imgCard.src = item.link;
  imgCard.alt = item.name;

  // Удаление карточки
  const trashElement = initialCardItem.querySelector('.elements__trash')
  trashElement.addEventListener('click', function (evt) {
    const deliteCardElement = evt.target.closest('.elements__element');

    deliteCardElement.remove()
  })

  // Лайки
  const likeCard = initialCardItem.querySelector('.elements__group')
  likeCard.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__group-like')
  });

  imgCard.addEventListener('click', clickImg)

  function clickImg() {
    const img = item.link;
    openPopup(popupImgOpen);
    imgPopup.src = img;
    popupImgText.textContent = item.name
    imgPopup.alt = item.name;
  }

  return initialCardItem
}

function renderItem(item) {
  elements.prepend(createCard(item));
}


initialCards.forEach((item) => {
  renderItem(item);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderItem({
    name: inputName.value,
    link: inputLink.value
  });
  closePopup(cardsPopup);
  evt.target.reset()
  saveButton.setAttribute('disabled', true)
  saveButton.classList.add('popup__button_disabled')
}

cardForm.addEventListener('submit', handleCardFormSubmit);

imgPopupCloseBtn.addEventListener('click', function() {
  closePopup(popupImgOpen);
})
//Это выходи из попапа при клике на ост. область.
const overlayClick = (popup, data) => {
  popup.addEventListener('click', function(evt) {
    if(evt.target.classList.contains(data)){
      closePopup(popup)
    }
  })
}

overlayClick(profilePopup, 'profile-popup');
overlayClick(cardsPopup, 'popup-cards');
overlayClick(popupImgOpen, 'popup-img');


buttonAdd.addEventListener('click', function() {
  openPopup(cardsPopup);
});

cardsPopupCloseBtn.addEventListener('click', function(){
  closePopup(cardsPopup);
});

//Escape закрытие
// Kакой то странный код вышел, но вроде работает)
window.addEventListener('keydown', function(event) {
  if(event.key === 'Escape') {
  closePopup(popupImgOpen) & closePopup(profilePopup) & closePopup(cardsPopup)
  }
})
