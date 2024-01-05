const DEFAULT_SIZE = 16

let current_size = DEFAULT_SIZE

const createGridBtn = document.getElementById('createGridBtn');
const clearGridBtn = document.getElementById('clearGridBtn');
const container = document.getElementById('container');

createGridBtn.addEventListener('click', () => refreshGrid());
clearGridBtn.addEventListener('click', () => clearGrid());

// Function to create an n x n grid in the "container" div
function createGrid(size) {
    console.log("Creating Grid of size: " + size)
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square')
        container.appendChild(gridSquare);
    }
}

// Function to clear grid of content
function clearGrid() {
    console.log("Clearing Grid")
    container.innerHTML = ''
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