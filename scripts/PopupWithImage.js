import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    open(name, link) {
        const image = this._popupSelector.querySelector('.popup-img__img-img')
        const caption = this._popupSelector.querySelector('.popup-img__text')

        image.src = link;
        caption.textContent = name;

        super.open()
    }
}