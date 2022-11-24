let display = document.querySelector(".display");
let btnGroup = document.querySelectorAll(".btn");
let operatorArr = ['+', '-', '*', '/', '.'];

display.innerText = 0;

document.addEventListener("click", (e) => {
    let element = e.target
    if (element.classList.contains("btn")) {
        displayOutput(element.innerText);
    }
})

//display Output logic
function displayOutput(str) {
    if (str === 'C') clearAll();
    else if (str === 'del') {
        deleteInput();
    } else if (str === '=') {
        display.innerText = evaluate(display.innerText);
    } else {
        enterInput(str);
    }
}

//operations
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function clearAll() {
    display.innerText = 0;
}

function deleteInput() {
    let currentDisplay = display.innerText;

    display.innerText = display.innerText;
}

//Handle arithmatic operations
function operation(x, y, op) {
    let value;
    switch (op) {
        case '+':
            value = add(x, y);
            break;
        case '-':
            value = subtract(x, y);
            break;
        case '*':
            value = multiply(x, y);
            break;
        case '/':
            value = divide(x, y);
            break;
    }
    return value;
}

//Handle inputs
function enterInput(str) {
    let currentDisplay = display.innerText;

    //Input is '.'
    if (str === '.') {
        if (currentDisplay.match(/.+[+\-*/]([+\-]?\d*\.?\d*)/g).length > 0) return;
        else
            display.innerText += str;
    }
    //Input is a digit
    else if (parseInt(str) >= 0) {
        if (currentDisplay === '0')
            display.innerText = str;
        else
            display.innerText += str;
    }
    // Input is an operator + Evaluate current expression and update Display
    else if (operatorArr.indexOf(str) >= 0) {
        if (operatorArr.some(operator => currentDisplay.includes(operator))) {
            display.innerText = evaluate(currentDisplay);
        }
        if (operatorArr.indexOf(currentDisplay.charAt(currentDisplay.length - 1)) >= 0)
            display.innerText = currentDisplay.substring(0, currentDisplay.length - 1) + str.toString();
        else
            display.innerText += str.toString();
    }
}

//Evaluate the current expression
function evaluate(currentDisplay) {
    const evalArr = [...currentDisplay.matchAll(/([+\-]?\d+\.?\d*)([+\-*/])([+\-]?\d*\.?\d*)/g)];
    let finalOp = '';
    console.log(evalArr)
    if (evalArr.length === 0)
        return currentDisplay;
    else if (evalArr[0][3] === '') {
        finalOp = evalArr[0][1];
    } else {
        let postOperationVal = operation(parseFloat(evalArr[0][1]), parseFloat(evalArr[0][3]), evalArr[0][2]);
        finalOp = postOperationVal;
    }
    return finalOp;
}