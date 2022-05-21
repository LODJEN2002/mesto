const obj = {
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
const showInputError = (formElement, inputElement, obj) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  formError.classList.add('popup__input_form_error');
}

const hideInputError = (formElement, inputElement, obj) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(obj.inputErrorClass)
  formError.classList.remove('popup__input_form_error');
}

function isValid(formElement, inputElement, obj) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, obj);
  }else {
    hideInputError(formElement, inputElement, obj)
  }
}


const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector))

  const buttonElement = formElement.querySelector(obj.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);

      toggleButtonState(inputList, buttonElement, obj)
    })
  })
};


const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, obj) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add(obj.inactiveButtonClass)
  }else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(obj.inactiveButtonClass)
  }
}

enableValidation(obj);
