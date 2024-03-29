import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)

        this._handleSubmit = handleSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')]
    }

    _getInputValues() {     
        const values = {}

        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        })

        return values
    }

    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', () => {
            this._handleSubmit(this._getInputValues())
        });
    }

    close() {
        super.close();

        this._form.reset();
    }

    renderLoading(isLoading, text, textLoader) {
        if(isLoading) {
            this._popupSelector.querySelector('.popup__button').textContent = textLoader
        }else{
            this._popupSelector.querySelector('.popup__button').textContent = text
        }
      }
}