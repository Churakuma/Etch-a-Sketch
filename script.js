const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'

let current_size = DEFAULT_SIZE
let current_color = DEFAULT_COLOR
let current_mode = DEFAULT_MODE

const colorPicker = document.getElementById('colorPicker')
const createGridBtn = document.getElementById('createGridBtn')
const clearGridBtn = document.getElementById('clearGridBtn')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const container = document.getElementById('container')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.addEventListener('click', () => setCurrentMode('color'))
rainbowBtn.addEventListener('click', () => setCurrentMode('rainbow'))
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'))
createGridBtn.addEventListener('click', () => refreshGrid());
clearGridBtn.addEventListener('click', () => clearGrid());
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Function to create an n x n grid in the "container" div
function createGrid(size) {
    console.log("Creating Grid of size: " + size)
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square')
        gridSquare.addEventListener('mouseover', changeColor)
        gridSquare.addEventListener('mousedown', changeColor)
        container.appendChild(gridSquare);
    }
}

// Function to update text div showing current grid size
function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

//Function to change the size of the grid using the slider
function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

// Function to reload grid given current size
function reloadGrid() {
    clearGrid()
    createGrid(current_size)
}

// Function to clear grid of content
function clearGrid() {
    console.log("Clearing Grid")
    container.innerHTML = ''
    createGrid(current_size)
}

// Function to change the color of the selected grid square
function changeColor(e) {
    if (e.type === 'mouseOver' && !mouseDown) return
    if (current_mode === 'color') {
        e.target.style.backgroundColor = current_color
    } else if (current_mode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    } else if (current_mode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
}

// Function to clear the grid of existing content and create a new one
function refreshGrid() {
    let number = prompt("How many boxes per side?");
    clearGrid()
    createGrid(number)
};

// Function to show the selected mode by highlighting the button
function activateButton(newMode) {
    if (current_mode === 'color') {
        colorBtn.classList.remove('active')
    } else if (current_mode === 'eraser') {
        eraserBtn.classList.remove('active')
    } else if (current_mode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    }

    if (newMode === 'color') {
        colorBtn.classList.add('active')
        console.log("Switching to pen mode")
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
        console.log("Switching to eraser mode")
    } else if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
        console.log("Switching to rainbow mode")
    }
}

// Function to set the current mode to new mode
function setCurrentMode(newMode) {
    activateButton(newMode)
    current_mode = newMode
}

// Function to use the color picker and select color
function setCurrentColor(newColor) {
    current_color = newColor
}

// Function to set the current size of the grid
function setCurrentSize(newSize) {
    current_size = newSize
}

window.onload = () => {
    createGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}