export default class Register {
  constructor({ authElement, handleFormSubmit, handleLinkClick }) {
    this._element = authElement;
    this._handleFormSubmit = handleFormSubmit;
    this._handleLinkClick = handleLinkClick || (() => {});

    this._handleLinkClick = this._handleLinkClick.bind(this);
  }

  setEventListeners() {
    this._element.querySelector('.auth__link').addEventListener('click', this._handleLinkClick);

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  open() {
    this._element.classList.add('auth_is-opened');
  }

  close() {
    this._element.classList.remove('auth_is-opened');
  }
}