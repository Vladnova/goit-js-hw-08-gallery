import images from './gallery-items.js';
const refs = {
    gallery: document.querySelector('.js-gallery'),
    openModal: document.querySelector('.js-lightbox'),
    closeModal: document.querySelector('button[data-action="close-lightbox"]'),
    bigImgUrl: document.querySelector('.lightbox__image'),
    closeClickOverlay: document.querySelector('.lightbox__overlay'),
}
const { gallery, openModal, closeModal, bigImgUrl, closeClickOverlay } = refs; 

gallery.addEventListener('click', onOpenModal);
closeModal.addEventListener('click', onCloseModal);
closeClickOverlay.addEventListener('click', onCloseModal);


// Робимо функцію, яка буде створювати li, a, img
const createGalleryItem = image => {
    // створюємо  li з класом gallery__item
    const itemRef = document.createElement('li');
    itemRef.classList.add('gallery__item');
    // створюємо  а з класом gallery__link
    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.href = image.original;
    // створюємо  img з класом gallery__link
    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.src = image.preview;    
    imgRef.alt = image.description;
    imgRef.setAttribute('data-source', image.original);
    imgRef.setAttribute('data-index', index);    
        // додаємо все в itemRef 
    linkRef.appendChild(imgRef);
    itemRef.appendChild(linkRef);
    
    return itemRef;    
}

let index = 0;
// перебираємо всі li, і добавляємл їх в масив 
const galleryImages = images.map(image => { 
    // Додаємо всі li в DOM
    gallery.append(createGalleryItem(image));
    index += 1;    
});

function onOpenModal(e) {     
    // переконцємося в тому що клікаємо саме по зображенню
    e.preventDefault();
    openModal.classList.add('is-open');
    window.addEventListener('keydown', onPressModal);
    const img = e.target;    
    const imgIndex = img.dataset.index;
    if (img.nodeName !== 'IMG') {        
        return
    }    
    bigImgUrl.src = img.dataset.source;
    bigImgUrl.alt = img.alt;    
    bigImgUrl.setAttribute('data-index', imgIndex);  
};
function onCloseModal() {
    window.removeEventListener('keydown', onPressModal);    
    openModal.classList.remove('is-open'); 
    bigImgUrl.src = '';
    bigImgUrl.alt = '';
};
function onPressModal(e) {
    if (e.code === 'Escape') {            
         onCloseModal();
    };
    let activeIndex = bigImgUrl.dataset.index * 1;   
    if (activeIndex < images.length -1 ) {    
        if (e.code === 'ArrowRight') {
            bigImgUrl.src = images[activeIndex + 1].original;
            bigImgUrl.alt = images[activeIndex + 1].description;
            bigImgUrl.dataset.index = activeIndex + 1;            
        }              
    };
    if(activeIndex > 0){        
        if (e.code === 'ArrowLeft') {
            bigImgUrl.src = images[activeIndex - 1].original;
            bigImgUrl.alt = images[activeIndex - 1].description;
            bigImgUrl.dataset.index = activeIndex-1;
        }   
    };
};




