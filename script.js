const calculatorDisplayText = document.querySelector("#calculator-display-text")
const numberButtons = document.querySelectorAll(".number-button")
const operatorButtons = document.querySelectorAll(".operator-button")
const clearButton = document.querySelector("#calculator-clear")
const equalButton = document.querySelector("#calculator-equal")

let firstOperand = "";
let secondOperand = "";
let operator = "";

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function operate(num1, operator, num2) {
    num1 = parseInt(num1)
    num2 = parseInt(num2)

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
            updateDisplayText();
        } 
        else if (firstOperand && operator) {
            secondOperand += button.textContent;
            updateDisplayText();
        }
    })
})

//Sets operator with whatever button is clicked
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstOperand !== "" && operator === "") {
            operator = button.textContent;
            updateDisplayText()
        }
        else if (firstOperand && operator && secondOperand) {
            firstOperand = operate(firstOperand, operator, secondOperand)
            operator = button.textContent
            resetCurrentEquation(firstOperand, operator)
        }
    })
})

//Solves equation when = button is clicked
equalButton.addEventListener("click", () => {
    if (firstOperand && operator && secondOperand) {
        result = operate(firstOperand, operator, secondOperand);
        calculatorDisplayText.textContent = result;
    }
})

//Clear current equation by removing display text and resetting the operands and operator
clearButton.addEventListener("click", () => {
    calculatorDisplayText.textContent = "";
    firstOperand = operator = secondOperand = "";
})

//Allows operator chaining (ex: 4 + 4, then press * to make equation 8 * )
function resetCurrentEquation(operand=null, newOperator=null) {
    if (operand && newOperator) {
        calculatorDisplayText.textContent = `${operand} ${newOperator} `;
        secondOperand = ""
    }
}

function updateDisplayText() {
    calculatorDisplayText.textContent = `${firstOperand} ${operator} ${secondOperand}`;
}


//TODO
//Make divide function not be disible by 0
//Round total to 2 decimal places

//Possible taska
//keyboardd support
//backspace 
