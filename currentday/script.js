'use strict';

const dayPart = document.querySelector('.greet'), // приветствие зависит от времени суток
    dayOfWeek = document.querySelector('.today'), // день недели
    currentTime = document.querySelector('.current-time'), // текущее время
    daysTillNewYear = document.querySelector('.till-new-year'); //дней до нового года

    let dateNow = new Date();

    // принимает время в часах, возвращает приветствие в зависимости от времени суток
    function getDayPart(time){
        if (time >= 4 && time < 12) {
            return "Доброе утро"; 
        } else if (time >= 12 && time < 17) {
            return "Добрый день"; 
        } else if (time >= 17 && time <= 22){
            return "Добрый вечер"; 
        } else {
            return "Доброй ночи"; 
        }
    }
    // принимает время, возвращает день недели
    function getDayOfWeek(time){
        //переводит в строковый формат с русской локализацией, разбиваю по пробелу день недели и время, оставляю только день недели
        return time.toLocaleTimeString('ru', {weekday: 'long'}).split(' ')[0]; 
    }
    // принимает текущее время, возвращает в 12-часовом формате
    function getCurrentTime(time) {
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
    }

    function getNewYear(bigDay, dayNow) {
        let daysRemaining = new Date(bigDay).getTime() - dayNow.getTime();
        const msToDays = 1000 * 60 * 60 * 24; // перевод миллисекунд в количество дней
        return Math.floor(daysRemaining / msToDays);
    }

    function renderTime(){
        dayPart.textContent = getDayPart(dateNow.getHours());
        dayOfWeek.textContent = `Сегодня: ${getDayOfWeek(dateNow)}`;
        currentTime.textContent = `Текущее время: ${getCurrentTime(new Date())}`;
        daysTillNewYear.textContent = `До нового года осталось ${getNewYear('31 december 2021', dateNow)} дней`;
    }

setInterval(renderTime, 1000);
