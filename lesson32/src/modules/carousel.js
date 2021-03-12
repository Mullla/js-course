import SliderCarousel from '../plugins/sliderCarousel';

const carouselSlider = () => {

    // сразу передаем параметры
    const carousel = new SliderCarousel({
        main: '.companies-wrapper',
        wrap: '.companies-hor',
        slidesToShow: 4,
        infinity: true,
        responsive: [{
                breakpoint: 1024,
                slideToShow: 3
            },
            {
                breakpoint: 768,
                slideToShow: 2
            },
            {
                breakpoint: 576,
                slideToShow: 1
            }]
    });

    carousel.init();

}

export default carouselSlider;