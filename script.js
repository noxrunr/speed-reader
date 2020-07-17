document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 74:
            document.getElementById('j').click()
            break
        case 75:
            document.getElementById('k').click()
            break
        case 76:
            document.getElementById('l').click()
            break
        case 38:
            document.getElementById('up').click()
            break
        case 40: 
            document.getElementById('down').click()
            break
        default:
            return         
    }
})

class SpeedReader {

    constructor(inputText, wpm, focusText) {
        this.inputText = inputText
        this.wpm = wpm
        this.focusText = focusText
    }

    backwards() {
        console.log('backwards pressed')
    }

    play() {
        this.updateDisplay()
    }

    pause() {}

    forwards() {
        console.log('forwards pressed')
    }

    incrementWpm() {
        this.wpm.value++
    }

    decrementWpm() {
        this.wpm.value--
    }

    chooseOperation(operation) {
        switch(operation) {
            case 'fast_rewind':
                this.backwards()
                break
            case 'play_arrow':
                this.play()
                break
            case 'pause':
                this.pause()
                break    
            case 'fast_forward':
                this.forwards()
                break
            case '-':  
                this.decrementWpm()
                break
            case '+':
                this.incrementWpm()
                break
            default:
                return                  
        }
    }

    getWords(text) {
        return text.split(' ')
    }

    updateDisplay() {
        const text = this.getWords(this.inputText.value)

        text.forEach( (element, index, array) => {

            setTimeout( () => {
                this.focusText.innerText = element
            }, (array.length / 1)  )
        })
    }
}

const operationButtons = document.querySelectorAll('[data-operation]')
const inputText = document.getElementById('user-input')
const wpm = document.getElementById('wpm')
const focusText = document.querySelector('[data-focus]')

const speedReader = new SpeedReader(inputText, wpm, focusText)

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        speedReader.chooseOperation(operation.innerText)
    })
})