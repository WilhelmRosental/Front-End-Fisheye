/**
 * @brief Singleton pattern (one instance of this class)
 */
class PhotographerData {
    constructor(data) {
        if (PhotographerData.exists) {
            return PhotographerData.instance;
        }
        PhotographerData.instance = this;

        this._data = data;

        this.searchParams = new URLSearchParams(document.location.search).get(
            'user'
        );
    }

    /**
   * @brief Get the name of the photographer
   */
    get namePhotographer() {
        return this.searchParams;
    }

    /**
   * @brief Get the data of the photographer
   */
    get dataPhotographer() {
        return this._data.photographers.find(
            (element) => element.name === this.searchParams
        );
    }

    /**
   * @brief Get the medias of the photographer
   */
    get mediaPhotographer() {
        return this._data.media.filter(
            (element) => element.photographerId === this.dataPhotographer.id
        );
    }
}
