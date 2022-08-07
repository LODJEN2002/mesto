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
  validationConfig , initialCards } from '../components/utils/utils.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '231bffe2-4e48-4380-b6b6-62d7cd2fd2a9',
    'Content-Type': 'application/json'
  },
}
const api = new Api(apiConfig);
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
const popupDeleteCard = new PopupWithSubmit('.popup-delite' , '.popup__form')
const popupEditProfile = new PopupWithForm('.profile-popup', handleProfileFormSubmit)
const popupAddCard = new PopupWithForm('.popup-cards', handleCardFormSubmit);
const popupProfileAvatar = new PopupWithForm('.popup-avatar', handleAvatarFormSubmit)
const section = new Section({ items: initialCards, renderer: createCard }, '.elements')


profileFormValid.enableValidation();
cardFormValid.enableValidation();
avatarFormValid.enableValidation();
popupWithImage.setEventListeners();
popupProfileAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

avatar.addEventListener('click', () => {
  avatarFormValid.hideError()
  popupProfileAvatar.open()
  avatarInput.value = ''
  avatarFormValid.buttonDisabled()
})

function handleAvatarFormSubmit(inputValues) {
  popupProfileAvatar.renderLoading(true , "Сохранить" , "Сохранение...")
  api.newAvatar(inputValues.avatar)
    .then(avatar.src = avatarInput.value)    
    .then(popupProfileAvatar.close())
    .finally(() => (popupProfileAvatar.renderLoading(false , "Сохранить" , "Сохранение...")))
}

function openProfilePopup() {
  profileFormValid.hideError()
  const { name , job } = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
  popupEditProfile.open();
  profileFormValid.buttonDisabled();
}

editButton.addEventListener('click' , openProfilePopup);

function handleProfileFormSubmit (data) {
  popupEditProfile.renderLoading(true , "Сохранить" , "Сохранение...")
  //Изменение профиля
  api.patchProfileInfo(data.name , data.job)
    .then(() => {
      const { name , job } = data
      userInfo.setUserInfo(name , job)
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
        popupDeleteCard.open()

        popupDeleteCard.setSubmitAction(() => {
          api.deliteCard(newCard.returnCardId())
            .then(newCard.handleOkClick())
            .then(popupDeleteCard.close())
            .catch(error => console.log(error))
        })
      },
      handleLikeClick: () => {
        const cardId = newCard.returnCardId()
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


Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileInfo, initialCards]) => {
    _id = profileInfo._id

    userInfo.setUserInfo(profileInfo.name, profileInfo.about)
    profileAva.src = profileInfo.avatar

    const section = new Section({ items: initialCards.reverse(), renderer: createCard }, '.elements')
    section.renderItems()
  })
  .catch(error => console.error(error))


