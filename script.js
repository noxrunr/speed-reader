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

    stop() {
        this.removeFocus()
        this.reset()
        this.renderPlayPauseButton('k')
    }
    
    backwards(skipStep) {
        const text = this.getWordsCollection(this.inputText.value)

        if ((this.anchorPoint - skipStep) <= 0) {
            this.anchorPoint = 0
            this.focusText.innerText = text[this.anchorPoint]
        } else {
            this.anchorPoint = this.anchorPoint - skipStep
            this.focusText.innerText = text[this.anchorPoint]
        }
    }

    forwards(skipStep) {
        const text = this.getWordsCollection(this.inputText.value)

        if ((skipStep + this.anchorPoint) >= text.length) {
            this.anchorPoint = text.length - 1
            this.focusText.innerText = text[this.anchorPoint]
        } else {
            this.anchorPoint = this.anchorPoint + skipStep
            this.focusText.innerText = text[this.anchorPoint]
        }
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
                this.backwards(3)
                break
            case 'play_arrow':
                this.play()
                break
            case 'pause':
                this.pause()
                break    
            case 'fast_forward':
                this.forwards(3)
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
        return text.replace(/[\r\n]+/g, ' ').split(' ')
    }

    async updateDisplay() {
        const text = this.getWordsCollection(this.inputText.value)

        for (let i = this.anchorPoint; i < text.length; i++) {
            if (this.isRunning) {
                await this.sleep(this.calculateMiliseconds())
                this.increaseFocus(i)
                this.focusText.innerText = text[i]
            } else {
                this.anchorPoint = i
                this.removeFocus()
                break
            }
        }
    }

    calculateMiliseconds() {
        const wordCount = this.getWordsCollection(this.inputText.value).length
        return 60000 / this.wpm.value 
    }

    increaseFocus(i) {
        const focus = document.getElementsByClassName('focus')[0]
        const opacity = (i <= 8) ? (i) : 8;
        focus.style.boxShadow = `0 0 0 1000vmax rgba(0,0,0,.${opacity})`
        focus.style.transition = 'box-shadow 2000ms'
        focus.style.pointerEvents = 'none'
        focus.style.position = 'relative'
    }

    removeFocus() {
        const focus = document.getElementsByClassName('focus')[0]
        focus.style.boxShadow = 'none'
        focus.style.transition = 'none'
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

document.addEventListener('keydown', function(event) {  
    switch(event.keyCode) {
        case 27:
            speedReader.stop()
            break
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

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        speedReader.chooseOperation(operation.innerText)
    })
})