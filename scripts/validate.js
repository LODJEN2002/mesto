const object = {
  //форма и инпут
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  //Кнопочки)
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  // Ошибочки)
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Здесь я нахожу через цифры т.к через имя не получается, возможно проблема в дефисах,
// Готов переделать, но не совсем понимаю как это можно сделать...
const formProfile = document.forms[0]
const inputProfileName = formProfile.elements[0]
const inputProfileJob = formProfile.elements[1]
const profileButtonSave = formProfile.elements[2]


formProfile.addEventListener('input', function (evt) {
  buttonValid = inputProfileName.value.length > 1 && inputProfileJob.value.length > 1
  setSubmitButtonState(buttonValid, profileButtonSave ,'popup__container-save-disabled')
})

function setSubmitButtonState(isFormValid, button, disabledClass) {
  if(isFormValid) {
    button.removeAttribute('disabled')
    button.classList.remove(disabledClass)
  }else {
    button.setAttribute('disabled', true)
    button.classList.add(disabledClass)
  }
}

const formCards = document.forms.cards
const cardsButtonSave = formCards.elements[2]

formCards.addEventListener('input', function (evt) {
  buttonValid = inputName.value.length > 1 && inputLink.value.startsWith('https://')
  setSubmitButtonState(buttonValid, cardsButtonSave,'popup-cards__container-save-plus-disabled')
})


//Валидация
const showInputError = (formElement, inputElement, object) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  formError.classList.add('popup__input_form_error');
}

const hideInputError = (formElement, inputElement, object) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(object.inputErrorClass)
  formError.classList.remove('popup__input_form_error');
}

function isValid(formElement, inputElement, object) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, object);
  }else {
    hideInputError(formElement, inputElement, object)
  }
}


const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector))

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, object)
    })
  })
};


const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

enableValidation(object);
