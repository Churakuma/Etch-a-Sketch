const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#333333'

let current_size = DEFAULT_SIZE
let current_color = DEFAULT_COLOR

const createGridBtn = document.getElementById('createGridBtn');
const clearGridBtn = document.getElementById('clearGridBtn');
const container = document.getElementById('container');

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
    e.target.style.backgroundColor = current_color
}

// Function to clear the grid of existing content and create a new one
function refreshGrid() {
    let number = prompt("How many boxes per side?");
    clearGrid()
    createGrid(number)
};

window.onload = () => {
    createGrid(DEFAULT_SIZE)
}