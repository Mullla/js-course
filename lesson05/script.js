'use strict';
// проверка является ли значение числом
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'фриланс',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    period = 5,
    mission = 5000,
    expenses = [];

let start = function(){
    money = prompt("Ваш месячный доход?");

    // заходим в цикл только если введенные данные не являются числом, чтобы не было "лишнего" запуска
    if (!isNumber(money)){
        do {
            money = prompt("Ваш месячный доход?");
        } while (!isNumber(money));
    };

}

start();

let showTypeOf = function(data){
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


// вывод возможных расходов
console.log(addExpenses.toLowerCase().split(','));

// принимает расходы за месяц, возвращает их сумму
function getExpensesMonth(){
    // сумма трат
    let sum = 0;

    // заполняем массив со статьями расходов
    for (let i = 0; i < 2; i++){
        expenses[i] = prompt("Введите обязательную статью расходов?");

        let incomeAmount = prompt("Во сколько это обойдется?");

        while (!isNumber(incomeAmount)){
            incomeAmount = prompt("Во сколько это обойдется?");
        }
        sum += +incomeAmount;
    }

    console.log('Статьи расходов: ', expenses);
    return sum;
}

// вычисляем расходы на месяц
let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmount);

// принимает месячный доход и функцию суммы расходов за месяц, возвращает остаток на месяц
function getAccumulatedMonth(){
    return money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();

// срок достижения цели
function getTargetMonth(money, accumulatedMonth){
    return money / accumulatedMonth;
}

// считаем бюджет на день
let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

// узнаем уровень доходов
let getStatusIncome= function(){
    if (budgetDay >= 1200){
    return "У вас высокий уровень дохода";
    } else if (budgetDay < 1200 && budgetDay >= 600){
    return "У вас средний уровень дохода";
    } else if (budgetDay < 600 && budgetDay >= 0){
    return "К сожалению, у вас уровень дохода ниже среднего";
    } else {
    return "Что то пошло не так";
    }
}
console.log('Уровень доходов: ', getStatusIncome());

if (getTargetMonth(money, accumulatedMonth) > 0){
    console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth(money, accumulatedMonth))} месяцев(-а)`);
} else {
    console.log('Цель не будет достигнута');
}
