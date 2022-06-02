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

class Card {
  constructor(initialCards) {
    this.name = initialCards.name;
    this.link = initialCards.link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate(); 
    this._setEventListeners()

    this._element.querySelector('.elements__title').textContent = this.name; 
    this._element.querySelector('.elements__mask-group').src = this.link;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__group')
    .addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.elements__trash')
    .addEventListener('click', () => {
      this._handleTrashClick();
    })

    this._element.querySelector('.elements__mask-group')
    .addEventListener('click', () => {
      this._handleClickImg()
    })
  }

  _handleLikeClick() {
    this._element.querySelector('.elements__group')
    .classList.toggle('elements__group-like');
  }

  _handleTrashClick(evt) {
    this._element.querySelector('.elements__trash')
    .closest('.elements__element').remove()
  }

  _handleClickImg() {
    const img = this.link;
    openPopup(popupImgOpen);
    imgPopup.src = img;
    popupImgText.textContent = this.name
    imgPopup.alt = this.name;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  cardElements.prepend(cardElement);

})

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card({
    name: inputName.value,
    link: inputLink.value
  })
  const newCardVisable = newCard.generateCard()
  cardElements.prepend(newCardVisable);
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
