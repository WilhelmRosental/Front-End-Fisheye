/**
 * @brief object representing a photographer profil
 */
class PhotographerProfil {
  constructor(data) {
    this._name = data.name
    this._portrait = data.portrait
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
    this._url = 'photographer.html'
  }

  get name() {
    return this._name
  }

  get portrait() {
    return `assets/photographers/${this._portrait ?? 'account.png'}`
  }

  get city() {
    return this._city
  }

  get country() {
    return this._country
  }

  get tagline() {
    return this._tagline
  }

  get price() {
    return this._price
  }

  get url() {
    return `./${this._url}?user=${this._name}`
  }
}
