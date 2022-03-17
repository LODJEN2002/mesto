let editButton = document.querySelector('.profile__edit-button'); // Кнопка изменения
let closePopup = document.querySelector('.popup__close-icon') // Кнопка закрытия поп-ап
let formElement = document.querySelector('.popup__form') // На изменение профиля
let saveButton = document.querySelector(".popup__container-save") // Кнопка сохранить
let nameInput = document.querySelector('.popup__container-field-title');
let jobInput = document.querySelector('.popup__container-field-subtitle');
let openPopup = document.querySelector('.popup');
let nameTitle = document.querySelector('.profile__info-text-title');
let jobSubtitle = document.querySelector('.profile__info-text-subtitle');

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
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const buttonPlus = document.querySelector('.profile__add-button')
const popupPlus = document.querySelector('.popup-cards')
const closePopupPluse = document.querySelector('.popup-cards__close-icon-pluse')
const formElementPlus = document.querySelector('.popup-cards__form-plus')
let inputName = document.querySelector('.popup-cards__container-field-title-plus');
let inputLink = document.querySelector('.popup-cards__container-field-subtitle-plus');



function showClick() {
  openPopup.classList.add('popup_opened');
}

editButton.addEventListener('click' , showClick);

function delite() {
  openPopup.classList.remove('popup_opened');
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
}

closePopup.addEventListener('click' , delite);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  delite()
}

formElement.addEventListener('submit', formSubmitHandler);

//initialCards

const elements = document.querySelector('.elements');

// Пробуем новое
// Создаем элемент
function renderItem(item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const initialCardItem = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const titleCard = initialCardItem.querySelector('.elements__title')
  const imgCard = initialCardItem.querySelector('.elements__mask-group')

  titleCard.textContent = item.name;
  imgCard.src = item.link;
  imgCard.alt = item.name;

  // Удаление карточки
  const trashElement = initialCardItem.querySelector('.elements__trash')
  trashElement.addEventListener('click', deliteCard)

  function deliteCard (evt) {
    const deliteCardElement = evt.target.closest('.elements__element');

    deliteCardElement.remove()
  }
  //Конец удаление

  // Лайки
  const likeCard = initialCardItem.querySelector('.elements__group')
  likeCard.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__group-like')
  });

  // Конец лайков

  // Попап картинки

  const imageFullScreen = initialCardItem.querySelector('.elements__mask-group')
  const popupImgText = document.querySelector('.popup__text');

  imageFullScreen.addEventListener('click', clickImg)


  function clickImg(){
    const img = item.link;
    popupImgOpen.classList.add('popup_opened-img')
    imgPopup.src = img;
    popupImgText.textContent = item.name
  }


  // Сделали попап картинки
  elements.prepend(initialCardItem);
}

// Создали элемент

//Проводим его по массиву

function renderItems(initialCards) {
  initialCards.forEach(renderItem)
}

renderItems(initialCards);

//Провели по массиву

function handleSubmit(evt) {
  evt.preventDefault()
  renderItem({
    name: inputName.value,
    link: inputLink.value
  });
  closePopupPlusCard()
}

const popupImgOpen = document.querySelector('.popup-img')
const imgPopup = popupImgOpen.querySelector('.popup__img-img')
const closePopupImg = popupImgOpen.querySelector('.popup__close-icon-img')

closePopupImg.addEventListener('click', function() {
  popupImgOpen.classList.remove('popup_opened-img')
})

formElementPlus.addEventListener('submit', handleSubmit)

// animation

// const contaiterPopup = openPopup.querySelector('.popup__container')
//
// closePopup.addEventListener('click', backAnimation)
//
// function backAnimation() {
//   openPopup.style.visibility = 'hidden'
//   openPopup.style.opacity = '0'
// }


// Новое

// initialCards.forEach(function (item) {
//   const cardTemplate = document.querySelector('.card-template').content;
//   const initialCardsItem = cardTemplate.querySelector('.elements__element').cloneNode(true);
//
//   initialCardsItem.querySelector('.elements__title').textContent = item.name;
//   initialCardsItem.querySelector('.elements__mask-group').src = item.link;
//
  // // Удаление карточки
  // const trashElement = initialCardsItem.querySelector('.elements__trash')
  // trashElement.addEventListener('click', deliteCard)
  //
  // function deliteCard (evt) {
  //   const deliteCardElement = evt.target.closest('.elements__element');
  //
  //   deliteCardElement.remove()
  // }
  // //Конец удаление
  //
  // // Лайки
  // const likeCard = initialCardsItem.querySelector('.elements__group')
  // likeCard.addEventListener('click', function (evt) {
  //   evt.target.classList.toggle('elements__group-like')
  // });
  //
  // // Конец лайков
//
//   elements.append(initialCardsItem);
// });

// Так это вроде плюс минус рабочий вариант, но он плюсует масив к масиву, нужно понять как
// удалять прошлый масив, либо же перезаписать его
// formElementPlus.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   initialCards.unshift (
//     {
//     name: inputName.value,
//     link: inputLink.value
//     }
//   );
//
//   closePopupPlusCard()
// });

buttonPlus.addEventListener('click', function() {
  popupPlus.classList.add('popup_opened-plus')
  inputName.value = '';
  inputLink.value = '';
});

function closePopupPlusCard() {
  popupPlus.classList.remove('popup_opened-plus')
}

closePopupPluse.addEventListener('click', closePopupPlusCard);


// initialCards.unshift(
//   {
//   name: 'putin',
//   link: 'https://cdnn21.img.ria.ru/images/07e4/06/02/1572352177_0:0:3003:1689_1920x0_80_0_0_fce871df5152d57016f94d940a0f5ecd.jpg'
//   }
// );




//cardTitle[0].textContent = arr[0]



//initialCards.forEach((item) => {
  //  cardTitle.innerHTML = item.name;
  //  console.log(item.name)
  //});

//initialCards.forEach(function(item){
//  cardTitle.textContent = item.name;
//});
