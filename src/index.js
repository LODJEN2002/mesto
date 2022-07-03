import './styles/index.css'; // добавьте импорт главного файла стилей 
import { editButton,
  profileForm,
  nameInput,
  jobInput,
  buttonAdd,
  cardForm,
  imgPopupCloseBtn,
  validationConfig , initialCards } from './utils.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js'
import { Popup } from './Popup.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js'

const profilePopupClass = new Popup('.profile-popup');
const cardsPopupClass = new Popup('.popup-cards');
const imgClick = new PopupWithImage('.popup-img', '.popup-img__img-img', '.popup-img__text')
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

