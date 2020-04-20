class UserInfo {

  setUserInfo({ name, about, avatar, _id }) {
    this.name = name;
    this.info = about;
    this.avatar = avatar;
    this.userId = _id;
  }

  updateUserInfo({ name, about, avatar }) {
    document.querySelector('.user-info__name').textContent = name;
    document.querySelector('.user-info__job').textContent = about;
    document.querySelector('#edit-avatar').style.backgroundImage = `url(${avatar})`;
  }

  get getUserId() {
    return this.userId;
  }

  get getName() {
    return this.name;
  }

  get getInfo() {
    return this.info;
  }
}



