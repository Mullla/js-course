'use strict';
let calculateBtn = document.getElementById('start'), // calculate button
    addIncomeBtn = document.getElementsByTagName('button')[0], // add income button '+'
    addExpensesBtn = document.getElementsByTagName('button')[1], // add expenses button '+'
    depositCheckbox = document.querySelector('#deposit-check'), // deposit checkbox
    additionalIncomeFields = document.querySelectorAll('.additional_income-item'), // fields for additional incomes
    budgetDayResult = document.querySelectorAll('.result-total')[1], // input for total result of budget day
    expensesMonthResult = document.querySelectorAll('.result-total')[2], // input for total result of expenses for month
    additionalIncomeResult = document.querySelectorAll('.result-total')[3], // input for total result of additional income
    additionalExpensesResult = document.querySelectorAll('.result-total')[4], // input for total result of additional expenses
    incomePeriodResult = document.querySelectorAll('.result-total')[5], // input for total result of income period
    targetMonthResult = document.querySelectorAll('.result-total')[6], // input for total result of target for month
    budgetMonthResult = document.querySelector('.budget_month-value'), // input for total result of budget month
    salaryAmount = document.querySelector('.salary-amount'), // input for salary amount
    incomeItems = document.querySelectorAll('.income-items'), // block with 2 inputs (title and amount) for income
    expensesItems = document.querySelectorAll('.expenses-items'), // block with 2 inputs (title and amount) for expenses
    targetAmount = document.querySelector('.target-amount'), // input for target amount
    additionalExpenses = document.querySelector('.additional_expenses-item'), // input for additional expenses
    periodSelect = document.querySelector('.period-select'), // select for period
    periodAmount = document.querySelector('.period-amount'); // block for period amount


// проверка является ли значение числом
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// сделать первую букву строки заглавной
function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


let appData = {
    budget: 0,
    // доп. заработок
    income: {},
    incomeMonth: 0,
    addIncome: [],
    // расходы
    expenses: {},
    // возможные расходы
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    
    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    getExpensesMonth: function () {
        for (let income in appData.expenses){
            appData.expensesMonth += +appData.expenses[income];
        }
    },
    getBudget: function () {
        // бюджет на месяц
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        // бюджет на день
        appData.budgetDay = appData.budgetMonth / 30;

    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function () {
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
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt("Какой у вас годовой процент?");
            while (!isNumber(appData.percentDeposit)){
                appData.percentDeposit = prompt("Какой у вас годовой процент?");
            }
            appData.moneyDeposit = prompt("Какая сумма заложена?");
            while (!isNumber(appData.moneyDeposit)){
                appData.moneyDeposit = prompt("Какая сумма заложена?");
            }
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            addExpensesBtn.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);

        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            addIncomeBtn.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function(item) { 
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function(item) { 
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }

            for (let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        });
    },
    showResult: function () {
        budgetMonthResult.value = appData.budgetMonth;
        budgetDayResult.value = Math.ceil(appData.budgetDay);
        expensesMonthResult.value = appData.expensesMonth;
        additionalExpensesResult.value = appData.addExpenses.join(', ');
        additionalIncomeResult.value = appData.addIncome.join(', ');
        targetMonthResult.value = Math.ceil(appData.getTargetMonth());
        periodSelect.addEventListener('input', function () {
            incomePeriodResult.value = appData.calcSavedMoney();
        });

    },
    getAddExpenses: function () {
        let addExpenses = additionalExpenses.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeFields.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
};

// calculateBtn.disabled = true;

// salaryAmount.addEventListener('input', function () {
//     if (isNumber(salaryAmount.value)) {
//         calculateBtn.disabled = false;
//         calculateBtn.addEventListener('click', appData.start);
//     }
// })

calculateBtn.addEventListener('click', function () {  
    if (isNumber(salaryAmount.value)) {
        calculateBtn.disabled = false;
        appData.start();
    } else {
        calculateBtn.disabled = true;
    }
});


addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addIncomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});




// за какое время цель будет достигнута
// if (appData.getTargetMonth() > 0){
//     console.log(`Цель будет достигнута за ${Math.ceil(appData.getTargetMonth())} месяцев(-а)`);
// } else {
//     console.log('Цель не будет достигнута');
// }


// for (let prop in appData){
//     console.log(`Наша программа включает в себя данные: ${prop} - ${appData[prop]}`);
// }

// возможные расходы
// console.log(appData.addExpenses.map(item => capitalizeFirstLetter(item)).join(', '));


// console.log(period);
