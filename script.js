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
    
    isRunning
    anchorPoint = 0

    constructor(inputText, wpm, focusText) {
        this.inputText = inputText
        this.wpm = wpm
        this.focusText = focusText
    }

    renderPlayPauseButton(elementId) {
        const button = document.getElementById(elementId)
        const icon = document.createElement('i')
        icon.classList.add('material-icons')

        if (this.isRunning) {
            icon.innerHTML = 'pause'
        } else {
            icon.innerHTML = 'play_arrow'
        }

        button.replaceChild(icon, button.children[0])
    }
    
    play() {
        this.isRunning = true
        this.renderPlayPauseButton('k')
        this.updateDisplay()
    }
    
    pause() {
        this.isRunning = false
        this.renderPlayPauseButton('k')
        this.updateDisplay()
    }
    
    backwards() {
        console.log('backwards pressed')
    }

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

    getWordsCollection(text) {
        return text.split(' ')
    }

    async updateDisplay() {
        const text = this.getWordsCollection(this.inputText.value)

        console.log('stopped', this.anchorPoint)

        for (let i = this.anchorPoint; i < text.length; i++) {
            if (this.isRunning) {
                await this.sleep(this.wpm.value)
                this.focusText.innerText = text[i]
            } else {
                this.anchorPoint = i
                break
            }
            console.log(text[i], i, this.wpm.value)
        }
    }

    reset() {
        this.isRunning = false
        this.anchorPoint = 0
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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