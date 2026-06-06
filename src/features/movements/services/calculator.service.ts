export type CalculatorOperator = "+" | "-" | "×" | "÷";

export type CalculatorState = {
  displayValue: string;
  storedValue: number | null;
  operator: CalculatorOperator | null;
  waitingForOperand: boolean;
};

export const initialCalculatorState: CalculatorState = {
  displayValue: "0",
  storedValue: null,
  operator: null,
  waitingForOperand: false,
};

function calculate(
  firstValue: number,
  secondValue: number,
  operator: CalculatorOperator,
) {
  if (operator === "+") {
    return firstValue + secondValue;
  }

  if (operator === "-") {
    return firstValue - secondValue;
  }

  if (operator === "×") {
    return firstValue * secondValue;
  }

  if (operator === "÷") {
    if (secondValue === 0) {
      return firstValue;
    }

    return firstValue / secondValue;
  }

  return secondValue;
}

function formatCalculatorValue(value: number) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const fixedValue = Number(value.toFixed(2));

  return String(fixedValue);
}

export function inputDigit(
  state: CalculatorState,
  digit: string,
): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      displayValue: digit,
      waitingForOperand: false,
    };
  }

  if (state.displayValue === "0") {
    return {
      ...state,
      displayValue: digit,
    };
  }

  return {
    ...state,
    displayValue: `${state.displayValue}${digit}`,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      displayValue: "0.",
      waitingForOperand: false,
    };
  }

  if (state.displayValue.includes(".")) {
    return state;
  }

  return {
    ...state,
    displayValue: `${state.displayValue}.`,
  };
}

export function inputOperator(
  state: CalculatorState,
  nextOperator: CalculatorOperator,
): CalculatorState {
  const inputValue = Number(state.displayValue);

  if (state.storedValue === null) {
    return {
      ...state,
      storedValue: inputValue,
      operator: nextOperator,
      waitingForOperand: true,
    };
  }

  if (state.operator) {
    const result = calculate(state.storedValue, inputValue, state.operator);

    return {
      displayValue: formatCalculatorValue(result),
      storedValue: result,
      operator: nextOperator,
      waitingForOperand: true,
    };
  }

  return {
    ...state,
    operator: nextOperator,
    waitingForOperand: true,
  };
}

export function inputEquals(state: CalculatorState): CalculatorState {
  if (state.operator === null || state.storedValue === null) {
    return state;
  }

  const inputValue = Number(state.displayValue);
  const result = calculate(state.storedValue, inputValue, state.operator);

  return {
    displayValue: formatCalculatorValue(result),
    storedValue: null,
    operator: null,
    waitingForOperand: true,
  };
}

export function inputPercentage(state: CalculatorState): CalculatorState {
  const currentValue = Number(state.displayValue);

  if (!Number.isFinite(currentValue)) {
    return {
      ...state,
      displayValue: "0",
    };
  }

  return {
    ...state,
    displayValue: formatCalculatorValue(currentValue / 100),
  };
}

export function inputBackspace(state: CalculatorState): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      displayValue: "0",
      waitingForOperand: false,
    };
  }

  if (state.displayValue.length <= 1) {
    return {
      ...state,
      displayValue: "0",
    };
  }

  return {
    ...state,
    displayValue: state.displayValue.slice(0, -1),
  };
}

export function clearCalculator(): CalculatorState {
  return initialCalculatorState;
}
