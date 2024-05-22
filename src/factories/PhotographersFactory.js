import { PhotographerProfil } from '../models/PhotographerProfil.js'

/**
 * @brief Factory to create photographers
 * @class PhotographersFactory
 */
export class PhotographersFactory {
    constructor(data, type) {
      if (type === 'photographers') {
        const PhotographerData = data.photographers.map((data) => {
          return new PhotographerProfil(data)
        })
        return PhotographerData
      } else {
        throw 'Unknown type format'
      }
    }
}