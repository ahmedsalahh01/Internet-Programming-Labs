// DOM: select nodes
const display = document.getElementById("display");
const expression = document.getElementById("expression");
const keys = document.querySelector(".keys");

// Logic: state
let currentInput = "0";
let firstOperand = null;
let operator = null;
let shouldResetInput = false;

function updateUI() {
  display.value = currentInput;
  if (firstOperand !== null && operator !== null) {
    expression.textContent = `${firstOperand} ${operator}`;
  } else {
    expression.textContent = "";
  }
}

function clearCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  shouldResetInput = false;
  updateUI();
}

function deleteLastDigit() {
  if (shouldResetInput) return;

  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  updateUI();
}

function inputDigit(digit) {
  if (shouldResetInput) {
    currentInput = digit;
    shouldResetInput = false;
  } else {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
  }
  updateUI();
}

function inputDecimal() {
  if (shouldResetInput) {
    currentInput = "0.";
    shouldResetInput = false;
    updateUI();
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateUI();
  }
}

function applyPercent() {
  const value = Number(currentInput) / 100;
  currentInput = Number.isFinite(value) ? String(Number(value.toFixed(10))) : "Error";
  updateUI();
}

function operate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? NaN : a / b;
  return b;
}

function chooseOperator(nextOperator) {
  const inputValue = Number(currentInput);
  if (Number.isNaN(inputValue)) return;

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (!shouldResetInput && operator) {
    const result = operate(firstOperand, inputValue, operator);
    currentInput = Number.isFinite(result) ? String(Number(result.toFixed(10))) : "Error";
    firstOperand = Number(currentInput);
  }

  operator = nextOperator;
  shouldResetInput = true;
  updateUI();
}

function calculateResult() {
  if (firstOperand === null || operator === null) return;

  const secondOperand = Number(currentInput);
  const result = operate(firstOperand, secondOperand, operator);
  currentInput = Number.isFinite(result) ? String(Number(result.toFixed(10))) : "Error";
  firstOperand = null;
  operator = null;
  shouldResetInput = true;
  updateUI();
}

// Event: click listeners
keys.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const action = target.dataset.action;
  const value = target.dataset.value;

  if (action === "digit" && value) {
    inputDigit(value);
    return;
  }

  if (action === "decimal") {
    inputDecimal();
    return;
  }

  if (action === "percent") {
    applyPercent();
    return;
  }

  if (action === "operator" && value) {
    chooseOperator(value);
    return;
  }

  if (action === "equals") {
    calculateResult();
    return;
  }

  if (action === "delete") {
    deleteLastDigit();
    return;
  }

  if (action === "clear") {
    clearCalculator();
  }
});

// Optional keyboard support for quick testing.
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    inputDigit(key);
    return;
  }

  if (key === ".") {
    inputDecimal();
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperator(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
    return;
  }

  if (key === "Backspace") {
    deleteLastDigit();
    return;
  }

  if (key === "Escape") {
    clearCalculator();
  }
});

updateUI();
