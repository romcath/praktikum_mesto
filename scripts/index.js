/*REVIEW. Отлично, что код скрипта обёрнут в функцию IIFE*/

(function iifi() {
  const userInfo = document.querySelector('.user-info');
  const root = document.querySelector('.root');
  const placesList = document.querySelector('.places-list');

  const newCardForm = document.forms.new;
  const editProfileForm = document.forms.edit;
  const avatarForm = document.forms.avatar;

  const words = {
    validationLength: 'Должно быть от 2 до 30 символов',
    validationMissing: 'Это обязательное поле',
    validationLink: 'Здесь должна быть ссылка'
  }

  const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort7',
    headers: {
      authorization: '5547747b-c129-4e77-93a7-481a2a2f0413',
      'Content-Type': 'application/json'
    }
  });

  // Инициализация классов
  const validation = new FormValidator(words);
  const popup = new Popup();
  const popupProfile = new PopupProfile(validation);
  const popupCard = new PopupCard(validation);
  const popupAvatar = new PopupAvatar(validation);
  const popupImage = new PopupImage();
  const card = new Card();
  const cardList = new CardList(card);
  const user = new UserInfo(api);

  listeners();

  function listeners() {

    // Загружает первоначальные карточки с сервера
    function getCards() {
      api.getInitialCards().then((result) => {
        cardList.render(document.querySelector('.places-list'), result);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    // Обработчик открытия попапа
    function openPopup() {
      if (event.target.classList.contains('user-info__button-edit')) {
        popupProfile.open();
      } else if (event.target.classList.contains('user-info__button-add')) {
        popupCard.open();
      } else if (event.target.classList.contains('user-info__photo')) {
        popupAvatar.open();
      }
    }

    // Обработчик закрытия попапа
    function popupClose() {
      if (event.target.classList.contains('popup__close')) {
      /*REVIEW. Можно лучше. По сведениям от mdn (developer.mozilla.org/ru/docs/Web/API/Element/closest), функция closest не поддерживается в браузере IE,
  поэтому лучше использовать свойство parentElement.*/
        const closeElement = event.target.closest('.popup');
        popup.close(closeElement);
      }
    }

    // Обработчик событий для списка карточек
    function cardsList() {
      if (event.target.classList.contains('place-card__like-icon_liked')) {
        const getElement = event.target.closest('.place-card');

        api.deleteLike(getElement.id).then((res) => {
          card.like(res, getElement);
        })
        .catch((err) => {
          console.log(err);
        });

      } else if (event.target.classList.contains('place-card__like-icon')) {
        const getElement = event.target.closest('.place-card');

        api.putLike(getElement.id).then((res) => {
          card.like(res, getElement);
        })
        .catch((err) => {
          console.log(err);
        });

      } else if (event.target.classList.contains('place-card__delete-icon')) {
        const getElement = event.target.closest('.place-card');
        if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            api.deleteCard(getElement.id).then(() => {
              card.remove(getElement);
            })
            .catch((err) => {
              console.log(err);
            });
          }
      } else if (event.target.classList.contains('place-card__image')) {
        popupImage.openImage();
      }
    }

    // Обработчик закрытия попапа по ESC
    function escKey() {
      if (event.keyCode === 27) {
        if (event.target.classList.contains('user-info__button-edit')) {
          const closeElement = document.querySelector('.popup_type_edit-profile');
          popup.close(closeElement);
        } else if (event.target.classList.contains('user-info__button-add')) {
          const closeElement = document.querySelector('.popup_type_new-card');
          popup.close(closeElement);
        }
      }
    }

    // Обработчик добавления новой карточки
    function appendCard() {
      event.preventDefault();

      const closeElement = event.target.closest('.popup');
      const item = {
        name: newCardForm.elements.title.value,
        link: newCardForm.elements.link.value
      }

      api.postNewCard(newCardForm.elements.title.value, newCardForm.elements.link.value).then((result) => {
        item._id = result._id;
        card.create(item);
        cardList.addCard(document.querySelector('.places-list'));
        popup.close(closeElement);
        newCardForm.reset();
      })
      .catch((err) => {
        console.log(err);
      });
    }

    // Обработчик редактирования профиля
    function editProfile() {
      event.preventDefault();

      const closeElement = event.target.closest('.popup');
      user.setUserInfo(editProfileForm.elements.name.value, editProfileForm.elements.about.value).then(() => {
        popup.close(closeElement);
        editProfileForm.reset();
      })
      .catch((err) => {
        console.log(err);
      });
    }

    function avatarChange() {
      event.preventDefault();

      const closeElement = event.target.closest('.popup');
      api.patchAvatar(avatarForm.elements.avatar.value).then(() => {
        user.getUserInfo();
        popup.close(closeElement);
        avatarForm.reset();
      })
      .catch((err) => {
        console.log(err);
      });
    }

    // Слушатели событий
    userInfo.addEventListener('click', openPopup);
    root.addEventListener('click', popupClose);
    placesList.addEventListener('click', cardsList);
    root.addEventListener('keydown', escKey);
    newCardForm.addEventListener('submit', appendCard);
    editProfileForm.addEventListener('submit', editProfile);
    avatarForm.addEventListener('submit', avatarChange);

    // Вызов функций
    getCards();
  }
})();


/*REVIEW резюме.
Очень сильная работа! Сделаны все дополнительные задания. Грамотно разбит код на классы.

В чём конкретно достигнут успех:
1. Сделаны все требующиеся проверки при работе с сервером.
2. Везде учтена асинхронность поступления ответов от сервера.
3. В полном объёме созданы блоки обнаружения ошибок при работе с сервером.
4. Созданы классы расширяющие класс Popup.
5. Код логично организован.
6. Применена функция insertAdjacentHTML, а не innerHTML.
7. Код в модуле index.js обернут в IIFE функцию.

Что можно улучшить
1. Лучше не навешивать события клика на элементы карточки, а использовать делегирование событий, как это сделано в других случаях в этой же работе.
2. Сделать корректным закрытие  всплывающих окон по нажатию клавиши ESC, сейчас корректно работает только для формы профиля.
3. Валидация сделана с помощью свойства validity. Сделанная "вручную", она была бы гибче.
4. Не использовать функцию closest, так как она не поддерживается в IE.

Задание принято!

*/