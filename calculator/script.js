let btn = document.getElementsByClassName('btn');


let displayElement = document.getElementsByClassName('display')[0];

// eventListener

document.addEventListener('click', (e) => {
    let txt = e.target.innerText;
    if (e.target.classList.contains("btn")) {

        if (txt === "=") {
            evaluate();

        } else if (txt === "C") {
            erase();
            displayElement.classList.add('font-size');
            displayElement.classList.remove('answer');
        } else {
            display(txt);

        }
    }
})

// function for mathemetical operations

function evaluate() {

    let answer = eval(displayElement.innerText);

    erase();

    if (!isFinite(answer)) {

        window.alert("Please give Valid Values.");
    } else {
        let str = answer.toString();
        if (str.includes(".")) {
            if (str.length >= "8") {


                answer = answer.toFixed(8);
                answer = parseFloat(answer);
            }
        }

        display(answer);
        displayElement.classList.remove('font-size');
        displayElement.classList.add('answer');


    }


}

//function for displaying

function display(txt) {
    displayElement.innerText += txt;

}

//function to erase

function erase() {
    displayElement.innerText = "";
}