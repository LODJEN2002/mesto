
// //Валидация
// const showInputError = (formElement, inputElement, enableValidationObj, errorMessage) => {
//   const formError = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(enableValidationObj.inputErrorClass);
//   formError.textContent = errorMessage;
//   formError.classList.add(enableValidationObj.errorClass);
// }

// const hideInputError = (formElement, inputElement, enableValidationObj) => {
//   const formError = formElement.querySelector(`.${inputElement.id}-error`)
//   inputElement.classList.remove(enableValidationObj.inputErrorClass)
//   formError.textContent = ''
//   formError.classList.remove(enableValidationObj.errorClass);
// }

// function isValid(formElement, inputElement, enableValidationObj) {
//   if(!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, enableValidationObj, inputElement.validationMessage);
//   }else {
//     hideInputError(formElement, inputElement, enableValidationObj)
//   }
// }


// const setEventListeners = (formElement, enableValidationObj) => {
//   const inputList = Array.from(formElement.querySelectorAll(enableValidationObj.inputSelector))

//   const buttonElement = formElement.querySelector(enableValidationObj.submitButtonSelector)

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, enableValidationObj);

//       toggleButtonState(inputList, buttonElement, enableValidationObj)
//     })
//   })
// };


// const enableValidation = (enableValidationObj) => {
//   const formList = Array.from(document.querySelectorAll(enableValidationObj.formSelector))

//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, enableValidationObj);
//   });
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid
//   })
// }

// const toggleButtonState = (inputList, buttonElement, enableValidationObj) => {
//   if(hasInvalidInput(inputList)) {
//     // buttonElement.setAttribute('disabled', true)
//     buttonElement.classList.add(enableValidationObj.inactiveButtonClass)
//   }else {
//     // buttonElement.removeAttribute('disabled')
//     buttonElement.classList.remove(enableValidationObj.inactiveButtonClass)
//   }
// }

// enableValidation(enableValidationObj);

const enableValidationObj = {
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



class FormValidatorTest {
  constructor(enableValidationObj, formElement) {
    this._formElement = formElement
    this._inputElement = this._formElement.querySelector(enableValidationObj.inputSelector)

    this._inputList = Array.from(this._formElement.querySelectorAll(enableValidationObj.inputSelector))
    this._buttonElement = this._formElement.querySelector(enableValidationObj.submitButtonSelector)

  }
  
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)

        this._toggleButtonState()
      })
    })
  }

  _showInputError(inputElement) {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidationObj.inputErrorClass);
    this._formError.textContent = this._inputElement.validationMessage;
    this._formError.classList.add(enableValidationObj.errorClass);
  }

  _hideInputError(inputElement) {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidationObj.inputErrorClass);
    this._formError.textContent = '';
    this._formError.classList.remove(enableValidationObj.errorClass);
  }

  _isValid(inputElement) {
    if(!inputElement.validity.valid){
      this._showInputError(inputElement)
    }else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

  _toggleButtonState() {
  if(this._hasInvalidInput(this._inputList)) {
    this._buttonElement.setAttribute('disabled', true)
    this._buttonElement.classList.add(enableValidationObj.inactiveButtonClass)
  }else {
    this._buttonElement.removeAttribute('disabled')
    this._buttonElement.classList.remove(enableValidationObj.inactiveButtonClass)
  }
}

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
};
  
}


const formProfile = document.querySelector('.popup__form')

const formCardValid = document.forms.cards

const profileFormValid = new FormValidatorTest(enableValidationObj, formProfile);
const cardFormValid = new FormValidatorTest(enableValidationObj, formCardValid);




const validytyProfile = profileFormValid.enableValidation();
const validytyCard = cardFormValid.enableValidation();



























// class Greeding {
//   constructor(hello, name) {
//     this.hello = hello;
//     this.name = name 
//   }

//   sayHello() {
//     console.log(this.hello, this.name)
//   }
// }

// const ss = new Greeding('Привет', 'Иван')
// const ssy = ss.sayHello()


// const mary = new Greeding('Привет', "Маша")
// const ssq = mary.sayHello()