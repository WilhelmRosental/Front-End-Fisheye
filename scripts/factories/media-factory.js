/* eslint-disable no-undef */
/**
 * @brief Creating Image or Video Card
 * @class MediaFactory
 */
class MediaFactory {
    constructor(data, type, likeId) {
        if (type === 'image') {
            new ImageCard(likeId).createMedia(data);
        } else if (type === 'video') {
            new VideoCard(likeId).createMedia(data);
        } else {
            throw 'Unknown type format';
        }
    }
}
