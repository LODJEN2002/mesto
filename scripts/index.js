import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { validationConfig } from './utils.js'
import { initialCards } from './utils.js'
import { Section } from './Section.js'
import { Popup } from './Popup.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js'

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
const saveButton = cardsPopup.querySelector('.popup__button');
const spanTitleError = document.querySelector('.title-input-error');
const spanSubtitleError = document.querySelector('.subtitle-input-error');
const popupList = Array.from(document.querySelectorAll('.popup'));
const imgMask = document.querySelector('.elements__element');
const profilePopupClass = new Popup('.profile-popup');
const cardsPopupClass = new Popup('.popup-cards');
const imgClick = new PopupWithImage('.popup-img')
const newInfo = new UserInfo({ selectorName: '.profile__info-text-title' , selectorJob: '.profile__info-text-subtitle' })

imgClick.setEventListeners()

function openProfilePopup() {
  const { name , job } = newInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
  profilePopupClass.open()
}

editButton.addEventListener('click' , openProfilePopup);

const profilePopupSubmit = new PopupWithForm('.profile-popup', handleProfileFormSubmit)

profilePopupSubmit.setEventListeners()

function handleProfileFormSubmit (data) {
  const { name , job } = data
  newInfo.setUserInfo(name , job)
  profilePopupSubmit.close()

}

function createCard(item) {
  const newCard = new Card(item, '.card-template', () => {
    imgClick.open(item.name, item.link)
  });
  const cardElement = newCard.generateCard();

  return cardElement;
}

const cardsPopupSubmit = new PopupWithForm('.popup-cards', handleCardFormSubmit);

cardsPopupSubmit.setEventListeners();

function handleCardFormSubmit(data) {
  const card = createCard({
    name: data['field-text-title'],
    link: data['field-text-subtitle']
  })
  section.addItem(card)
  cardsPopupSubmit.close();
  saveButton.classList.add('popup__button_disabled')
}

buttonAdd.addEventListener('click', function() {
  cardsPopupClass.open();
});


imgPopupCloseBtn.addEventListener('click', function() {
  imgClick.close();
})

const profileFormValid = new FormValidator(validationConfig, profileForm);
const cardFormValid = new FormValidator(validationConfig, cardForm);

profileFormValid.enableValidation();
cardFormValid.enableValidation();

const section = new Section({ items: initialCards, renderer: createCard }, '.elements')

section.renderItem()

