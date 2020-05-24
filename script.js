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

    constructor(text, wpm, focus) {
        this.text = text;
        this.wpm = wpm;
        this.focus = focus;
        this.clear();
    }

    clear() {
        this.text = '';
        this.operation = undefined;
    }

    backwards() {
        console.log('backwards pressed')
    }

    play() {
        console.log('play pressed')
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
            case "play_arrowPlay":
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
        return this.text.split(" ");
    }

    updateDisplay() {

    }
}

const operationButtons = document.querySelectorAll('[data-operation]');
const inputText = document.querySelector('[data-textarea]');
const wpm = document.querySelector('[data-wpm]');

const speedReader = new SpeedReader(inputText, wpm);

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        speedReader.chooseOperation(operation.innerText);
        speedReader.updateDisplay();
    })
});