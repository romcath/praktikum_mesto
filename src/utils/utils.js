/* eslint-disable import/prefer-default-export */
export const renderLoading = (isLoading, buttonElement) => {
  if (isLoading) {
    buttonElement.textContent = 'Загрузка...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};
