let money = 3000,
    income = 'фриланс',
    addExpenses = 'Интернет, телефон, продукты',
    deposit = false,
    period = 5;

const mission = 5000;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев. Цель заработать ${mission} долларов`);

let expensesArray = addExpenses.toLowerCase().split(',');
console.log(expensesArray);

let budgetDay = money/30;
console.log(budgetDay);
