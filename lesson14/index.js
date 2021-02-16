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
    periodAmount = document.querySelector('.period-amount'), // block for period amount
    resetBtn = document.getElementById('cancel'),
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
    placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]');

const AppData = function() {
    this.budget = 0;
    // доп. заработок
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    // расходы
    this.expenses = {};
    // возможные расходы
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.check = function () {  
    const _this = this;
    if (appData.isNumber(salaryAmount.value)) {
        calculateBtn.disabled = false;
        _this.start();
    } else {
        calculateBtn.disabled = true;
    }
};

AppData.prototype.start = function () {

    let dataInputs = document.querySelectorAll('.data input[type=text]'); // все текстовые инпуты с информацией

    dataInputs.forEach(item => {
        item.disabled = true;
    });

    // блокируются кнопки добавления полей
    addExpensesBtn.disabled = true;
    addIncomeBtn.disabled = true;

    resetBtn.style.display = 'block';
    calculateBtn.style.display = 'none';

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddIncome();
    this.getAddExpenses();
    this.getBudget();

    this.showResult();
};

AppData.prototype.reset = function () {
    let dataInputs = document.querySelectorAll('.data input[type=text]'), // все текстовые инпуты с информацией
        resultInputs = document.querySelectorAll('.result input[type=text]'); // все инпуты с результатом вычислений

        dataInputs.forEach(item => {
            item.value = ''; // значения сбрасываются на 0
            item.disabled = false;
            periodSelect.value = 0;
            periodAmount.textContent = periodSelect.value;

        });

        resultInputs.forEach(item => {
            item.value = ''; // значения сбрасываются на 0
        });

        // удаление добавленных полей доходов
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            addIncomeBtn.style.display = 'block';
            
        }

        // удаление добавленных полей расходов
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            addExpensesBtn.style.display = 'block';
        }

        // сброс всех значений appData
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

        resetBtn.style.display = 'none';
        calculateBtn.style.display = 'block';
        addExpensesBtn.disabled = false;
        addIncomeBtn.disabled = false;
};

AppData.prototype.getExpensesMonth = function () {
    for (let income in this.expenses){
        this.expensesMonth += +this.expenses[income];
    }
};

AppData.prototype.getBudget = function () {
    // бюджет на месяц
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    // бюджет на день
    this.budgetDay = this.budgetMonth / 30;

};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200){
    return "У вас высокий уровень дохода";
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600){
    return "У вас средний уровень дохода";
    } else if (this.budgetDay < 600 && this.budgetDay >= 0){
    return "К сожалению, у вас уровень дохода ниже среднего";
    } else {
    return "Что то пошло не так";
    }
};

AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);

    expensesItems = document.querySelectorAll('.expenses-items');

    // добавление пустых полей
    for (let i = 1; i < expensesItems.length; i++){

        let expensesTitle = expensesItems[i].querySelector('.expenses-title');
        let expensesAmount = expensesItems[i].querySelector('.expenses-amount');

        expensesTitle.value = '';
        this.formatChar(expensesTitle);
        expensesAmount.value = '';
        this.formatNum(expensesAmount);
    }

    if(expensesItems.length === 3){
        addExpensesBtn.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);

    incomeItems = document.querySelectorAll('.income-items');

    // добавление пустых полей
    for (let i = 1; i < incomeItems.length; i++){
        let incomeTitle = incomeItems[i].querySelector('.income-title');
        let incomeAmount = incomeItems[i].querySelector('.income-amount');

        incomeTitle.value = '';
        this.formatChar(incomeTitle);
        incomeAmount.value = '';
        this.formatNum(incomeAmount);
    }

    if(incomeItems.length === 3){
        addIncomeBtn.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function(item) { 
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function(item) { 
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in this.income){
        this.incomeMonth += +this.income[key];
    }
    
};

AppData.prototype.showResult = function () {
    budgetMonthResult.value = this.budgetMonth;
    budgetDayResult.value = Math.ceil(this.budgetDay);
    expensesMonthResult.value = this.expensesMonth;
    additionalExpensesResult.value = this.addExpenses.join(', ');
    additionalIncomeResult.value = this.addIncome.join(', ');
    targetMonthResult.value = Math.ceil(this.getTargetMonth());
    
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpenses.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeFields.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

AppData.prototype.formatChar = function (item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/[^а-яё\s\-]+/i, '');
        });
};

AppData.prototype.formatNum = function(item) {
    item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9\.]+/i, '');
    });
};

AppData.prototype.checkValues = function () {
    const _this = this;
    placeholderName.forEach(item => _this.formatChar(item));
    placeholderAmount.forEach(item => _this.formatNum(item));
};

AppData.prototype.eventListeners = function () {
    const _this = this;

    calculateBtn.addEventListener('click', function () {  
        _this.check();
    });

    resetBtn.addEventListener('click', function () {  
        _this.reset();
    });

    addExpensesBtn.addEventListener('click', function () {  
        _this.addExpensesBlock();
    });
    addIncomeBtn.addEventListener('click', function () {  
        _this.addIncomeBlock();
    });

    periodSelect.addEventListener('input', function () {
        periodAmount.textContent = periodSelect.value;
        incomePeriodResult.value = _this.calcSavedMoney();
    });
};

const appData = new AppData();

appData.checkValues();
appData.eventListeners.call(appData);

// AppData.prototype.getInfoDeposit = function () {
//     if (this.deposit) {
//         this.percentDeposit = prompt("Какой у вас годовой процент?");
//         while (!this.isNumber(this.percentDeposit)){
//             this.percentDeposit = prompt("Какой у вас годовой процент?");
//         }
//         this.moneyDeposit = prompt("Какая сумма заложена?");
//         while (!this.isNumber(this.moneyDeposit)){
//             this.moneyDeposit = prompt("Какая сумма заложена?");
//         }
//     }
// };