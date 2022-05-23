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
const cardElements = document.querySelector('.elements');
const popupImgOpen = document.querySelector('.popup-img')
const imgPopup = popupImgOpen.querySelector('.popup-img__img-img')
const imgPopupCloseBtn = popupImgOpen.querySelector('.popup__close-icon')
const popupImgText = document.querySelector('.popup-img__text');
const cardTemplate = document.querySelector('.card-template').content;
const saveButton = cardsPopup.querySelector('.popup__button')
const spanTitleError = document.querySelector('.title-input-error')
const spanSubtitleError = document.querySelector('.subtitle-input-error')
const popupList = Array.from(document.querySelectorAll('.popup'))
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
  document.addEventListener('keydown', handleEscClose)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose)
}

function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
}

editButton.addEventListener('click' , openProfilePopup);

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closePopup(profilePopup)
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Создаем элемент
function createCard(initialCardsArr) {
  const initialCardItem = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const titleCard = initialCardItem.querySelector('.elements__title')
  const imgCard = initialCardItem.querySelector('.elements__mask-group')

  titleCard.textContent = initialCardsArr.name;
  imgCard.src = initialCardsArr.link;
  imgCard.alt = initialCardsArr.name;

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
    const img = initialCardsArr.link;
    openPopup(popupImgOpen);
    imgPopup.src = img;
    popupImgText.textContent = initialCardsArr.name
    imgPopup.alt = initialCardsArr.name;
  }

  return initialCardItem
}

function renderItem(initialCardsArr) {
  cardElements.prepend(createCard(initialCardsArr));
}


initialCards.forEach((initialCardsArr) => {
  renderItem(initialCardsArr);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderItem({
    name: inputName.value,
    link: inputLink.value
  });
  closePopup(cardsPopup);
  evt.target.reset()
  saveButton.classList.add('popup__button_disabled')
}

cardForm.addEventListener('submit', handleCardFormSubmit);

//Это выходи из попапа при клике на overlay
/** Используется mousedown т.к. при выделение всего текста в инпутах мой курсос
 *входит в область оверлея и срабатывает клик на оверлее и закрытие попапа
 */
 function overlayClick(evt) {
     if(evt.target.classList.contains('popup_opened')){
       const popup = document.querySelector('.popup_opened')
       closePopup(popup)
     }
   }

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', overlayClick)
})


//Escape закрытие
function handleEscClose(evt) {
  if(event.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened')
    closePopup(popupActive)
  }
}

buttonAdd.addEventListener('click', function() {
  openPopup(cardsPopup);
});

profileCloseButton.addEventListener('click' , function() {
  closePopup(profilePopup)
});

imgPopupCloseBtn.addEventListener('click', function() {
  closePopup(popupImgOpen);
})

cardsPopupCloseBtn.addEventListener('click', function() {
  closePopup(cardsPopup);
});
