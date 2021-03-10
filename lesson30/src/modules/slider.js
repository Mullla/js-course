    // добавляет слайдеру точки переключения
    const addDots = (container, amount) => {

        let ul = document.createElement('ul');
        ul.classList.add('portfolio-dots')
        container.append(ul);

        for (let i = 0; i < amount; i++){
            let li = document.createElement('li');
            li.classList.add('dot');
            ul.append(li);
        }
    };

    //slider
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slides = slider.querySelectorAll('.portfolio-item');

            addDots(slider, slides.length);

            const dots = slider.querySelectorAll('.dot'); // получаю точки со страницы

            let currentSlide = 0, // текущий слайд
                interval; // для остановки и запуска слайдера

            // тк добавление и удаление класса часто происходит, они вынесены в отдельные функции
            // чтобы они работали не только для самих слайдов. но и для точек
            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };

            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

            // функция автоперелистывания
            const autoPlaySlide = () => {
                // у текущего слайда убираю активный класс
                prevSlide(slides, currentSlide, 'portfolio-item-active');
                prevSlide(dots, currentSlide, 'dot-active');

                // перехожу к следующему слайду
                currentSlide++; 

                // если это последний слайд, то возвращаюсь на первый
                if (currentSlide >= slides.length){
                    currentSlide = 0;
                }

                //добавляю следующему слайду активный класс
                nextSlide(slides, currentSlide, 'portfolio-item-active');
                nextSlide(dots, currentSlide, 'dot-active');
            };

            // запускает слайдер
            const startSlider = (time = 3000) => { // если параметры не переданы, то по умолчанию 3 секунды
                interval = setInterval(autoPlaySlide, time); 
            };

            //останавливает слайдер при наведении на стрелки и точки
            const stopSlider = () => {
                clearInterval(interval);
            };

            slider.addEventListener('click', (e) => {
                e.preventDefault();

                let target = e.target;

                if (!target.matches('.portfolio-btn, .dot')) { // если клик не по этим селекторам, событие не срабатывает
                    return;
                }
                // убираем активный класс у текущего слайда
                prevSlide(slides, currentSlide, 'portfolio-item-active');
                prevSlide(dots, currentSlide, 'dot-active');

                
                if (target.matches('#arrow-right')) { // если это стрелка вправо, то листает следующий слайд
                    currentSlide++;
                } else if (target.matches('#arrow-left')) { // если это стрелка влево, то листает предыдущий слайд
                    currentSlide--;
                } else if (target.matches('.dot')){
                    dots.forEach((elem, index) => {
                        if (elem === target){
                            currentSlide = index;
                        }
                    });
                }

                // если слайд был последний, то переходит к первому
                if (currentSlide >= slides.length){
                    currentSlide = 0;
                } 
                // если слайд был первый, то переходит к последнему
                if (currentSlide < 0) {
                    currentSlide = slides.length-1;
                }

                // добавляем активный класс слайду, у которого выполняется условие
                nextSlide(slides, currentSlide, 'portfolio-item-active');
                nextSlide(dots, currentSlide, 'dot-active');
            });

            slider.addEventListener('mouseover', (e) => {
                if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                    stopSlider();
                }
            });

            slider.addEventListener('mouseout', (e) => {
                // if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                //     startSlider(1500);
                // }
                if (e.target.matches('.portfolio-btn, .dot')){
                    startSlider(1500);
                }
            });

            startSlider(1500);

    };