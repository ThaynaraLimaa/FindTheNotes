const noteDisplay = document.querySelector('[data-note-display]')
const inicialBtnsContainer = document.querySelector('[data-inicial-btns-container]')
const startBtn = document.querySelector('[data-start-btn]')
const notesChoiseRadio = document.getElementsByName('noteChoice')

const gamePainelContainer = document.querySelector('[data-game-painel-container]')
const nextNoteBtn = document.querySelector('[data-next-note-btn]')

const endGameContainer = document.querySelector('[data-end-game-container]')
const finalTimeDisplay = document.querySelector('[data-final-time-display]')
const restartBtn = document.querySelector('[data-restart-btn]')

const helpDialog = document.querySelector('[data-help-dialog-container]')
const openHelpDialog = document.querySelector('[data-open-help-dialog]')
const closeHelpDialog = document.querySelector('[data-close-help-dialog]')

let musicNotes = []
let notesShuffled 
let notesCounter = 0

startBtn.addEventListener('click', () => {
    setNotes()

    // Shows the first note
    noteDisplay.innerHTML = `${notesShuffled[0]}`
    notesCounter += 1 

    hideElement(inicialBtnsContainer)
    hideElement(currentRecordDisplay)
    hideElement(deleteRecordInfoBtn)
    showElement(gamePainelContainer)

    startTimer()
})

nextNoteBtn.addEventListener('click', () => {
    noteDisplay.innerHTML = `${notesShuffled[notesCounter]}`
    
    if (notesCounter == notesShuffled.length) {
        hideElement(noteDisplay)
        hideElement(gamePainelContainer)
        showElement(endGameContainer)
        showElement(currentRecordDisplay)
        stopTimer()
    }

    notesCounter += 1 
})

restartBtn.addEventListener('click', () => {location.reload()})

openHelpDialog.addEventListener('click', () => {helpDialog.showModal()})
closeHelpDialog.addEventListener('click', () => {helpDialog.close()})

deleteRecordInfoBtn.addEventListener('click', () => {
    const confirm = window.confirm('Are you sure you want to delete your current record?')
    if (confirm) {
        localStorage.removeItem('currentRecord')
        location.reload()
    } 
})

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

