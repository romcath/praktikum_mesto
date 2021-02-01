/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-extra-boolean-cast */
import './index.css';
import {
  PLACES_WRAP,
  EDIT_FORM_MODAL_WINDOW,
  CARD_FORM_MODAL_WINDOW,
  IMAGE_MODAL_WINDOW,
  OPEN_EDIT_FORM_BUTTON,
  OPEN_CARD_FORM_BUTTON,
  PROFILE_TITLE,
  PROFILE_DESCRIPTION,
  PROFILE_AVATAR,
  TITLE_INPUT_VALUE,
  SUBMIT_EDIT_BUTTON,
  SUBMIT_CARD_BUTTON,
  SUBMIT_AVATAR_BUTTON,
  DESCRIPTION_INPUT_VALUE,
  CARD_SELECTOR,
  REMOVE_MODAL_WINDOW,
  DEFAULT_FORM_CONFIG,
  OPEN_AVATAR_FORM_BUTTON,
  AVATAR_MODAL_WINDOW,
  HEADER_ELEMENT,
  DEFAULT_MENU_CONFIG,
  ROOT_ELEMENT,
  SUCCESS_MODAL_WINDOW,
} from '../utils/constants';
import { renderLoading } from '../utils/utils';

import Api from '../components/api';
import Auth from '../components/auth';
import Card from '../components/card';
import FormValidator from '../components/formValidator';
import Section from '../components/section';
import UserInfo from '../components/user-info';
import Popup from '../components/popup';
import PopupWithImage from '../components/popupWithImage';
import PopupWithFormSubmit from '../components/popupWithFormSubmit';
import Header from '../components/header';

// Переменные
let userId = null;

// Инициализация классов
const auth = new Auth();

const popupSuccess = new Popup(SUCCESS_MODAL_WINDOW);
popupSuccess.setEventListeners();

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
const userInfo = new UserInfo(PROFILE_TITLE, PROFILE_DESCRIPTION, PROFILE_AVATAR);
const popupWithImage = new PopupWithImage(IMAGE_MODAL_WINDOW);
popupWithImage.setEventListeners();

const cardInfoSubmit = new PopupWithFormSubmit(REMOVE_MODAL_WINDOW);
cardInfoSubmit.setEventListeners();

const cardFormValidator = new FormValidator(DEFAULT_FORM_CONFIG, CARD_FORM_MODAL_WINDOW);
cardFormValidator.enableValidation();

const editFormValidator = new FormValidator(DEFAULT_FORM_CONFIG, EDIT_FORM_MODAL_WINDOW);
editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(DEFAULT_FORM_CONFIG, AVATAR_MODAL_WINDOW);
avatarFormValidator.enableValidation();

const createCard = (data) => {
  const card = new Card({
    cardData: { ...data, userId },
    handleCardClick: (data) => popupWithImage.open(data),
    handleLikeClick: (card) => {
      api.changeLikeCard(card.id(), card.isLiked())
        .then((data) => {
          console.log(data);
          card.setLike(data);
        })
        .catch((err) => console.log(`Ошибка изменения статуса лайка: ${err}`));
    },
    handleDeleteIconClick: (card) => {
      cardInfoSubmit.open();
      cardInfoSubmit.setSubmitAction(() => {
        api.removeCard(card.id())
          .then(() => {
            card.removeCard();
            cardInfoSubmit.close();
          })
          .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
      });
    },
    cardSelector: CARD_SELECTOR,
  });
  return card.getCard();
};

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
  container: PLACES_WRAP,
});

const newCardPopup = new PopupWithFormSubmit(CARD_FORM_MODAL_WINDOW);
newCardPopup.setEventListeners();
newCardPopup.setSubmitAction(() => {
  const data = cardFormValidator.getInputValues();

  renderLoading(true, SUBMIT_CARD_BUTTON);

  api.addCard(data)
    .then((cardData) => {
      cardList.addItem(createCard(cardData));
      renderLoading(false, SUBMIT_CARD_BUTTON);
      newCardPopup.close();
    })
    .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
    .finally(() => {
      renderLoading(false, SUBMIT_CARD_BUTTON);
    });
});

const userInfoPopup = new PopupWithFormSubmit(EDIT_FORM_MODAL_WINDOW);
userInfoPopup.setEventListeners();
userInfoPopup.setSubmitAction(() => {
  const data = editFormValidator.getInputValues();

  renderLoading(true, SUBMIT_EDIT_BUTTON);

  api.setUserInfo({
    name: data.name,
    about: data.description,
  })
    .then((info) => {
      userInfo.setUserInfo({
        name: info.name,
        description: info.about,
        avatar: info.avatar,
      });
      renderLoading(false, SUBMIT_EDIT_BUTTON);
      userInfoPopup.close();
    })
    .catch((err) => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
    .finally(() => {
      renderLoading(false, SUBMIT_EDIT_BUTTON);
    });
});

const changeAvatarPopup = new PopupWithFormSubmit(AVATAR_MODAL_WINDOW);
changeAvatarPopup.setEventListeners();
changeAvatarPopup.setSubmitAction(() => {
  const data = avatarFormValidator.getInputValues();

  renderLoading(true, SUBMIT_AVATAR_BUTTON);

  api.setUserAvatar({
    avatar: data.avatar,
  })
    .then((info) => {
      userInfo.setUserInfo({
        name: info.name,
        description: info.about,
        avatar: info.avatar,
      });
      renderLoading(false, SUBMIT_AVATAR_BUTTON);
      changeAvatarPopup.close();
    })
    .catch((err) => console.log(`Ошибка при изменении аватара пользователя: ${err}`))
    .finally(() => {
      renderLoading(false, SUBMIT_AVATAR_BUTTON);
    });
});

const headerLogged = new Header({
  headerElement: HEADER_ELEMENT,
  rootElement: ROOT_ELEMENT,
  handleHeaderClick: () => {
    api.logout()
      .then(() => {
        localStorage.removeItem('loginState');
        window.location.replace('./auth.html');
      })
      .catch((err) => console.log(`Ошибка разлогинивания: ${err}`));
  },
}, DEFAULT_MENU_CONFIG);

const handleLoginState = () => {
  if (auth.getLoginState()) {
    api.getAppInfo()
      .then(([cardsArray, userData]) => {
        userId = userData._id;

        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
        });

        cardList.renderItems(cardsArray);

        headerLogged.render(true, 'Выйти', userData.email);

        if (!!localStorage.getItem('signupState')) {
          localStorage.removeItem('signupState');
          popupSuccess.open();
        }
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  } else {
    window.location.replace('./auth.html');
  }
};
handleLoginState();

// Слушатели событий
OPEN_CARD_FORM_BUTTON.addEventListener('click', () => {
  const inputListCard = Array.from(CARD_FORM_MODAL_WINDOW.querySelectorAll('.form__input'));

  cardFormValidator.toggleButtonState(inputListCard, SUBMIT_CARD_BUTTON);
  cardFormValidator.resetSpans();
  newCardPopup.open();
});

OPEN_EDIT_FORM_BUTTON.addEventListener('click', () => {
  const inputListEdit = Array.from(EDIT_FORM_MODAL_WINDOW.querySelectorAll('.form__input'));
  const currentUserInfo = userInfo.getUserInfo();

  TITLE_INPUT_VALUE.value = currentUserInfo.name;
  DESCRIPTION_INPUT_VALUE.value = currentUserInfo.description;

  editFormValidator.toggleButtonState(inputListEdit, SUBMIT_EDIT_BUTTON);
  editFormValidator.resetSpans();
  userInfoPopup.open();
});

OPEN_AVATAR_FORM_BUTTON.addEventListener('click', () => {
  const inputListAvatar = Array.from(AVATAR_MODAL_WINDOW.querySelectorAll('.form__input'));

  avatarFormValidator.toggleButtonState(inputListAvatar, SUBMIT_AVATAR_BUTTON);
  avatarFormValidator.resetSpans();
  changeAvatarPopup.open();
});