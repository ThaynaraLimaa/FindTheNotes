const currentRecordDisplay = document.querySelector('[data-current-record-display]')
const deleteRecordInfoBtn= document.querySelector('[data-delete-record-info]')

let seconds = 0
let minutes = 0
let interval 
let finalTime 

function displayCurrentRecord() {
    if (localStorage.getItem('currentRecord')) {
        const currentRecordLocalStorage = JSON.parse(localStorage.getItem('currentRecord'))
        const currentRecord = `Record: ${makeTwoDigits(currentRecordLocalStorage.min)}:${makeTwoDigits(currentRecordLocalStorage.sec)}`
        currentRecordDisplay.innerHTML = currentRecord
    } else {
        // If an old record doesn't exist, it will hide the delete record button
        deleteRecordInfoBtn.classList.add('hide-element')
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
            displayFinalTime(true) // true because it is new record
        } else {
            displayFinalTime(false)
        }
    } else {
        const newRecord = createRecordObject(min, sec)
        localStorage.setItem('currentRecord', JSON.stringify(newRecord))
        displayCurrentRecord()
        displayFinalTime(true)
    }
}

function displayFinalTime(isNew) {
    finalTime = `${makeTwoDigits(minutes)}:${makeTwoDigits(seconds)}`

    // Checks if it is a new record
    if (isNew) {
        finalTimeDisplay.innerHTML = `New record! Your time: ${finalTime}`
        finalTimeDisplay.classList.add('new-time-record')
    } else {
        finalTimeDisplay.innerHTML = 'Your Time:' + finalTime
    }   
}

function createRecordObject(min, sec) {return {min: min, sec: sec}}

function makeTwoDigits(dig) {
    const digit = dig < 10 ? '0' + dig : dig
    return digit
}


// ---- Timer Functions ----

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
    updateRecordInLocalStorage(minutes, seconds)
}

displayCurrentRecord()