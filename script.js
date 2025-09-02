const calculatorDisplayText = document.querySelector("#calculator-display-text")
const numberButtons = document.querySelectorAll(".number-button")
const operatorButtons = document.querySelectorAll(".operator-button")
const clearButton = document.querySelector("#calculator-clear")
const equalButton = document.querySelector("#calculator-equal")
const decimalButton = document.querySelector("#calculator-point")

let firstOperand = "";
let secondOperand = "";
let operator = "";

const add = (num1, num2) => Math.round((num1 + num2) * 100) / 100;
const subtract = (num1, num2) => Math.round((num1 - num2) * 100) / 100;
const multiply = (num1, num2) => Math.round((num1 * num2) * 100) / 100;
const divide = (num1, num2) => (num2 === 0 ? null: Math.round((num1 / num2) * 100) / 100);

function operate(num1, operator, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)

    switch(operator) {
        case "+" :
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default :
            return "Invalid Operator"
    }
}

//Sets first or second operator based on number button clicked
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleNumbers(button.textContent)
    })
})

//Sets operator with whatever button is clicked
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleOperator(button.textContent)
    })
})

//Solves equation when = button is clicked
equalButton.addEventListener("click", () => {
    handleEqual()
})

//Clear current equation by removing display text and resetting the operands and operator
clearButton.addEventListener("click", () => {
    handleClear()
})

//Adds a decimal to a number
decimalButton.addEventListener("click", () => {
    handleDecimal()
})

function updateDisplayText(isError=false) {
    if (isError) {
        calculatorDisplayText.textContent = "8008135";
    } else {
        calculatorDisplayText.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    }
}

//Allow keyboard input for backspace to remove last input and numbers and operators for same as click functions
document.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        handleBackSpace()
    }
    else if (!isNaN(event.key)) {
        handleNumbers(event.key)
    }
    else if (["+", "-", "*", "/"].includes(event.key)) {
        handleOperator(event.key)
    }
    else if(["=", "Enter"].includes(event.key)) {
        handleEqual()
    }
    else if(["c", "C"].includes(event.key)) {
        handleClear()
    }
    else if(event.key === ".") {
        handleDecimal()
    }
})

function handleBackSpace() {
    if (firstOperand && operator && secondOperand) {
        secondOperand = secondOperand.slice(0, -1)
    }
    else if (firstOperand && operator) {
        operator = ""
    }
    else if (firstOperand) {
        firstOperand = firstOperand.slice(0, -1)
    }
    updateDisplayText()
}

function handleNumbers(num) {
    if (!operator) {
        firstOperand += num
    }
    else if (firstOperand && operator) {
        secondOperand += num
    }
    updateDisplayText()
}

function handleOperator(operatorKey) {
    if (!operator) {
        operator = operatorKey;
    }
    else if (operator && secondOperand) {
        firstOperand = operate(firstOperand, operator, secondOperand)
        operator = operatorKey
        handleChainOperation(firstOperand, operator)
    }
    updateDisplayText()
}

function handleEqual() {
    if (secondOperand) {
        let result = operate(firstOperand, operator, secondOperand);
        if (result === null) {
            updateDisplayText(true)
            firstOperand = operator = secondOperand = ""
        }
        else {
            firstOperand = result
            calculatorDisplayText.textContent = firstOperand
            operator = secondOperand = ""
        }
    }
}

function handleClear() {
    firstOperand = operator = secondOperand = "";
    updateDisplayText()
}

function handleDecimal() {
    if (typeof(firstOperand) !== "string") {
        firstOperand = firstOperand.toString()
        console.log(typeof(firstOperand))
    }

    if (!firstOperand.includes(".") && !operator) {
        firstOperand += "."
    }
    else if(operator && !secondOperand.includes(".")) {
        secondOperand += "."
    }
    updateDisplayText()
}

//Allows operator chaining (ex: 4 + 4, then press * to make equation 8 * )
function handleChainOperation(operand=null, newOperator=null) {
    if (operand && newOperator) {
        calculatorDisplayText.textContent = `${operand} ${newOperator} `;
        secondOperand = ""
    }
    updateDisplayText()
}

