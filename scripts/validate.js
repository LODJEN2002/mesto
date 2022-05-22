const enableValidationObj = {
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
//Валидация
const showInputError = (formElement, inputElement, enableValidationObj, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidationObj.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(enableValidationObj.errorClass);
}

const hideInputError = (formElement, inputElement, enableValidationObj, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(enableValidationObj.inputErrorClass)
  formError.textContent = ''
  formError.classList.remove(enableValidationObj.errorClass);
}

function isValid(formElement, inputElement, enableValidationObj) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, enableValidationObj, inputElement.validationMessage);
  }else {
    hideInputError(formElement, inputElement, enableValidationObj, inputElement.validationMessage)
  }
}


const setEventListeners = (formElement, enableValidationObj) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidationObj.inputSelector))

  const buttonElement = formElement.querySelector(enableValidationObj.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, enableValidationObj);

      toggleButtonState(inputList, buttonElement, enableValidationObj)
    })
  })
};


const enableValidation = (enableValidationObj) => {
  const formList = Array.from(document.querySelectorAll(enableValidationObj.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, enableValidationObj);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, enableValidationObj) => {
  if(hasInvalidInput(inputList)) {
    // buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add(enableValidationObj.inactiveButtonClass)
  }else {
    // buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(enableValidationObj.inactiveButtonClass)
  }
}

enableValidation(enableValidationObj);
