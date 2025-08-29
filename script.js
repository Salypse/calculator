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
const divide = (num1, num2) => (num2 === 0 ? (updateDisplayText(true),null) : num1 / num2);

function operate(num1, operator, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)

    switch(operator) {
        case "+" :
            return Math.round(add(num1, num2) * 100) / 100;
        case "-":
            return Math.round(subtract(num1, num2) * 100) / 100;
        case "*":
            return Math.round(multiply(num1, num2) * 100) / 100;
        case "/":
            return Math.round(divide(num1, num2) * 100) / 100;
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
        let result = operate(firstOperand, operator, secondOperand);
        if (result !== null){
            calculatorDisplayText.textContent = result;
        }
    }
})

//Clear current equation by removing display text and resetting the operands and operator
clearButton.addEventListener("click", () => {
    firstOperand = operator = secondOperand = "";
    updateDisplayText()
})

//Allows operator chaining (ex: 4 + 4, then press * to make equation 8 * )
function resetCurrentEquation(operand=null, newOperator=null) {
    if (operand && newOperator) {
        calculatorDisplayText.textContent = `${operand} ${newOperator} `;
        secondOperand = ""
    }
}

function updateDisplayText(isError=false) {
    if (isError) {
        calculatorDisplayText.textContent = "800813";
        console.log("ERROR: Dividing by 0")
    } else {
        calculatorDisplayText.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    }
}


//TODO
//Round result to 2 decimal places

//Possible tasks
//keyboardd support
//backspace 
