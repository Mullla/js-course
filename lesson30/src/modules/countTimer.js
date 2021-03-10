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