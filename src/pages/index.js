/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
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
  DESCRIPTION_INPUT_VALUE,
  CARD_SELECTOR,
  REMOVE_MODAL_WINDOW,
  DEFAULT_FORM_CONFIG,
  INPUT_LIST_CARD,
  BUTTON_SUBMIT_CARD,
  INPUT_LIST_EDIT,
  BUTTON_SUBMIT_EDIT,
  OPEN_AVATAR_FORM_BUTTON,
  AVATAR_MODAL_WINDOW,
  INPUT_LIST_AVATAR,
  BUTTON_SUBMIT_AVATAR,
  HEADER_ELEMENT,
  SIGNUP_SELECTOR,
  DEFAULT_AUTH_CONFIG,
  MAIN_CONTENT,
  SUCCESS_MODAL_WINDOW,
  FAIL_MODAL_WINDOW,
} from '../utils/constants';
import { renderLoading } from '../utils/utils';

import Api from '../components/api';
// import Auth from '../components/auth';
import Header from '../components/header';
// import Register from '../components/register';
import Card from '../components/card';
import FormValidator from '../components/formValidator';
import Section from '../components/section';
import Popup from '../components/popup';
import PopupWithForm from '../components/popupWithForm';
import UserInfo from '../components/user-info';
import PopupWithImage from '../components/popupWithImage';
import PopupWithFormSubmit from '../components/popupWithFormSubmit';

// Переменные
let userId = null;

// Инициализация классов
// const auth = new Auth();

// const header = new Header(HEADER_ELEMENT);

const api = new Api({
  baseUrl: 'https://nomoreparties.co/cohort7',
  headers: {
    authorization: '5547747b-c129-4e77-93a7-481a2a2f0413',
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

const newCardPopup = new PopupWithForm({
  popupElement: CARD_FORM_MODAL_WINDOW,
  handleFormSubmit: (data) => {
    renderLoading(true, BUTTON_SUBMIT_CARD);

    api.addCard(data)
      .then((cardData) => {
        cardList.addItem(createCard(cardData));
        renderLoading(false, BUTTON_SUBMIT_CARD);
        newCardPopup.close();
      })
      .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
      .finally(() => {
        renderLoading(false, BUTTON_SUBMIT_CARD);
      });
  },
});
newCardPopup.setEventListeners();

const userInfoPopup = new PopupWithForm({
  popupElement: EDIT_FORM_MODAL_WINDOW,
  handleFormSubmit: (data) => {
    renderLoading(true, BUTTON_SUBMIT_EDIT);

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
        renderLoading(false, BUTTON_SUBMIT_EDIT);
        userInfoPopup.close();
      })
      .catch((err) => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
      .finally(() => {
        renderLoading(false, BUTTON_SUBMIT_EDIT);
      });
  },
});
userInfoPopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm({
  popupElement: AVATAR_MODAL_WINDOW,
  handleFormSubmit: (data) => {
    renderLoading(true, BUTTON_SUBMIT_AVATAR);

    api.setUserAvatar({
      avatar: data.avatar,
    })
      .then((info) => {
        userInfo.setUserInfo({
          name: info.name,
          description: info.about,
          avatar: info.avatar,
        });
        renderLoading(false, BUTTON_SUBMIT_AVATAR);
        changeAvatarPopup.close();
      })
      .catch((err) => console.log(`Ошибка при изменении аватара пользователя: ${err}`))
      .finally(() => {
        renderLoading(false, BUTTON_SUBMIT_AVATAR);
      });
  },
});
changeAvatarPopup.setEventListeners();

const authList = new Section({
  container: MAIN_CONTENT,
});

const popupSuccess = new Popup(SUCCESS_MODAL_WINDOW);
popupSuccess.setEventListeners();
const popupFail = new Popup(FAIL_MODAL_WINDOW);
popupFail.setEventListeners();

// const register = new Register({
//   signupSelector: SIGNUP_SELECTOR,
//   handleFormSubmit: (data) => {
//     api.signup(data)
//       .then(() => {
//         popupSuccess.open();
//       })
//       .catch((err) => {
//         popupFail.open();
//         console.log(`Ошибка регистрации пользователя: ${err}`);
//       });
//   },
// });

// const handleLoginState = () => {
//   if (auth.getLoginState()) {
//     // загрузить основной контент
//   } else {
//     authList.addItem(register.getSignup());

//     const singupWindow = document.querySelector('.auth_type_signup');
//     const signupFormValidator = new FormValidator(DEFAULT_AUTH_CONFIG, singupWindow);
//     signupFormValidator.enableValidation();

//     header.render(false);
//   }
// };

// Мобильное меню
const mobileMenuButton = document.querySelector('.header__menu-icon');
const root = document.querySelector('.root');

function closeMenuMobile() {
  root.classList.remove('root__transform');
  document.querySelector('.menu').classList.remove('menu_type_mobile');
  document.querySelector('.header__menu-icon_close').removeEventListener('click', openMenuMobile);
  mobileMenuButton.classList.remove('header__menu-icon_close');
  mobileMenuButton.addEventListener('click', openMenuMobile);
}

function openMenuMobile() {
  root.classList.add('root__transform');
  document.querySelector('.menu').classList.add('menu_type_mobile');
  mobileMenuButton.classList.add('header__menu-icon_close');
  mobileMenuButton.removeEventListener('click', openMenuMobile);
  document.querySelector('.header__menu-icon_close').addEventListener('click', closeMenuMobile);
}
mobileMenuButton.addEventListener('click', openMenuMobile);

// Слушатели событий
OPEN_CARD_FORM_BUTTON.addEventListener('click', () => {
  cardFormValidator.toggleButtonState(INPUT_LIST_CARD, BUTTON_SUBMIT_CARD);
  cardFormValidator.resetSpans();
  newCardPopup.open();
});

OPEN_EDIT_FORM_BUTTON.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  TITLE_INPUT_VALUE.value = currentUserInfo.name;
  DESCRIPTION_INPUT_VALUE.value = currentUserInfo.description;
  editFormValidator.toggleButtonState(INPUT_LIST_EDIT, BUTTON_SUBMIT_EDIT);
  editFormValidator.resetSpans();
  userInfoPopup.open();
});

OPEN_AVATAR_FORM_BUTTON.addEventListener('click', () => {
  avatarFormValidator.toggleButtonState(INPUT_LIST_AVATAR, BUTTON_SUBMIT_AVATAR);
  avatarFormValidator.resetSpans();
  changeAvatarPopup.open();
});

api.getAppInfo()
  .then(([cardsArray, userData]) => {
    // header.render(true, userData.email);

    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });

    cardList.renderItems(cardsArray);
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));

// handleLoginState();