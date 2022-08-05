import './index.css'; // добавьте импорт главного файла стилей 
import { editButton,
  profileForm,
  nameInput,
  jobInput,
  buttonAdd,
  cardForm,
  imgPopupCloseBtn,
  profileAva,
  profileName,
  profileJob,
  validationConfig , initialCards } from '../components/utils.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'

const avatar = document.querySelector('.profile__avatar')
const avatarPopup = document.querySelector('.popup-avatar')
const avatarForm = avatarPopup.querySelector('.popup__form')
const avatarInput = avatarForm.querySelector('.popup__input')
let _id = null
let idCard = null

const popupWithImage = new PopupWithImage('.popup-img', '.popup-img__img-img', '.popup-img__text')
const userInfo = new UserInfo({ selectorName: '.profile__info-text-title' , selectorJob: '.profile__info-text-subtitle' })
const profileFormValid = new FormValidator(validationConfig, profileForm);
const cardFormValid = new FormValidator(validationConfig, cardForm);
const avatarFormValid = new FormValidator(validationConfig, avatarForm);
const popupDeliteCardDva = new PopupWithSubmit('.popup-delite')
const popupEditProfile = new PopupWithForm('.profile-popup', handleProfileFormSubmit)
const popupAddCard = new PopupWithForm('.popup-cards', handleCardFormSubmit);
const popupProfileAvatar = new PopupWithForm('.popup-avatar', handleAvatarFormSubmit)

profileFormValid.enableValidation();
cardFormValid.enableValidation();
avatarFormValid.enableValidation();
popupWithImage.setEventListeners();
popupProfileAvatar.setEventListeners();
popupDeliteCardDva.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

avatar.addEventListener('click', () => {
  avatarFormValid.hideError()
  popupProfileAvatar.open()
  avatarInput.value = ''
})


function handleAvatarFormSubmit() {
  popupProfileAvatar.renderLoading(true , "Сохранить" , "Сохранение...")
  api.newAvatar(avatarInput.value)
    .then(avatar.src = avatarInput.value)    
    .then(popupProfileAvatar.close())
    .finally(() => (popupProfileAvatar.renderLoading(false , "Сохранить" , "Сохранение...")))
}

function openProfilePopup() {
  profileFormValid.hideError()
  const { name , job } = userInfo.getUserInfo()
  // console.log(userInfo.getUserInfo())
  nameInput.value = name;
  jobInput.value = job;
  popupEditProfile.open();
  profileFormValid.buttonDisabled();
}

editButton.addEventListener('click' , openProfilePopup);

function handleProfileFormSubmit (data) {
  popupEditProfile.renderLoading(true , "Сохранить" , "Сохранение...")
  //Изменение профиля
  api.patchProfileInfo(profileName , profileJob)
    .then(() => {
      const { name , job } = data
      userInfo.setUserInfo(name , job)
      api.patchProfileInfo(profileName , profileJob)
    })
    .then(popupEditProfile.close())
    .finally(() => popupEditProfile.renderLoading(false , "Сохранить"  ))
}

function createCard(cardData) {
  const newCard = new Card(
    {
      cardData: {
        name: cardData.name,
        link: cardData.link,
        owner: cardData.owner,
        _id: cardData._id,
        likes: cardData.likes,
        currentUserId: _id,
      },
      handleImageClick: () => {
        popupWithImage.open(cardData.name, cardData.link)
      },
      handleTrashClick: () => {
        popupDeliteCardDva.open()
        const popup = document.querySelector('.popup_opened')
        const buttonOkay = popup.querySelector('.popup-delite__button')
        buttonOkay.addEventListener('click' , () => {
          newCard.handleOkClick()
          const cardId = newCard.returnCardId()
          api.deliteCard(cardId)
            .then(popupDeliteCardDva.close())
            .catch(error => console.log(error))
        })
      },
      handleLikeClick: () => {
        const cardId = newCard.returnCardId()
        console.log(cardId)
        api.likeCard(cardId)
          .then(newCard.addLike())
          .catch(error => console.log(error))
      },
      handleLikeOff: () => {
        const cardId = newCard.returnCardId()
        api.likeOffCard(cardId)
          .then(newCard.deliteLike())
          .catch(error => console.log(error))
      },
    }, '.card-template',
  );
  const cardElement = newCard.generateCard();

  return cardElement;
}

function handleCardFormSubmit(data) {
  popupAddCard.renderLoading(true , "Создать" , "Создание...")
  // Добавление новой карточки
  api.addNewCard(data['field-text-title'], data['field-text-subtitle'])
    .then((res) => {
      idCard = res._id
    })
    .then(() => {
      const card = createCard({
        name: data['field-text-title'],
        link: data['field-text-subtitle'],
        owner: {_id},
        likes: [],
        _id: idCard,
      })
      section.addItem(card)
    })
    .then(popupAddCard.close())  
    .finally(() => popupAddCard.renderLoading(false , "Создать" , "Создание..."))
}

buttonAdd.addEventListener('click', function() {
  cardFormValid.hideError()
  popupAddCard.open();
  cardFormValid.buttonDisabled()
});

const section = new Section({ items: initialCards, renderer: createCard }, '.elements')

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '231bffe2-4e48-4380-b6b6-62d7cd2fd2a9',
    'Content-Type': 'application/json'
  },
}
const api = new Api(apiConfig);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    _id = profileInfo._id

    userInfo.setUserInfo(profileInfo.name, profileInfo.about)
    profileAva.src = profileInfo.avatar

    const section = new Section({ items: initialCards, renderer: createCard }, '.elements')
    section.renderItem()
    console.log(initialCards)
  })
  .catch(error => console.error(error))


