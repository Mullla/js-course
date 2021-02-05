'use strict';
// проверка является ли значение числом
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    start = function(){
        money = prompt("Ваш месячный доход?");

        // заходим в цикл только если введенные данные не являются числом, чтобы не было "лишнего" запуска
        if (!isNumber(money)){
            do {
                money = prompt("Ваш месячный доход?");
            } while (!isNumber(money));
        };
    }

start();

let appData = {
    budget: money,
    // доп. заработок
    income: {},
    addIncome: [],
    // расходы
    expenses: {},
    // возможные расходы
    addExpenses: [],
    deposit: false,
    mission: 5000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm("Есть ли у вас депозит в банке?");

            for (let i = 0; i < 2; i++){
                let key = prompt("Введите обязательную статью расходов?");
                let incomeAmount = prompt("Во сколько это обойдется?");

                while (!isNumber(incomeAmount)){
                    incomeAmount = prompt("Во сколько это обойдется?");
                }
                appData.expenses[key] = +incomeAmount;
            }
    },
    getExpensesMonth: function(){
        for (let income in appData.expenses){
            appData.expensesMonth += +appData.expenses[income];
        }
        // console.log('Статьи расходов: ', appData.expenses);
    },
    getBudget: function(){
        // бюджет на месяц
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        // бюджет на день
        appData.budgetDay = appData.budgetMonth / 30;

    },
    getTargetMonth: function(){
        return appData.budget / appData.budgetMonth;
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200){
        return "У вас высокий уровень дохода";
        } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600){
        return "У вас средний уровень дохода";
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0){
        return "К сожалению, у вас уровень дохода ниже среднего";
        } else {
        return "Что то пошло не так";
        }
    },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// вычисляем расходы на месяц
console.log('Расходы за месяц: ', appData.expensesMonth);

// за какое время цель будет достигнута
if (appData.getTargetMonth() > 0){
    console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев(-а)`);
} else {
    console.log('Цель не будет достигнута');
}

// узнаем уровень доходов
console.log('Уровень доходов: ', appData.getStatusIncome());

for (let prop in appData){
    console.log(`Наша программа включает в себя данные: ${prop} - ${appData[prop]}`);
}
