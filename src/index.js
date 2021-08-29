function add(a, b){
    return Number(a) + Number(b);
}
function substract (a, b){
    return Number(a) - Number(b);
}
function multiply(a, b){
    return Number(a) * Number(b);
}
function divide(a, b){
    return Number(a) / Number(b);
}

function updateDisplay(val){
    let display = document.getElementById('calcCurrent')
    if (String(display.textContent).length < 10){
        display.textContent = display.textContent + val
    }
}

function clearDisplay(){
    let display = document.getElementById('calcCurrent')
    display.textContent = ''
}

function getDisplayValue(){
    let display = document.getElementById('calcCurrent')
    return Number(display.textContent)
}

function clearOpDisplay(){
    let opDisplay = document.getElementById('opCurrent')
    opDisplay.textContent = ''
}

function updateOpDispay(val){
    let opDisplay = document.getElementById('opCurrent')
    opDisplay.textContent = String(val)
}

function returnCurrent(val1, mod, val2){
    val1 = Number(val1)
    val2 = Number(val2)
    let total = 0
    if (mod == '%' && Number(val2) == 0) return 'Undefined'
    if (mod == '+') total = val1 + val2;
    else if (mod == '-') total = val1 - val2;
    else if (mod == '*') total = val1 * val2;
    else if (mod == '%') total = val1 / val2;
    return total
}

function returnOpDisplay(val1, mod, val2, display){
    return `${val1} ${mod} ${val2} = ${display}`
}

function clearAll(){
    display.textContent = ''
    opDisplay.textContent = ''
    val1 = 0
    val2 = 0
    mod = ''
    isPost = false
    activateKeys(modKeys)
}

function setDecimal(val){
    if (!String(val).includes('.')) return String(val) + '.';
    else return val;
}

function disableKeys(keysNode){
    keysNode.forEach((key) => {
        key.classList.add('inactive')
        console.log(key.classList)
    })
}

function activateKeys(keysNode){
    keysNode.forEach((key) => {
        key.classList.remove('inactive')
        console.log(key.classList)
    })
}

var display = document.getElementById('calcCurrent')
var opDisplay = document.getElementById('opCurrent')
var val1 = 0
var val2 = 0
var mod = ''
var isPost = false

const modKeys = document.querySelectorAll('.mod')

const dataKeys = document.querySelectorAll('.data-key')
// Set up data-keys to return their value on click
dataKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (isPost) clearAll();
        updateDisplay(key.textContent)
    })
})

const specialKeys = document.querySelectorAll('.specialKeys')
// Set up special keys to perform an action (add, subtract, equal, etc.)
specialKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (mod == ''){
            val1 = Number(display.textContent)
            mod = key.textContent
            display.textContent = ''
            opDisplay.textContent = String(val1) + ' ' + mod
            disableKeys(modKeys)
        }
    })
})

// Equal sign special functionality
const equal = document.getElementById('equal')
equal.addEventListener('click', () => {
    if (mod && display.textContent){
        val2 = Number(display.textContent)
        let newDisplay = String(returnCurrent(val1, mod, val2))
        if (newDisplay.length > 10){
            newDisplay = newDisplay.slice(0, 9)
        }
        display.textContent = newDisplay
        opDisplay.textContent = returnOpDisplay(val1, mod, val2, display.textContent)
        val1 = 0
        val2  = 0
        mod = ''
        isPost = true
        activateKeys(modKeys)
    }
})

const decimal = document.getElementById('decimal')
decimal.addEventListener('click', () => {
    display.textContent = setDecimal(display.textContent)
})

const sign = document.getElementById('sign')
sign.addEventListener('click', () => {
    if (display.textContent && !isPost){
        display.textContent = Number(display.textContent) * -1
    } else {
        display.textContent = '-'
    }
})

const clear = document.getElementById('clear')
clear.addEventListener('click', () => {
    clearAll()
})
