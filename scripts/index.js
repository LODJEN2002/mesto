let editButton = document.querySelector('.profile__edit-button'); // Кнопка изменения
let closePopup = document.querySelector('.popup__close-icon') // Кнопка закрытия поп-ап
let formElement = document.querySelector('.popup__form') // На изменение профиля
let saveButton = document.querySelector(".popup__container-save") // Кнопка сохранить
let nameInput = document.querySelector('.popup__container-field-title');
let jobInput = document.querySelector('.popup__container-field-subtitle');
let openPopup = document.querySelector('.popup');
let nameTitle = document.querySelector('.profile__info-text-title');
let jobSubtitle = document.querySelector('.profile__info-text-subtitle');

function showClick() {
  openPopup.classList.add('popup_opened');

}

editButton.addEventListener('click' , showClick);

function delite() {
  openPopup.classList.remove('popup_opened');
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
}

closePopup.addEventListener('click' , delite);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  delite()
}

formElement.addEventListener('submit', formSubmitHandler);
