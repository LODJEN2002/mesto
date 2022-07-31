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
// import { PopupWithAvatar } from '../components/PopupWithAvatar.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'

const imgClick = new PopupWithImage('.popup-img', '.popup-img__img-img', '.popup-img__text')
const newInfo = new UserInfo({ selectorName: '.profile__info-text-title' , selectorJob: '.profile__info-text-subtitle' })

const _id = '297072208aef3e18899373f7'

imgClick.setEventListeners()

const popupDeliteCardDva = new Popup('.popup-delite')


const avatar = document.querySelector('.profile__avatar')
const popupProfileAvatar = new Popup('.popup-avatar')
const buttonOk = document.querySelector('.popup-delite__button')
const avatarPopup = document.querySelector('.popup-avatar')
const avatarForm = avatarPopup.querySelector('.popup__form')
const avatarInput = document.querySelector('.popup-avatar__input')
const popupDeliteCard = document.querySelector('.popup-delite')

avatar.addEventListener('click', () => {
  popupProfileAvatar.open()
  popupProfileAvatar.setEventListeners()
  avatarInput.value = ''
})

avatarForm.addEventListener('submit', handleAvatarFormSubmit)

function handleAvatarFormSubmit(evt) {
  evt.preventDefault()
  console.log(avatarInput.value)
  avatar.src = avatarInput.value;
  api.newAvatar(avatarInput.value)
  popupProfileAvatar.close()
}


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
  //Изменение профиля
  api.patchProfileInfo(profileName, profileJob)
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
      },
      handleImageClick: () => {
        imgClick.open(cardData.name, cardData.link)
      },
      handleTrashClick: () => {
        popupDeliteCardDva.open()
        popupDeliteCardDva.setEventListeners()
        const popup = document.querySelector('.popup_opened')
        const buttonOkay = popup.querySelector('.popup-delite__button')
        buttonOkay.addEventListener('click' , () => {
          newCard.handleOkClick()
          popupDeliteCardDva.close()
          const cardId = newCard.returnCardId()
          api.deliteCard(cardId)
        })
      },
      handleLikeClick: () => {
        newCard.addLike()
        const cardId = newCard.returnCardId()
        api.likeCard(cardId)
      },
      handleLikeOff: () => {
        newCard.deliteLike()
        const cardId = newCard.returnCardId()
        api.likeOffCard(cardId)
      }
    }, '.card-template',
  );
  const cardElement = newCard.generateCard();

  return cardElement;
}




const cardsPopupSubmit = new PopupWithForm('.popup-cards', handleCardFormSubmit);

cardsPopupSubmit.setEventListeners();

function handleCardFormSubmit(data) {
  const card = createCard({
    name: data['field-text-title'],
    link: data['field-text-subtitle'],
    owner: {_id:'297072208aef3e18899373f7'},
    likes: []
  })
  
  section.addItem(card)
  cardsPopupSubmit.close();
  // Добавление новой карточки
  api.newCard(data['field-text-title'], data['field-text-subtitle'])
  // .then(res => console.log(res))
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



const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '231bffe2-4e48-4380-b6b6-62d7cd2fd2a9',
    'Content-Type': 'application/json'
  },
}
const api = new Api(apiConfig);

api.getInitialCards()
  .then(initalCards => {
    const sectionNew = new Section({ items: initalCards, renderer: createCard }, '.elements')
    
    sectionNew.renderItem()
})

api.getProfileInfo()
    .then(res => {
      profileName.textContent =  res.name
      profileJob.textContent = res.about
      profileAva.src = res.avatar
    })  


  fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards', {
  headers: {
    authorization: '231bffe2-4e48-4380-b6b6-62d7cd2fd2a9'
  }
})
.then(res => res.json())
.then(res => console.log(res))
// .then(res => 
//   res.forEach(item => {
//     console.log(item.likes.length)
//   })
// )





// Постановка лайка на карточку 

// fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards/62e252e445e5210a63b6661c/likes', {
//   method: 'PUT',
//   headers: {
//     authorization: '231bffe2-4e48-4380-b6b6-62d7cd2fd2a9'
//   }
// })
// .then(res => res.json())
// .then(res => console.log(res))



