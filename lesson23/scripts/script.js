window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // timer, deadline - время до которого идет отсчет
    function countTimer(deadline) {
        const timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');


            function getTimeRemaining() {
                let dateStop = new Date(deadline).getTime(), // в миллисекундах, чтобы была корректная разница
                dateNow = new Date().getTime(), // в миллисекундах, чтобы была корректная разница
                timeRemaining = (dateStop - dateNow) / 1000, //всего осталось времени в секундах
                seconds = Math.floor(timeRemaining % 60), // вычленяем секунды из общего времени, все остальное пойжет на минуты и часы
                minutes = Math.floor((timeRemaining / 60) % 60), // вычленяем минуты
                hours = Math.floor(timeRemaining / 60 / 60 % 24); //получаем часы

                return {timeRemaining, hours, minutes, seconds};
            }   

            function updateTimer() {  
                let timer = getTimeRemaining();

                const formatTime = (data) => {
                    return (data < 10) ? '0' + data : data;
                };

                timerHours.textContent = formatTime(timer.hours);
                timerMinutes.textContent = formatTime(timer.minutes);
                timerSeconds.textContent = formatTime(timer.seconds);

                if (timer.timeRemaining > 0) {
                    setInterval(updateTimer, 1000);
                } else {
                    timerHours.textContent = '00';
                    timerHours.style.color = 'crimson';
                    timerMinutes.textContent = '00';
                    timerMinutes.style.color = 'crimson';
                    timerSeconds.textContent = '00';
                    timerSeconds.style.color = 'crimson';
                }
            }
        
            updateTimer();
    }

    countTimer('22 march 2021');

    // menu
    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu'), // кнопка меню
            menu = document.querySelector('menu'), // тег с блоком меню
            firstSectionLink = document.querySelector('a>img'); // ссылка перехода к первому слайду

            // переключает активный класс у меню
            const handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

            // smooth scroll
            const smoothScroll = (target) => {
                if (target.closest('li>a') || target.closest('a>img')) {
                    event.preventDefault(); // отменяю обычный переход по ссылке, чтобы добавить плавный

                    target = target.closest('a'); 

                    let id = target.getAttribute('href').substr(1); //выделяю часть ссылки href = #<...>, чтобы подставить значение <...> и найти элемент по id

                    document.getElementById(id).scrollIntoView({ //скроллю к элементу с заданным id
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            menuBtn.addEventListener('click', handlerMenu);

            menu.addEventListener('click',(event) => {
                let target = event.target;

                if (target.classList.contains('close-btn') || target.closest('a')){
                    handlerMenu();
                }

                smoothScroll(target);
            });

            firstSectionLink.addEventListener('click', (event) => {
                let target = event.target;

                smoothScroll(target);
            });

    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn');

            popupBtns.forEach((elem) => {
                elem.addEventListener('click', () => {
                    // если размер экрана пользователя < 768px, анимация отключается
                    if (document.documentElement.clientWidth  > 768){
                        popup.style.display = 'block';
                        animation();
                    } else {
                        popup.style.display = 'block';
                    }
                });
            });

            popup.addEventListener('click', (event) => {
                let target = event.target;

                    if (target.classList.contains('popup-close')){
                        popup.style.display = 'none';
                    } else {
                        target = target.closest('.popup-content');

                        if (!target) {
                            popup.style.display = 'none';
                        }
                    }

            });

            //popup animation
            const animation = () => {
                let popupAnimation,
                progress = 0;

                const popupAnimate = function() {
                    progress++;
                    popupAnimation = requestAnimationFrame(popupAnimate);

                    if (progress < 30){
                        popup.style.opacity = progress / 30; 
                    } else {
                        cancelAnimationFrame(popupAnimation);
                    }
            };

            popupAnimate();
        }
    }

    togglePopup();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = tabHeader.querySelectorAll('.service-header-tab'),
            tabsContent = document.querySelectorAll('.service-tab');

            const toggleTabsContent = (index) => {
                for (let i = 0; i < tabsContent.length; i++) {
                    if (index === i){
                        tabsContent[i].classList.remove('d-none');
                        tabs[i].classList.add('active');
                    } else {
                        tabsContent[i].classList.add('d-none');
                        tabs[i].classList.remove('active');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab'); // проверяет селектор, если есть - возвращает этот элемент, если нет, то проверяет родителя и тд

                    if (target){
                        tabs.forEach((item, i) => {
                            if (item === target) {
                                toggleTabsContent(i);
                            }
                        });
                    }


            });
    };

    tabs();

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

    slider();

    // изменение фото при наведении мышки
    const changeImgs = () => {
        const commandSection = document.getElementById('command');

        let temp;
        commandSection.addEventListener('mouseover', (e) => {
            let target = e.target;

            if(target.classList.contains('command__photo')){
                temp = target.src;
                target.src = target.dataset.img;
            }
            
        });

        commandSection.addEventListener('mouseout', (e) => {
            let target = e.target;

            if(target.classList.contains('command__photo')){
                target.src = temp;
            }
            
        });
        
    }

    changeImgs();

    const checkText = () => {
        const textInputs = document.querySelectorAll('input[name="user_name"]'),
            messageInput = document.querySelector('input[name="user_name"]');

        textInputs.forEach( input => input.addEventListener('input', (e) => {
            let target = e.target;

            target.value = target.value.replace(/[^а-яё\s\-]/ig, '')
        }));

        messageInput.addEventListener('input', (e) => {
            let target = e.target;

            target.value = target.value.replace(/[^а-яё\s\-]/ig, '')
        });
    }
    checkText();

    // проверка на корректность введенных значений при blur
    const checkOnBlur = () => {
        const inputs = document.querySelectorAll('input');

        // регулярки для каждого типа данных
        const regCalc = /[^\d]+/g,
            regText = /([^а-яё\s\-]+|^\-*|\-*$)/ig,
            regEmail = /([^a-z\-\_\.\!\~\*\'@]+|^\-*|\-*$)/ig,
            regPhone = /([^\d\)\(\-]+|^\-*|\-*$)/g;

        const capitalizeFirstLetter = (string) => {
            return string.split(/\s+/).map(word => word.replace(/(^\-|\-$)/g,'')[0].toUpperCase() + word.substring(1)).join(' ');
        };

        inputs.forEach(item => item.addEventListener('blur', (e) => {
            let target = e.target;

            // калькулятор
            if(target.matches('input[type="text"].calc-item')){
                target.value = target.value.replace(regCalc, '');
            
            // имя
            } else if (target.matches('input[name="user_name"]')){
                let str = target.value.replace(regText, '');
                str = str.trim().toLowerCase();
                str = str.replace(/\-+/g, '-');
                str = str.replace(/\s+/g, ' ');

                target.value = str ? capitalizeFirstLetter(str) : str;

            // сообщение
            } else if (target.matches('input[name="user_message"]')){
                target.value = target.value.replace(regText, '').trim();

            // email
            } else if (target.matches('input[type="email"]')){
                target.value = target.value.replace(regEmail, '').replace(/\-{2,}/g, '-');

            // телефон
            } else if (target.matches('input[type="tel"]')){
                target.value = target.value.replace(regPhone, '').replace(/\-{2,}/g, '-');
            }
            
        }));
        

    };
    checkOnBlur();

});

