const calculatorDisplayText = document.querySelector("#calculator-display-text")
const numberButtons = document.querySelectorAll(".number-button")
const operatorButtons = document.querySelectorAll(".operator-button")
const clearButton = document.querySelector("#calculator-clear")
const equalButton = document.querySelector("#calculator-equal")
const pointButton = document.querySelector("#calculator-point")

let firstOperand = "";
let secondOperand = "";
let operator = "";

const add = (num1, num2) => Math.round((num1 + num2) * 100) / 100;
const subtract = (num1, num2) => Math.round((num1 - num2) * 100) / 100;
const multiply = (num1, num2) => Math.round((num1 * num2) * 100) / 100;
const divide = (num1, num2) => (num2 === 0 ? (updateDisplayText(true),null) : Math.round((num1 / num2) * 100) / 100);

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
        if (!operator) {
            firstOperand += button.textContent;
        } 
        else if (operator) {
            secondOperand += button.textContent;
        }
        updateDisplayText()
    })
})

//Sets operator with whatever button is clicked
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!operator) {
            operator = button.textContent;
            updateDisplayText()
        }
        else if (operator) {
            firstOperand = operate(firstOperand, operator, secondOperand)
            operator = button.textContent
            handleChainOperation(firstOperand, operator)
        }
    })
})

//Solves equation when = button is clicked
equalButton.addEventListener("click", () => {
    handleEqual()
})

//Clear current equation by removing display text and resetting the operands and operator
clearButton.addEventListener("click", () => {
    firstOperand = operator = secondOperand = "";
    updateDisplayText()
})

//Adds a decimal to a number
pointButton.addEventListener("click", () => {
    if (!firstOperand.includes(".") && !operator) {
        firstOperand += "."
    }
    else if(operator && !secondOperand.includes(".")) {
        secondOperand += "."
    }
    updateDisplayText()
})

//Allows operator chaining (ex: 4 + 4, then press * to make equation 8 * )
function handleChainOperation(operand=null, newOperator=null) {
    if (operand && newOperator) {
        calculatorDisplayText.textContent = `${operand} ${newOperator} `;
        secondOperand = ""
    }
}

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
    updateDisplayText()
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
}

function handleNumbers(num) {
    if (!operator) {
        firstOperand += num
    }
    else if (firstOperand && operator) {
        secondOperand += num
    }
}

function handleOperator(operatorKey) {
    if (!operator) {
        operator = operatorKey;
    }
    else {
        firstOperand = operate(firstOperand, operator, secondOperand)
        operator = operatorKey
        handleChainOperation(firstOperand, operator)
    }
}

function handleEqual() {
    if (secondOperand) {
        firstOperand = operate(firstOperand, operator, secondOperand);
        secondOperand = operator = ""
        updateDisplayText()
    }
}

//TODO
//Fix double operator input causing error


//Possible tasks
//keyboardd support
    //Equal
    //Clear
    //Decimal

//Display font

