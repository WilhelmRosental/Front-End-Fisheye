class photographer {
    constructor() {
        this.$main = document.querySelector('#main');
        this.photographersApi = new Api('../data/photographers.json').get();

        this.dropdownContainer = document.createElement('div');

        this.$photographerMedia = document.createElement('div');
        this.$photographerMedia.classList.add('photographer-media');

        this.$mediaContainer = document.createElement('div');
        this.$mediaContainer.classList.add('media-container');
    }

    async render() {
        const photographersData = await this.photographersApi;

        // Only photographers datas
        const photographerAllData = await new PhotographerData(photographersData);

        // Photographer Header with these datas
        const photographerProfil = new PhotographerProfil(
            photographerAllData.dataPhotographer
        );
        const createHeaderPhotographer = new PhotographerHeader(photographerProfil);
        this.$main.appendChild(createHeaderPhotographer.createHeader());

        // photographer infos
        PhotographerInfo.price = photographerProfil.price;
        const createInfo = new PhotographerInfo();
        this.$main.appendChild(createInfo.createInfo());

        // add header & photographer infos to main
        this.$main.appendChild(this.$photographerMedia);

        // dropdown filter
        new DropdownFilter();

        // Medias list ?
        this.$photographerMedia.appendChild(this.$mediaContainer);

        //  --> Structure mes données medias
        const photographerMedia = photographerAllData.mediaPhotographer.map(
            (e) => new PhotographerMedia(e)
        );

        // Création intsance pour crée mes card media et récupérer infos
        const initMedia = new PhotographerMediaCard(photographerMedia);
        initMedia.createAllMedia();

        // je transfére mes donnees au filtre
        InitData.data = photographerMedia;
        InitData.update = initMedia;

        // contact modal
        const contactForm = new ContactForm(photographerProfil._name);
        contactForm.attachWindow();

        // lightbox
        Lightbox.data = photographerMedia;
        const lightbox = new Lightbox();
        lightbox.attachWindow();
    }
}

const run = new photographer();
run.render();
