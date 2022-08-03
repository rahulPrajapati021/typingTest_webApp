const testParagraphBox = document.querySelector(".testParagraphBox");

// this is for development period only

let fetchedParagraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus autem harum vel sapiente asperiores! Ex iusto sequi quibusdam quas et.";

// above is for development period only


// if paragraph is fetched then do this 

function populateTestParagraph() {
    let data = fetchedParagraph.trim().split(" ");
    data.forEach((word) => {
        let htmlLetterTemplate = "";

        Array.from(word).forEach((letter) => {
            let template = `
            <span class="letters">${letter}</span>
            `
            htmlLetterTemplate += template;
        })

        let htmlTemplate = `<div class="word">
                ${htmlLetterTemplate}</div>
        `
        // letters.forEach((l) => console.log(l))
        testParagraphBox.innerHTML += htmlTemplate;
    })
}

window.addEventListener("load", populateTestParagraph());


// now let add typing functionality and check if we write correct word or wrong word

//first we will grab all the letters and make them a array of letters;
let letters = document.getElementsByClassName("letters");
letters = Array.from(letters);

// we will be using an input field in replace we also can use the window 
// object as input

let keyInput = document.getElementById("keyInput")

// so if we listen the individual key press then we also listen the shift key press enter key press
// and many more and then are none of our use 
// so using the writable variable as an array of letters we want to listen, we can 
// resolve this problem 

let writable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*();':\",./?";
writable = Array.from(writable);

// along with the array we will have to write a function which will check if the 
//writtem letter is in the array or not
// i think this function can we avoided if we directly check the letter in our string variable
// using include method
// right now i'm going with my method

function isWritable(key) {
    for (let i = 0; i < writable.length; i++) {
        if (key == writable[i]) {
            return true;
        }
    }
    return false;
}
// now we listen to individual key press and then check if
// it is in our letters array (writable[]);

let timeFlag = false;
let time = 30;
let typeCursor = document.getElementById("typingCursor");
let typedLetters = [];


keyInput.addEventListener("textInput", (key) => {
    if (!timeFlag) {
        timeFlag = true;
        let numCounter = time;
        let counter = document.querySelector(".Counter");
        setInterval(() => {
            if (numCounter > 0) {
                counter.innerText = (--numCounter);
            }
        }, 1000);
        setTimeout(timeOutFunction, (time * 1000));
    }
    // so isWritable will check the following key is present in our array

    if (letters.length == 0) {
        return 0;
    }

    else {
        if (isWritable(key.data)) {
            if (key.data == letters[0].innerText) {
                letters[0].after(typeCursor);
                typedLetters.push(letters[0]);
                // if it is correct then add the correct class to it
                letters[0].classList.add("correct");
                // i have to remove the last class so the "correct" class can take over 
                letters[0].classList.remove("letters")
                // i dont think it is of any use 
                // if we would we using keyinput value instead of e.key then we have to do something like this
                keyInput.value = null;
                letters.shift(); // now flush the letter[0] so the next letter comes at 0th position
            }
            else {
                typedLetters.push(letters[0]);
                letters[0].after(typeCursor);
                letters[0].classList.add("wrong");
                letters[0].classList.remove("letters")
                keyInput.value = null;
                letters.shift();
            }
        }
        if (key.data == " ") {
            letters[0].before(typeCursor);
        }
    }
    keyInput.value = null;
});

keyInput.addEventListener("keydown", (e) => {
    if (e.key == "Backspace" && !(typedLetters.length == 0)) {
        let t = typedLetters.length - 1;
        letters.unshift(typedLetters[t])
        letters[0].classList.remove("correct");
        letters[0].classList.remove("wrong");
        letters[0].classList.add("letters");
        letters[0].before(typeCursor);
        typedLetters.pop()
    }
})

// adding blur effect when lost focus from input area
keyInput.onblur = () => {
    // blurEffectBox is kind of layer applied on
    let blurEffectBox = document.querySelector(".onBlurEffect");
    blurEffectBox.style.display = "flex"
    blurEffectBox.onclick = () => {
        blurEffectBox.style.display = "none";
        keyInput.focus();
    }
}

//now if the timer is over then the calculate function will take over 

/*
    Net WPM = Gross WPM - (uncorrected Errors/time-min);
          
        = [(all letter)/5] - Uncorrected Errors
                        time (min)
*/

function calculateSpeed() {
    let totalCorrectLetters = document.getElementsByClassName("correct").length;
    let totalWrongLetters = document.getElementsByClassName("wrong").length;

    let totalLetters = totalCorrectLetters + totalWrongLetters;

    let timeInMin = time / 60;

    let grossWpm = (totalLetters / 5) / timeInMin;

    let resultWPM = grossWpm - ((totalWrongLetters / 5) / timeInMin);

    let resultPanel = document.querySelector(".Result");
    
    let htmlTemplate = `<div>
        <div>Net Wpm = ${resultWPM}</div>
        <div>Gross Wpm = ${grossWpm}</div>
    </div>`;

    document.querySelector(".Test_Box").style.display = "none"
    resultPanel.innerHTML = htmlTemplate;
    resultPanel.style.display = "flex";
}

// timeout function definetion // it will work when the timeouts

function timeOutFunction() {
    
    calculateSpeed();
}

//here is the windows onload function /

// ===================================================================================

window.onload = () => {
    // keyInput.focus();
    letters[0].before(typeCursor);
}