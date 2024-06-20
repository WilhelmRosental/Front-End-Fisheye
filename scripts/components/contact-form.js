class ContactForm {
    constructor(userData) {
        this._userData = userData;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('contact-modal');

        this.$body = document.querySelector('body');
        this.$insertDom = document.querySelector('.body-container');
        this.$mainDom = document.querySelector('main');

        this.createForm();
    }

    attachWindow() {
        window.contactForm = this;
    }

    createForm() {
        const modalCreate = `
    
      <div class="modal" role="document">
        <header class="modal-header">
          <h2 id="modalTitle" class="modal-title">Contactez-moi <br> ${this._userData}</h2>
          <button onclick="contactForm.closeModal()" class="modal-close" aria-label="Fermer">
            <span class="sr-only">Fermer le formulaire de contact</span>
          </button>
        </header>
        <form method="post" action="#" class="modal-form" onsubmit="return contactForm.validate(event);">
          <fieldset class="modal-fieldset">
            <label for="prenom" class="modal-label">Prénom</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              class="modal-input"
              aria-placeholder="Entrer votre prénom"
              autocomplete="given-name"
            />

            <label for="nom" class="modal-label">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              class="modal-input"
              aria-placeholder="Entrer votre nom"
              autocomplete="family-name"
            />

            <label for="email" class="modal-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="modal-input"
              aria-placeholder="Entrer votre email"
              autocomplete="email"
            />
            <p class="modal-message">
              <label for="message" class="modal-label">Message</label>
              <textarea
                name="message"
                id="message"
                class="modal-textarea"
                aria-placeholder="Entrer votre message"
              ></textarea>
            </p>
          </fieldset>
          <button type="submit" class="modal-submit">Envoyer</button>
        </form>
      </div>
    
    `;

        this.$wrapper.innerHTML = modalCreate;
        this.$wrapper.id = 'contact-modal';
        this.$wrapper.role = 'dialog';
        this.$wrapper.setAttribute('aria-labelledby', 'modalTitle');
        this.$wrapper.setAttribute('aria-label', 'Modal de contacte');
        this.$wrapper.setAttribute('tabindex', '-1');
        this.$wrapper.setAttribute('aria-hidden', 'true');
        this.$wrapper.style.display = 'none';

        this.$body.appendChild(this.$wrapper);
    }

    displayModal() {
        const $modal = document.getElementById('contact-modal');
        $modal.style.display = 'block';

        this.$insertDom.setAttribute('aria-hidden', 'true');
        const $modalDom = document.querySelector('.contact-modal');
        $modalDom.setAttribute('aria-hidden', 'false');

        const closeBtn = document.querySelector('.modal-close');
        closeBtn.focus();

        const classThis = this;
        document.addEventListener('keydown', function (e) {
            const modal = document.getElementById('contact-modal');

            if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
                classThis.closeModal();
            }
        });

        this.focusModal($modal);
    }

    /**
   * @brief handle focus
   * @param {*} $modal
   */
    focusModal($modal) {
    // get focusable elements
        const focusElements = $modal.querySelectorAll('button, input');
        const focusElementsArray = Array.from(focusElements);

        const firstFocusElement = focusElementsArray[0];
        const lastFocusElement = focusElementsArray[focusElementsArray.length - 1];

        // focus trap
        $modal.addEventListener('keydown', function (e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusElement) {
                    e.preventDefault();
                    lastFocusElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusElement) {
                    e.preventDefault();
                    firstFocusElement.focus();
                }
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('contact-modal');
        modal.style.display = 'none';

        this.$insertDom.setAttribute('aria-hidden', 'false');
        const $modalDom = document.querySelector('.contact-modal');
        $modalDom.setAttribute('aria-hidden', 'true');

        const openBtn = document.querySelector('.contact-button');
        openBtn.focus();
    }

    getDataInput() {
        const getPrenom = document.querySelector('#prenom').value;
        const getNom = document.querySelector('#nom').value;
        const getEmail = document.querySelector('#email').value;
        const getMessage = document.querySelector('#message').value;
        return { getPrenom, getNom, getEmail, getMessage };
    }

    deleteDataInput() {
        document.querySelectorAll('.modal-input').forEach((e) => {
            e.value = '';
        });
        const textareaValue = document.querySelector('.modal-textarea');
        textareaValue.value = '';
    }

    validate(event) {
        event.preventDefault();
        this.closeModal();
        const data = this.getDataInput();
        console.log(`Prénom: ${data.getPrenom}`);
        console.log(`Nom: ${data.getNom}`);
        console.log(`Email: ${data.getEmail}`);
        console.log(`Message: ${data.getMessage}`);
        console.log('Envoyé');

        this.deleteDataInput();
    }
}
