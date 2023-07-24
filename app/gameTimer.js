const currentRecordDisplay = document.querySelector('[data-current-record-display]')
let currentRecordLocalStorage
let currentRecord

let seconds = 0
let minutes = 0
let interval 
let finalTime 

function displayCurrentRecord() {
    if (localStorage.getItem('currentRecord')) {
        currentRecordLocalStorage = JSON.parse(localStorage.getItem('currentRecord'))
        currentRecord = `Record: ${makeTwoDigits(currentRecordLocalStorage.min)}:${makeTwoDigits(currentRecordLocalStorage.sec)}`
        currentRecordDisplay.innerHTML = currentRecord
    }
}


function updateRecordInLocalStorage(min, sec) {
    if (localStorage.getItem('currentRecord')) {
        const localObject = JSON.parse(localStorage.getItem('currentRecord'))
        // Check if the time is a new record and saves to local: 
        if (localObject.min > minutes || (minutes == localObject.min && seconds < localObject.sec)) {
            const newRecord = createRecordObject(min, sec)
            localStorage.setItem('currentRecord', JSON.stringify(newRecord))
            displayCurrentRecord()
            console.log('new record saved')
        } else {
            console.log('nao é um novo record')
        }
    } else {
        const newRecord = createRecordObject(min, sec)
        localStorage.setItem('currentRecord', JSON.stringify(newRecord))
        displayCurrentRecord()
        console.log('record Criado')
    }
}


function makeTwoDigits(dig) {
    const digit = dig < 10 ? '0' + dig : dig
    return digit
}

function timer() {
    seconds ++
    if (seconds == 60) {
        minutes ++
        seconds = 0
    }

    document.querySelector('[ data-game-timer]').innerHTML = `${makeTwoDigits(minutes)}:${makeTwoDigits(seconds)}`
}

function startTimer() {
    timer()
    interval = setInterval(timer, 1000)
}

function stopTimer() {
    clearInterval(interval)
    finalTime = `${makeTwoDigits(minutes)}:${makeTwoDigits(seconds)}`
    finalTimeDisplay.innerHTML = finalTime
    currentRecordDisplay.innerHTML = currentRecord
    updateRecordInLocalStorage(minutes, seconds)
}

function createRecordObject(min, sec) {return {min: min, sec: sec}}

displayCurrentRecord()