const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = calcBlock.querySelector('.calc-type'), // тип помещения 
        calcSquare = calcBlock.querySelector('.calc-square'), // площадь помещения
        calcDay = calcBlock.querySelector('.calc-day'), // срок исполнения
        calcCount = calcBlock.querySelector('.calc-count'), // количество помещений
        totalValue = document.getElementById('total'); // итоговая сумма

        // animation pattern
    const animate = ({timing, draw, duration}) => {
        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if(timeFraction < 1){
                requestAnimationFrame(animate);
            }
        });

    };

    // считает итоговую цену
    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

            // количество помещений, по умолчанию 1
            if(calcCount.value > 1){
                countValue += (calcCount.value - 1)/10;
            }

            // расчет за срочность, если срок меньше 5 дней, то в 2 раза дороже, если меньше 10 - в 1.5
            // при вводе calcDay.value сразу не считывается, поэтому всегда будет заходить в первое условие, поэтому здесь проверка на существование
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5
            }

            // если обе переменные сузествуют, то есть === true
            if (typeValue && squareValue) {
                total = price * squareValue * typeValue * countValue * dayValue;
            } 

            // launch animation
            animate({
                duration: 1000,
                timing(timeFraction){
                    return timeFraction;
                },
                draw(progress){
                    totalValue.textContent = Math.ceil(total * progress);
                }
            });
    };


    calcBlock.addEventListener('change', (e) => {
        const target = e.target;

        if (target.matches('.calc-type, .calc-square, .calc-day, .calc-count')) {
            countSum();
        }
    });

};

export default calc;