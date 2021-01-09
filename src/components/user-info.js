export default class UserInfo {
  constructor(userNameElement, userDescriptionElement, userAvatarElement) {
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
    this._userAvatarElement = userAvatarElement;
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      description: this._userDescriptionElement.textContent,
      avatar: this._userAvatarElement.style.backgroundImage.slice(5, -2),
    };
  }

  setUserInfo({ name, description, avatar }) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = description;
    this._userAvatarElement.style.backgroundImage = `url(${avatar})`;
  }
}
