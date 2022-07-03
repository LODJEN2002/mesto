import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, image , caption) {
        super(popupSelector)

        this._image = this._popupSelector.querySelector(image)
        this._caption = this._popupSelector.querySelector(caption)

    }
    open(name, link) {
        this._image.src = link;
        this._caption.textContent = name;
        this._image.alt = name

        super.open()
    }
}