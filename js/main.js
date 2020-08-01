'use strict';

let startBtn = document.getElementById('start'),
  budgetValue = document.querySelector('.budget-value'),
  daybudgetValue = document.querySelector('.daybudget-value'),
  levelValue = document.querySelector('.level-value'),
  expensesValue = document.querySelector('.expenses-value'),
  optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
  incomeValue = document.querySelector('.income-value'),
  monthsavingsValue = document.querySelector('.monthsavings-value'),
  yearsavingsValue = document.querySelector('.yearsavings-value'),
  year = document.querySelector('.year-value'),
  month = document.querySelector('.month-value'),
  day = document.querySelector('.day-value'),
  expenses_item = document.querySelectorAll('.expenses-item'),
  expenses_itemBtn = document.getElementsByTagName('button')[0],
  optionalexpenses_itemBtn = document.getElementsByTagName('button')[1],
  extraIncomeBtn = document.getElementsByTagName('button')[2],
  optionalexpenses_item = document.querySelectorAll('.optionalexpenses-item'),
  extraIncome = document.querySelectorAll('.extra-income-item'),
  checkSavings = document.querySelector('#savings'),
  savingsId = document.querySelector('.savings-box'),
  sumValue = document.querySelector('#sum'),
  percentValue = document.querySelector('#percent');

let time;
let appData = {
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};

// Начало программы
startBtn.addEventListener('click', function () {
  // Обязательные расходы
  let sum = 0;

  for (let i = 0; i < expenses_item.length; i++) {
    let question1 = expenses_item[i].value,
      question2 = expenses_item[++i].value;

    if (
      typeof question1 === 'string' &&
      question1 != '' &&
      typeof question1 != null &&
      typeof question2 != null &&
      question2 != '' &&
      question1.length < 50
    ) {
      appData.expenses[question1] = question2;
      sum += +question2;
    }
  }
  expensesValue.textContent = sum;

  // Не обязательные расходы

  let optSum = 0;
  for (let z = 0; z < optionalexpenses_item.length; z++) {
    let price = optionalexpenses_item[z].value;
    optSum += +price;
    appData.optionalExpenses = optSum;
  }
  optionalexpensesValue.textContent = optSum;

  // Бюджет в день
  let money = budgetValue.value;

  let moneyPerDay = (money / 30).toFixed();
  daybudgetValue.textContent = moneyPerDay;

  if (moneyPerDay < 2000) {
    levelValue.textContent = 'Низкий уровень дохода';
  } else if (moneyPerDay > 2000 && moneyPerDay < 7000) {
    levelValue.textContent = 'Средний уровень дохода';
  } else if (moneyPerDay > 7000 && moneyPerDay < 20000) {
    levelValue.textContent = 'Высокий уровень дохода';
  } else {
    levelValue.textContent = 'Я не знаю вашего дохода!';
  }

  // Доп доход

  let extraSum = 0;
  for (let z = 0; z < extraIncome.length; z++) {
    let extrInc = extraIncome[z].value;
    extraSum += +extrInc;
    appData.income = extraSum;
  }

  incomeValue.textContent = extraSum;

  // Накопления

  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

// Доп поля для ввода расходов

expenses_itemBtn.addEventListener('click', function () {
  expenses_itemBtn.insertAdjacentHTML(
    'beforebegin',
    '<input class="expenses-item input" type="text" placeholder="Наименование"> <input class="expenses-item input" type="text" placeholder="Цена" />'
  );
});

optionalexpenses_itemBtn.addEventListener('click', function () {
  optionalexpenses_itemBtn.insertAdjacentHTML(
    'beforebegin',
    '<input class="optionalexpenses-item input" type="text" placeholder="Цена" /> <input class="optionalexpenses-item input" type="text" placeholder="Цена" />'
  );
});

extraIncomeBtn.addEventListener('click', function () {
  extraIncomeBtn.insertAdjacentHTML(
    'beforebegin',
    '<input class="extra-income-item input" type="text" placeholder="Цена" /> <input class="extra-income-item input" type="text" placeholder="Цена" />'
  );
});

checkSavings.addEventListener('click', function () {
  savingsId.classList.toggle('savings-box_active');

  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }

  if (appData.savings == false) {
    monthsavingsValue.textContent = 'Пока у Вас нет накоплений((';
    yearsavingsValue.textContent = 'И процентов тоже нет';
  }
});
