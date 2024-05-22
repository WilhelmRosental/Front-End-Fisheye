export class PhotographerHeader {
  constructor(photographer) {
    this._photographer = photographer

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('photograph-header')
  }

  get photographer() {
    return this._photographer
  }

  createHeader() {
    const photographerCard = `
          
        <section class="photograph-header__text">
            <h2 class="photograph-header__title">${this._photographer.name}</h2>
            <p class="photograph-header__localization">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="photograph-header__desc">${this._photographer.tagline}</p>
        </section>
        <button
            class="contact-button"
            onclick="contactForm.displayModal()"
            aria-label="Ouvrir le formulaire de contact"
            tabindex="0"
        >
            Contactez-moi
        </button>
        <img
            src="${this._photographer.portrait}"
            alt="${this._photographer.name}"
            class="user-card__picture"
        />
          
          `
    this.$wrapper.innerHTML = photographerCard

    return this.$wrapper
  }
}
