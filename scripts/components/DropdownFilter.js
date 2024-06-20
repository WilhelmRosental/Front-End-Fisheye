class DropdownFilter {
  constructor() {
    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('filter-container')

    this.$addDom = document.querySelector('#main')
    this.$photographerMedia = document.querySelector('.photographer-media')

    this.createDropdownFilter()
    this.createFilter()
  }

  createDropdownFilter() {
    const filter = `
        
    <h4 class="filter-title">Trier par</h4>

    <div class="filter-media">
        <button 
            class="filter-button"
            role="combobox"
            aria-labelledby="filter-dropdown"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-controls="filter-dropdown">
                <span class="filter-selected">Popularité</span>
                <span class="filter-arrow"></span>
        </button>
        <ul class="filter-dropdown" role="listbox" id="filter-dropdown">
            <li role="option" tabindex="0">
                <input type="radio" id="filter-popularity" name="chooce-filter" />
                <label for="filter-popularity" class="filter-option" >Popularité</label>
            </li>
            <li role="option" tabindex="0">
                <input type="radio" id="filter-date" name="chooce-filter" />
                <label for="filter-date" class="filter-option" >Date</label>
            </li>
            <li role="option" tabindex="0">
                <input type="radio" id="filter-title" name="chooce-filter" />
                <label for="filter-title" class="filter-option" >Titre</label>
            </li>
        </ul>
    </div>
        
        `
    this.$wrapper.innerHTML = filter

    return this.$wrapper
  }

  createFilter() {
    this.$photographerMedia.appendChild(this.$wrapper)
    new MediaFilterButton()
  }
}


class MediaFilterButton {
  constructor() {
    this.$selectBtn = document.querySelector('.filter-button')
    this.attachClickEvent()
  }

  attachClickEvent() {
    const customSelect = new MediaFilterDropdown(this.$selectBtn)
    this.$selectBtn.addEventListener('click', () => {
      customSelect.toggleDropdown()
    })
  }
}


class MediaFilterDropdown {
  constructor(selectBtn) {
    this.selectBtn = selectBtn
    this.$selectedValue = document.querySelector('.filter-selected')
    this.$customSelect = document.querySelector('.filter-media')
    this.optionsList = document.querySelectorAll('.filter-dropdown li')

    this.attachEvents()
  }

  attachEvents() {
    this.optionsList.forEach((option) => {
      let isHandling = false

      function handler(e) {
        if (isHandling) return 
        const label = option.querySelector('label')
        if (
          e.key === 'Enter' ||
          (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0)
        ) {
          this.$selectedValue.textContent = label.textContent
          this.$customSelect.classList.remove('active')
          isHandling = true
          setTimeout(() => {
            isHandling = false
          }, 100)

          new SortFilters(label.textContent)
        }
      }

      option.addEventListener('keyup', handler.bind(this))
      option.addEventListener('click', handler.bind(this))
    })
  }

  toggleDropdown() {
    this.$customSelect.classList.toggle('active')
    const expanded = this.selectBtn.getAttribute('aria-expanded') === 'true'
    this.selectBtn.setAttribute('aria-expanded', !expanded)
  }
}