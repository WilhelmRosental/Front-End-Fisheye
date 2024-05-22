export class PhotographerInfo {
  constructor() {
    this._totalLike = 0

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('photographer-info')
  }
  static price = ''

  createInfo() {
    const photographerInfo = `
        
      <div class="photographer-info__likes">
        <p class="photographer-info__nbrLikes">${this._totalLike}</p>
        
        <img
          class="photographer-info__likesIcon"
        />
      </div>
      <p class="photographer-info__price">${PhotographerInfo.price}€ / jour</p>
        
        `
    this.$wrapper.innerHTML = photographerInfo

    return this.$wrapper
  }

  updateInfo(newTotalLikes) {
    this._totalLike = newTotalLikes
    const $textLike = document.querySelector('.photographer-info__nbrLikes')
    $textLike.textContent = this._totalLike
  }
}
