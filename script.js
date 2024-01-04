const DEFAULT_SIZE = 16

let current_size = DEFAULT_SIZE

// Function to create an n x n grid in the "container" div
function createGrid(size) {
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
    container.innerHTML = ''
}

function refreshGrid() {
    let number = prompt("How many boxes per side?");
    clearGrid()
    createGrid(number)
};

const createGridBtn = document.getElementById('createGridBtn');
const container = document.getElementById('container');

createGridBtn.addEventListener('click', () => refreshGrid());

window.onload = () => {
    createGrid(DEFAULT_SIZE)
}