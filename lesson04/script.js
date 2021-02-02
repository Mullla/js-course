'use strict';

let money = +prompt("Ваш месячный доход?"),
    income = 'фриланс',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    period = 5,
    mission = 5000,
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = +prompt("Во сколько это обойдется?"),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = +prompt("Во сколько это обойдется?");

let showTypeOf = function(data){
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


// вывод возможных расходов в виде массива
console.log(addExpenses);

// принимает расходы за месяц, возвращает их сумму
function getExpensesMonth(amount1, amount2){
  return amount1 + amount2;
}

// принимает месячный доход и функцию суммы расходов за месяц, возвращает остаток на месяц
function getAccumulatedMonth(money, callback){
  let expenses = callback(amount1, amount2);
  return money - expenses;
}

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth);

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
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));

console.log(`Цель будет достигнута за ${Math.ceil(getTargetMonth(money, accumulatedMonth))} месяцев(-а)`);