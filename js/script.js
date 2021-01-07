var calculator = {
    displayValue: '0',
    firstValue: null,
    secondVaule: false,
    operator: null,
  };
  
  function inputDigit(num) {
    var { displayValue, secondVaule } = calculator;
  
    if (secondVaule === true) {
      calculator.displayValue = num;
      calculator.secondVaule = false;
    } else {
      calculator.displayValue =
        displayValue === '0' ? num : displayValue + num;
    }
  }
  
  function inputDecimal(dot) {
    if (calculator.secondVaule === true) {
      calculator.displayValue = '0.';
      calculator.secondVaule = false;
      return;
    }
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    var { firstValue, displayValue, operator } = calculator;
    var inputValue = parseFloat(displayValue);
  
    if (operator && calculator.secondVaule) {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstValue == null && !isNaN(inputValue)) {
      calculator.firstValue = inputValue;
    } else if (operator) {
      var currentValue = firstValue || 0;
      var result = calculate(currentValue, inputValue, operator);
  
      calculator.displayValue = String(result);
      calculator.firstValue = result;
    }
  
    calculator.secondVaule = true;
    calculator.operator = nextOperator;
  }
  
  function calculate(firstValue, secondOperand, operator) {
    if (operator === '+') {
      return firstValue + secondOperand;
    } else if (operator === '-') {
      return firstValue - secondOperand;
    } else if (operator === '*') {
      return firstValue * secondOperand;
    } else if (operator === '/') {
      return firstValue / secondOperand;
    }
  
    return secondOperand;
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstValue = null;
    calculator.secondVaule = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    var display = document.querySelector('.calculatorScreen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  var keys = document.querySelector('.keys');
  keys.addEventListener('click', event => {
    var { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });
  