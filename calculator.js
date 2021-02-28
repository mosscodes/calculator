const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const equateBtn = document.querySelector('[data-equate]');
const topDisplay = document.querySelector('[data-top-display]');
const bottomDisplay = document.querySelector('[data-bottom-display]');


// function numPress(e) {
//     const key = document.querySelector(`.num[data-key="${e.key}"]`);
//     displayBottomNumber(key.dataset.number);
// }
// window.addEventListener('keydown', numPress);


//currently not working
//Purpose: press operator keys
// function opPress(e) {
//     const key = document.querySelector(`.op[data-key="${e.key}"]`);
//     operation(key.dataset.operation);
// }

// window.addEventListener('keydown', opPress);


let numContainer = "0";
let num1 = null;
let num2 = null;
let operator = null;
let firstOperator = null;
let secondOperator = null;

bottomDisplay.innerText = numContainer;

//12 + 7 - 5 * 3 = 42

for (let i = 0; i < operationBtns.length; i++) {
    operationBtns[i].addEventListener('click', function() {


        operator = this.dataset.operation;
        setOperator(operator);
        operation(operationBtns[i]);
        updateTopDisplay();
    })
}

for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].addEventListener('click', function() {
        if (bottomDisplay.innerText === "Error") {
            return;
        }
        displayBottomNumber(this.dataset.number);
    })
}

deleteBtn.addEventListener('click', function() {
    undoNumber();
});

clearBtn.addEventListener('click', function() {
    clearDisplay()
});

equateBtn.addEventListener('click', function() {
    equate();
});


function displayBottomNumber(num) { 
    if (numContainer.length > 26) {
        return;
    }
    if (numContainer === "0" && num === '.' ) {
        numContainer = "0.";
        return bottomDisplay.innerText = numContainer;
    }
    if (numContainer === "0") {
        numContainer = '';
    }
    if (numContainer.includes(".") === true && num === '.') {
        return;
    } 
    numContainer = numContainer.concat(num);
    return bottomDisplay.innerText = numContainer;
}

function undoNumber() {
    if (bottomDisplay.innerText === "Error") {
        return;
    }
    numContainer = numContainer.slice(0, -1);
    if (numContainer.length === 0) {
        numContainer = "0"
        return bottomDisplay.innerText = numContainer;
    }
    return bottomDisplay.innerText = numContainer;
}

function updateTopDisplay() {
    if (num1 !== null && firstOperator !== null && num2 !== null) {
        topDisplay.innerText = `${num1} ${firstOperator} ${num2} =`
    }
    else if (num1 !== null && firstOperator !== null) {
        topDisplay.innerText = `${num1} ${firstOperator}`
    }
    else {
        topDisplay.innerText = '';
    }
}

function clearDisplay() {
    numContainer = "0";
    bottomDisplay.innerText = numContainer;
    topDisplay.innerText = '';
    operator = null;
    firstOperator = null;
    secondOperator = null;
    num1 = null;
    num2 = null;
}

function setOperator(operator) {
    if (firstOperator !== null && secondOperator !== null) {
        firstOperator = null;
        secondOperator = null;
    }

    if (firstOperator === null) {
        return firstOperator = operator;
    }
    else {
        return secondOperator = operator;
    }
}


function operation() {
    if (bottomDisplay.innerText === "Error") {
        return;
    }

    if (secondOperator === null) { 
        setValue(); 
        return;
    }
    if (secondOperator !== null) {
        setValue() 
        updateTopDisplay()
        const rawAnswer = operate(firstOperator, num1, num2);
        if (rawAnswer === "Error") {
            bottomDisplay.innerText = "Error";
            return;
        }
        const answer = Math.round(rawAnswer * 1000000) / 1000000;
        firstOperator = secondOperator;
        secondOperator = null;
        num1 = answer;
        num2 = null;
        bottomDisplay.innerText = answer;
        numContainer = '0'
        return;
    }
}

function setValue() {
    
    if (num1 === null) {
        
        num1 = numContainer;
        numContainer = "0";
    }
    else { 
        
        num2 = numContainer;
        numContainer = "0";
    }
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "÷":
            if (b === 0) {
                return "Error";
            }
            else {
                return a / b;
            }
        default:
            return null;
  }
}

function equate() {
    if (num1 === null) {
        return;
    }
    setValue();
    updateTopDisplay()
    let rawAnswer = null;
    let answer = null;
    rawAnswer = operate(firstOperator, num1, num2);
    if (rawAnswer === "Error") {
        bottomDisplay.innerText = "Error";
        return;
    }
    answer = Math.round(rawAnswer * 1000000) / 1000000;
    bottomDisplay.innerText = answer;
    num1 = answer;
    num2 = null;
    firstOperator = null;
    secondOperator = null;
}


//it's setting b as zero because equate zeroed out num container in the lst one