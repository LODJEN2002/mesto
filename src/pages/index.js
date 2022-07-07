import './index.css'; // добавьте импорт главного файла стилей 
import { editButton,
  profileForm,
  nameInput,
  jobInput,
  buttonAdd,
  cardForm,
  imgPopupCloseBtn,
  validationConfig , initialCards } from '../components/utils.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

const imgClick = new PopupWithImage('.popup-img', '.popup-img__img-img', '.popup-img__text')
const newInfo = new UserInfo({ selectorName: '.profile__info-text-title' , selectorJob: '.profile__info-text-subtitle' })

imgClick.setEventListeners()

function openProfilePopup() {
  const { name , job } = newInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
  profilePopupSubmit.open();
  profileFormValid.buttonDisabled();
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
  cardsPopupSubmit.open();
  cardFormValid.buttonDisabled()
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

