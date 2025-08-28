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
        if (firstOperand === "") {
            firstOperand = button.textContent;
            calculatorDisplayText.textContent += firstOperand;
            console.log(`First operand is ${firstOperand}`)
        } 
        else if (secondOperand === "" && operator !== "") {
            secondOperand = button.textContent;
            calculatorDisplayText.textContent += secondOperand;
            console.log(`Second operand is ${secondOperand}`)
        }
    })
})

//Sets operator with whatever button is clicked
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstOperand !== "" && operator === "") {
            operator = button.textContent;
            calculatorDisplayText.textContent += " " + operator + " "
            console.log(`Operator is ${operator}`);
        }
    })
})
