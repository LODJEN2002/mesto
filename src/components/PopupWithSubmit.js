import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor( popupSelector, form) {
        super(popupSelector)
        this.form = this._popupSelector.querySelector(form)
    }

    setSubmitAction(actionFn) {
        this._actionFn = actionFn
    }

    setEventListeners() {
        this.form.addEventListener( 'submit', (evt) => {
            evt.preventDefault()
            this._actionFn()
        })
        super.setEventListeners()
    }
}