let money = +prompt("Ваш месячный доход?"),
    income = 'фриланс',
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    period = 5,
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = +prompt("Во сколько это обойдется?"),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = +prompt("Во сколько это обойдется?");

const mission = 5000;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев. Цель заработать ${mission} долларов`);

let expensesArray = addExpenses.toLowerCase().split(',');
console.log(expensesArray);

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth);

console.log(`Цель будет достигнута за ${Math.ceil(money / budgetMonth)} месяцев(-а)`);

let budgetDay = budgetMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

if (budgetDay >= 1200){
  console.log("У вас высокий уровень дохода");
} else if (budgetDay < 1200 && budgetDay >= 600){
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay >= 0){
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
  console.log("Что то пошло не так");
}