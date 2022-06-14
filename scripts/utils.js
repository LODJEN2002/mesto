export { validationConfig, initialCards }
const validationConfig = {
    //Форма и инпут
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    //Кнопки)
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    // Ошибки)
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

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

