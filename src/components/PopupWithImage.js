import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector , captionSelector) {
        super(popupSelector)

        this._imageSelector = this._popupSelector.querySelector(imageSelector)
        this._captionSelector = this._popupSelector.querySelector(captionSelector)

    }
    open(name, link) {
        this._imageSelector.src = link;
        this._captionSelector.textContent = name;
        this._imageSelector.alt = name

        super.open()
    }
}