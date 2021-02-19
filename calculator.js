//todo
//clear (reset to zero)
//negative positive switch

function add(num1, num2) {
    if (num1 === "Error"){
        num1 = 0;
    }
    return Math.round((num1 + num2) * 100000) / 100000;
}

function subtract(num1, num2) {
    if (num1 === "Error"){
        num1 = 0;
    }
    return Math.round((num1 - num2) * 100000) / 100000;
}

function divide(num1, num2) {
    if (num1 === "Error"){
        num1 = 0;
    }
    if (num2 === 0) {
        return "Error";
    }
    else {
        return Math.round((num1 / num2) * 100000) / 100000;
    }
}

function multiply(num1, num2){
    if (num1 === "Error"){
        num1 = 0;
    } 
    return Math.round((num1 * num2) * 100000) / 100000;
}

function operate(operator, num1, num2){
    displayNum = operator(num1, num2);
    return displayNum;
}