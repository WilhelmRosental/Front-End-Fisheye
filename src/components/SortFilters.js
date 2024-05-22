// ------------------------------------------------------------------------------
// Système pour trier
// ------------------------------------------------------------------------------
//  --> Je stock mes valeurs à réutiliser
//      -> l'ensemble des medias à réorganisé
//      -> l'instance pour lancer l'update
export class InitData {
  static data = []
  static getData() {
    return this.data
  }
  static update = {}
  static getUpdate() {
    return this.update
  }
}

export class SortFilters {
  constructor(typeFilter) {
    this._typeFilter = typeFilter
    this._filteredMedia = []

    this.sortData()
  }

  sortData() {
    if (this._typeFilter === 'Popularité') {
      this._filteredMedia = InitData.data.sort((a, b) => b._likes - a._likes)
    } else if (this._typeFilter === 'Titre') {
      this._filteredMedia = InitData.data.sort((a, b) =>
        a.title.localeCompare(b._title)
      )
    } else if (this._typeFilter === 'Date') {
      this._filteredMedia = InitData.data.sort((a, b) => {
        const dateA = new Date(a._date)
        const dateB = new Date(b._date)
        return dateB - dateA
      })
    }
    InitData.update.updateMedia(this._filteredMedia)
  }
}
