 
class Api {
    constructor(url) {
        this._url = url;
    }

    /**
   *
   * @returns {Promise<Object>} A promise that resolves to the data fetched from the API.
   */
    async get() {
        try {
            const response = await fetch(this._url);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return await response.json();
        } catch (error) {
            console.error('an error occurs :', error);
            return null;
        }
    }
}
