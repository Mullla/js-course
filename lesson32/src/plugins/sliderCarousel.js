class SliderCarousel{
    // пользователь обязательно должен передать эти настройки
    // их достаточно, чтобы слайдер уже работал
    // использовали деструктцризацию
    constructor({
        main, 
        wrap, 
        next, 
        prev, 
        infinity = false,
        position = 0, 
        slidesToShow = 3,
        responsive = []
    }) {

        if(!main || !wrap){
            console.warn('slider-carousel: Необходимо два селектора: "main" и "wrap"!')
        }

        // ищем на странице то, что передал пользователь
        // обертка всего блока слайдера, где слайды, кнопки
        this.main = document.querySelector(main);
        // обертка самого слайдера
        this.wrap = document.querySelector(wrap);
        // обертка каждого слайда
        this.slides = document.querySelector(wrap).children;
        // стрелки слайдера
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;

        this.options = {
            // с какой позиции (какого слайда начинается слайдер)
            position,
            infinity,
            // чтобы регулировать ширину слайдов в стилях
            slideWidth: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow
        };

        this.responsive = responsive;

    }

    init(){

        this.addGloClasses();
        this.addStyles();

        // если кнопки-стрелки были переданы пользователем
        if(this.prev && this.next){
            this.controlSlider();
        // если поьзователь не передал, то мы добавляем свои
        } else {
            this.addArrows();
        }

        if(this.responsive){
            this.responsiveInit();
        }
    }

    // должны добавить свои стили слайдера, а не переписать
    addGloClasses(){
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (const item of this.slides){
            item.classList.add('glo-slider__item');
        }
    }
    
    // прописываем свои стили (или можно через css-документ добпвлять)
    addStyles(){
        let style = document.getElementById('sliderCarousel-style');

        if(!style){
            // создаем элемент тольк если его нет
            style = document.createElement('style'); 
            style.id = 'sliderCarousel-style';
        }


        // will-change - предупредить браузер, что какое-то свойство будет меняться
        style.textContent = `
            .glo-slider{
                overflow: hidden;
                position: relative;
            }
            .glo-slider__wrap{
                display: flex;
                transition: transform .3s;
                will-change: transform;
                
            }
            .glo-slider__item{
                flex: 0 0 ${this.options.slideWidth}% !important;
                margin: auto 0 !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
            }
            .glo-slider__prev,
            .glo-slider__next {
                top: 50%;
                transform: translateY(-50%);
                position: absolute;
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .glo-slider__next{
                right: 0;
                border-left-color: #19b5fe;
            }
            .glo-slider__prev{
                left: 0;
                border-right-color: #19b5fe;
            }
            .glo-slider__prev:hover, 
            .glo-slider__next:hover, 
            .glo-slider__next:focus, 
            .glo-slider__prev:focus{
                background: transparent;
                outline: transparent;
            }
        `;

        document.head.append(style);
    }

    controlSlider(){
        // биндим объект, потому что по умолчанию this - это кнопки
        // можно переписать функцию на стрелочную, тогда не нужно биндить
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider(){
        if(this.options.infinity || this.options.position > 0){
            --this.options.position;
            if(this.options.position < 0){
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
        }
        
    }

    nextSlider(){
        if(this.options.infinity || this.options.position < this.options.maxPosition){
            ++this.options.position;

            if(this.options.position > this.options.maxPosition){
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
        }
        
    }

    addArrows(){
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.append(this.prev, this.next);


        this.controlSlider();
    }

    responsiveInit(){
        const slidesToShowDefault = this.slidesToShow;
        // получаю в массив все значения брейкпоинтов
        const allResponses = this.responsive.map( item => item.breakpoint );
        // получаем максимальное разрешение
        const maxResponsive = Math.max(...allResponses); 

        const checkResponse = () => {
            // получаем пользовательскую ширину экрана
            const widthWindow = document.documentElement.clientWidth;

            if (widthWindow < maxResponsive){

                for ( let i = 0; i < allResponses.length; i++ ){ 

                    if (widthWindow < allResponses[i]){
                        this.slidesToShow = this.responsive[i].slideToShow;
                        this.options.slideWidth = Math.floor(100 / this.slidesToShow);
                        this.addStyles();
                    } 
                }

            } else { 
                this.slidesToShow = slidesToShowDefault;
                this.options.slideWidth = Math.floor(100 / this.slidesToShow);
                this.addStyles();
            }
        };

        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}

export default SliderCarousel;