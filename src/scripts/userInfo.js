/*REVIEW. Отлично, что в UserInfo организовано взаимодействие с классом api.*/
class UserInfo {
  constructor(api) {
    this.name = '';
    this.about = '';
    this.avatar = '';
    this.ownerID = '';
    this.api = api;
    this.getUserInfo();
  }

  getUserInfo() {
    this.api.getAboutProfile().then((result) => {
      this.name = result.name;
      this.about = result.about;
      this.avatar = result.avatar;
      this.ownerID = result._id;
      this.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
  });
  }

  setUserInfo(name, about) {
    return this.api.patchAboutProfile(name, about).then((result) => {
      this.name = result.name;
      this.about = result.about;
      this.avatar = result.avatar;
      this.ownerID = result._id;
      this.updateUserInfo();
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  updateUserInfo() {
    const userName = document.querySelector('.user-info__name');
    const userJob = document.querySelector('.user-info__job');
    const userAvatar = document.querySelector('.user-info__photo');

    userName.id = this.ownerID;
    userName.textContent = this.name;
    userJob.textContent = this.about;
    userAvatar.setAttribute('src', this.avatar);
  }
}