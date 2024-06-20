class App {
  constructor() {
    this.photographersApi = new Api('./data/photographers.json').get()
    this.$addDom = document.querySelector('.photographer_section')
  }
  
  async render() {
    const photographersData = await this.photographersApi
  
    const Photographers = new PhotographersFactory(
      photographersData,
      'photographers'
    )

    console.log('PHOTOGRAPHERS', Photographers)

    Photographers.forEach((photographer) => {
      const TemplateCard = new PhotographerCard(photographer)
      this.$addDom.appendChild(TemplateCard.createPhotographerCard())
    })
  }
}
  
const app = new App()
app.render()