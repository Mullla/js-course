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

                timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
                timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
                timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;

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
        const menuBtn = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = menu.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

            const handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };

            menuBtn.addEventListener('click', handlerMenu);

            closeBtn.addEventListener('click', handlerMenu);

            menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn'),
            popupCloseBtn = popup.querySelector('.popup-close');

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

            popupCloseBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });

            //popup animation
            const animation = () =>{
                let popupAnimation,
                progress = 0;

                let popupAnimate = function() {
                    progress++;
                    popupAnimation = requestAnimationFrame(popupAnimate);

                    if (progress < 30){
                        popup.style.opacity = progress / 30; 
                    } else {
                        cancelAnimationFrame(popupAnimate);
                    }
            };

            popupAnimate();
        }
    }

    togglePopup();

});

