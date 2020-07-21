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
  daybudgetBtn = document.getElementsByTagName('button')[2],
  optionalexpenses_item = document.querySelectorAll('.optionalexpenses-item'),
  extraIncome = document.querySelector('.choose-income'),
  checkSavings = document.querySelector('#savings'),
  savingsId = document.querySelector('.savings-box'),
  sumValue = document.querySelector('#sum'),
  percentValue = document.querySelector('#percent');

let money, time;

// Начало программы
startBtn.addEventListener('click', function () {
  time = prompt('Введите дату в формате YYYY-MM-DD');
  money = +prompt('Какой у Вас бюджет на месяц?');

  while (isNaN(money) || money == '' || money == null) {
    let error = 'Вы ничего не ввели. Попробуйте заного';
    alert(error);
    money = +prompt('Какой у Вас бюджет на месяц?');
  }

  appData.buget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  year.value = new Date(Date.parse(time)).getFullYear();
  month.value = new Date(Date.parse(time)).getMonth() + 1;
  day.value = new Date(Date.parse(time)).getDate();
});

expenses_itemBtn.addEventListener('click', function () {
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
    } else {
      alert((error = 'Вы ввели не верное значение. Попробуйте заного'));
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
});

optionalexpenses_itemBtn.addEventListener('click', function () {
  let optSum = 0;
  for (let z = 0; z < optionalexpenses_item.length; z++) {
    let article = optionalexpenses_item[z].value;
    optSum += +article;
    appData.optionalExpenses = optSum;
  }
  optionalexpensesValue.textContent = optSum;
});

daybudgetBtn.addEventListener('click', function () {
  if (appData.buget != undefined) {
    appData.moneyPerDay = (appData.buget / 30).toFixed();
    daybudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 2000) {
      levelValue.textContent = 'Все могло быть лучше';
    } else if (appData.moneyPerDay > 2000 && appData.moneyPerDay < 7000) {
      levelValue.textContent = 'Пока хватит';
    } else if (appData.moneyPerDay > 7000 && appData.moneyPerDay < 20000) {
      levelValue.textContent = 'Ну норм';
    } else {
      levelValue.textContent = 'Кайф';
    }
  } else {
    daybudgetValue.textContent = 'Я не знаю вашего дохода!';
  }
});

extraIncome.addEventListener('input', function () {
  let items = extraIncome.value;
  appData.income = items.split(', ');
  incomeValue.textContent = appData.income;
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

sumValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

percentValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

// function checksavings() {
//   if (checkSavings.checked) {
//     savingsId.classList.add('savings-box');
//   } else {
//     savingsId.classList.remove('savings-box_active');
//   }
// }
// checksavings();

let appData = {
  buget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};
