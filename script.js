document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 74:
            document.getElementById('j').click()
            break;
        case 75:
            document.getElementById('k').click()
            break;
        case 76:
            document.getElementById('l').click()
            break;
        default:
            return;         
    }
});

class SpeedReader {

    constructor(inputText, wpm, focusText) {
        this.inputText = inputText;
        this.wpm = wpm;
        this.focusText = focusText;
    }

    backwards() {
        console.log('backwards pressed')
    }

    play() {
        this.updateDisplay();
    }

    pause() {}

    forwards() {
        console.log('forwards pressed');
    }

    incrementWpm() {}

    decrementWpm() {}

    chooseOperation(operation) {
        switch(operation) {
            case "fast_rewind":
                this.backwards();
                break;
            case "play_arrow":
                this.play();
                break;
            case "fast_forward":
                this.forwards();
                break;
            case "-":  
                this.decrementWpm();
                break;
            case "+":
                this.incrementWpm();
                break;
            default:
                return;                  
        }
    }

    getWords(text) {
        return this.inputText.innerText.split(" ");
    }

    updateDisplay() {
        this.focusText.innerText = this.getWords(this.inputText.value);
        console.log(this.focusText.innerText);
    }
}

const operationButtons = document.querySelectorAll('[data-operation]');
const inputText = document.getElementById('user-input');
const wpm = document.getElementById('wpm');
const focusText = document.querySelector('[data-focus]');

const speedReader = new SpeedReader(inputText, wpm, focusText);

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        speedReader.chooseOperation(operation.innerText);
        speedReader.updateDisplay();
    })
});