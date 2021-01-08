export const renderLoading = (isLoading, buttonElement) => {
  if (isLoading) {
    buttonElement.textContent = 'Загрузка...';
    return;
  }
  else {
    buttonElement.textContent = 'Сохранить';
    return
  }
};
