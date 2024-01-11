document.addEventListener('DOMContentLoaded', (event) => {
    let checkerboard = document.querySelector('.checkerboard');

    for (let i = 0; i < 14; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 28; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        checkerboard.appendChild(row);
    }
});