export class FormValidator {
  constructor(enableValidationObj, formElement) {
    this._enableValidationObj = enableValidationObj;

    this._formElement = formElement;

    this._inputElement = this._formElement.querySelector(this._enableValidationObj.inputSelector);

    this._inputList = Array.from(this._formElement.querySelectorAll(this._enableValidationObj.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._enableValidationObj.submitButtonSelector);
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
    inputElement.classList.add(this._enableValidationObj.inputErrorClass);
    this._formError.textContent = this._inputElement.validationMessage;
    this._formError.classList.add(this._enableValidationObj.errorClass);
  }

  _hideInputError(inputElement) {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._enableValidationObj.inputErrorClass);
    this._formError.textContent = '';
    this._formError.classList.remove(this._enableValidationObj.errorClass);
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
    this._buttonElement.classList.add(this._enableValidationObj.inactiveButtonClass)
  }else {
    this._buttonElement.removeAttribute('disabled')
    this._buttonElement.classList.remove(this._enableValidationObj.inactiveButtonClass)
  }
}

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
}

  buttonDisabled() {
    this._buttonElement.classList.add('popup__button_disabled')
  }

  hideError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

}







