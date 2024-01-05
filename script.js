const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'

let current_size = DEFAULT_SIZE
let current_color = DEFAULT_COLOR
let current_mode = DEFAULT_MODE

const createGridBtn = document.getElementById('createGridBtn');
const clearGridBtn = document.getElementById('clearGridBtn');
const colorBtn = document.getElementById('colorBtn')
const eraserBtn = document.getElementById('eraserBtn')
const container = document.getElementById('container');

colorBtn.addEventListener('click', () => setCurrentMode('color'))
eraserBtn.addEventListener('click', () => setCurrentMode('eraser'))
createGridBtn.addEventListener('click', () => refreshGrid());
clearGridBtn.addEventListener('click', () => clearGrid());

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
    }

    if (newMode === 'color') {
        colorBtn.classList.add('active')
        console.log("Switching to color mode")
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
        console.log("Switching to eraser mode")
    }
}

// Function to set the current mode to new mode
function setCurrentMode(newMode) {
    activateButton(newMode)
    current_mode = newMode
}

window.onload = () => {
    createGrid(DEFAULT_SIZE)
}