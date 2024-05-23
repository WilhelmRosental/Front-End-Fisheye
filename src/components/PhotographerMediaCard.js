import { MediaFactory } from '../factories/MediaFactory.js'
import { PhotographerInfo } from './PhotographerInfo.js'

export class PhotographerMediaCard {
  constructor(photographer) {
    this._photographer = photographer
    this._likeId = 0
    this._totalLikes = 0

    this._localStorageKey = `listLikes${this._photographer[0]._photographerId}`

    this._arrayStorage =
      JSON.parse(localStorage.getItem(this._localStorageKey)) || []

    this.$mediaContainer = document.querySelector('.media-container')
  }

  get photographer() {
    return this._photographer
  }

  set photographer(value) {
    this._photographer = value
  }

  get totalLikes() {
    return this._totalLikes
  }

  createAllMedia() {
    this._photographer.forEach((element, index) => {
      new MediaFactory(element, element.formatPicture, this._likeId)

      this._likeId++
      this._totalLikes += element.likes
      this.createLikes(index)
    })

    const $pictureCard =
      this.$mediaContainer.querySelectorAll('.media-card__img')
    $pictureCard.forEach((image) =>
      image.addEventListener('keyup', (e) => {
        // open lightbox with enter key
        if (e.key === 'Enter') {
          lightbox.listenerLightbox(image)
          e.preventDefault
        }
      })
    )
    this.updateLike()
  }

  updateMedia(data) {
    this.resetMedia()
    this._photographer = data
    this._likeId = 0
    this._totalLikes = 0
    this.createAllMedia()
  }

  resetMedia() {
    this.$mediaContainer.innerHTML = ''
  }

  createLikes(index) {
    const $inputliked = document.getElementById(`like${index}`)
    const $likeTextContent = document.getElementById(`nbrLike${index}`)
    if (this._arrayStorage.includes(this._photographer[index].id)) {
      $inputliked.setAttribute('checked', 'checked')
      this.addLike($likeTextContent)
    }
  }

  updateLike() {
    const displayNewTotalLikes = new PhotographerInfo()
    // Cible les label like du DOM
    const $updateLike = document.querySelectorAll('.media-card__label')
    $updateLike.forEach((label, index) => {
      this.toggleCheckbox(label, index, displayNewTotalLikes)
      this.enterCheckbox(label, index, displayNewTotalLikes)
    })

    // Changement du conteneur total like
    displayNewTotalLikes.updateInfo(this.totalLikes)
  }

  addLike(numberLike) {
    let plusNbr = Number(numberLike.textContent) + 1
    this._totalLikes++
    numberLike.textContent = `${plusNbr}`
  }

  removeLike(numberLike) {
    let plusNbr = Number(numberLike.textContent) - 1
    this._totalLikes--
    numberLike.textContent = `${plusNbr}`
  }

  /**
   * @brief change like on click
   * @param {*} label 
   * @param {*} index 
   * @param {*} displayNewTotalLikes 
   */
  toggleCheckbox(label, index, displayNewTotalLikes) {
    const $likeTextContent = document.getElementById(`nbrLike${index}`)

    label.addEventListener('change', () => {
      if (this._arrayStorage.includes(this._photographer[index].id)) {
        // remove from local storage
        const indexToRemove = this._arrayStorage.indexOf(
          this._photographer[index].id
        )
        this._arrayStorage.splice(indexToRemove, 1)
        this.removeLike($likeTextContent)
        displayNewTotalLikes.updateInfo(this.totalLikes)
      } else {
        // add to local storage
        this._arrayStorage.push(this._photographer[index].id)
        this.addLike($likeTextContent)
        displayNewTotalLikes.updateInfo(this.totalLikes)
      }

      // local storage update
      localStorage.setItem(
        this._localStorageKey,
        JSON.stringify(this._arrayStorage)
      )
    })
  }

  /**
   * @brief change like with enter key
   * @param {*} label 
   * @param {*} index 
   * @param {*} displayNewTotalLikes 
   */
  enterCheckbox(label, index, displayNewTotalLikes) {
    const $checkbox = document.getElementById(`like${index}`)

    const $likeTextContent = document.getElementById(`nbrLike${index}`)
    label.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        $checkbox.checked = !$checkbox.checked
        e.preventDefault()
        if ($checkbox.checked) {
          this._arrayStorage.push(this._photographer[index].id)
          this.addLike($likeTextContent)
          displayNewTotalLikes.updateInfo(this.totalLikes)
        } else {
          const indexToRemove = this._arrayStorage.indexOf(
            this._photographer[index].id
          )
          this._arrayStorage.splice(indexToRemove, 1)
          this.removeLike($likeTextContent)
          displayNewTotalLikes.updateInfo(this.totalLikes)
        }
      }

      // local storage update
      localStorage.setItem(
        this._localStorageKey,
        JSON.stringify(this._arrayStorage)
      )
    })
  }
}
