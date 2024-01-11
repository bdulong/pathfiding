document.addEventListener('DOMContentLoaded', () => {
    let checkerboard = document.querySelector('.checkerboard');
    window.grid = []; // Ajoutez cette ligne

    for (let i = 0; i < 14; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        let rowCells = []; // Ajoutez cette ligne
        for (let j = 0; j < 28; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell-' + i + '-' + j;
            row.appendChild(cell);
            rowCells.push({i: i, j: j, element: cell}); // Ajoutez cette ligne
        }
        checkerboard.appendChild(row);
        window.grid.push(rowCells); // Ajoutez cette ligne
    }
});