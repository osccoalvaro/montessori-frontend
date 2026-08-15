document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.js-testimonials-slider', {
        loop: true,
        spaceBetween: 20,
        // If we need pagination
        pagination: {
            el: '.js-testimonials-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1000: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        }
    });
});