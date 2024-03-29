

export const editButton = document.querySelector('.profile__edit-button'); // Кнопка изменения
export const profileForm = document.querySelector('.popup__form') // На изменение профиля
export const nameInput = document.querySelector('.popup__input_field_title');
export const jobInput = document.querySelector('.popup__input_field_subtitle');
export const buttonAdd = document.querySelector('.profile__add-button')
export const cardsPopup  = document.querySelector('.popup-cards')
export const cardForm = cardsPopup.querySelector('.popup__form')
export const popupImgOpen = document.querySelector('.popup-img')
export const imgPopupCloseBtn = popupImgOpen.querySelector('.popup__close-icon')
export const profileAva = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__info-text-title');
export const profileJob = document.querySelector('.profile__info-text-subtitle');


export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

export const initialCards = [
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

