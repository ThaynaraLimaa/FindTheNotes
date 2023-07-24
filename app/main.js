const keysDisplay = document.querySelector('[data-key-display]')

const inicialBtnsContainer = document.querySelector('[data-inicial-btns-container]')
const startBtn = document.querySelector('[data-start-btn]')
const notesChoiseRadio = document.getElementsByName('keyChoise')

const gamePainelContainer = document.querySelector('[data-game-painel-container]')
const nextKeyBtn = document.querySelector('[data-next-key-btn]')

const endGameContainer = document.querySelector('[data-end-game-container]')
const finalTimeDisplay = document.querySelector('[data-final-time-display]')
const restartBtn = document.querySelector('[data-restart-btn]')

let musicNotes = []
let notesShuffled 
let notesCounter = 0

startBtn.addEventListener('click', () => {
    setNotes()

    keysDisplay.innerHTML = `${notesShuffled[0]}`
    notesCounter += 1 

    hideElement(inicialBtnsContainer)
    hideElement(currentRecordDisplay)
    showElement(gamePainelContainer)

    startTimer()
})

nextKeyBtn.addEventListener('click', () => {
    keysDisplay.innerHTML = `${notesShuffled[notesCounter]}`
    
    if (notesCounter == notesShuffled.length) {
        hideElement(keysDisplay)
        hideElement(gamePainelContainer)
        showElement(endGameContainer)
        showElement(currentRecordDisplay)
        stopTimer()
    }

    notesCounter += 1 
})

restartBtn.addEventListener('click', () => {location.reload()})

function hideElement(element) {element.classList.add('hide-element')}

function showElement(element) {element.classList.remove('hide-element')}

function setNotes() {
    if (notesChoiseRadio[0].checked) {
        musicNotes = ["A", "B", "C", "D", "E", "F", "G"]
    } else {
        musicNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
    }

    notesShuffled = shuffleNotes(musicNotes)
}

// takes the array of the notes that are in order and shuffles them
function shuffleNotes(randomNotes) {
    randomNotes.sort(() => Math.random() - 0.5);
    return randomNotes
}

