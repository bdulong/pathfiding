document.addEventListener('DOMContentLoaded', (event) => {
    // Supposons que chaque cellule ait une classe 'cell'
    let cells = document.querySelectorAll('.checkerboard .cell');

    function calculateIndex(rowIndex, columnIndex) {
        const numberOfColumns = 28;
        return rowIndex * numberOfColumns + columnIndex;
    }

    // Calculer l'index de la première cellule
    let rowIndexStart = 5;
    let columnIndexStart = 6;
    let indexStart = calculateIndex(rowIndexStart, columnIndexStart);

    // Créer une balise img pour l'image de départ
    let imgStart = document.createElement('img');
    imgStart.src = 'img/start.svg';
    imgStart.draggable = true; // Rendre l'image déplaçable

    imgStart.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'start');
    });

    // Ajouter l'image de départ à la première cellule
    if (cells[indexStart]) {
        cells[indexStart].appendChild(imgStart);
        cells[indexStart].classList.add('start'); // Ajouter la classe 'start' à la première cellule
    }

    // Calculer l'index de la deuxième cellule
    let rowIndexEnd = 8;
    let columnIndexEnd = 21;
    let indexEnd = calculateIndex(rowIndexEnd, columnIndexEnd);

    // Créer une balise img pour l'image de fin
    let imgEnd = document.createElement('img');
    imgEnd.src = 'img/end.svg';
    imgEnd.draggable = true; // Rendre l'image déplaçable

    imgEnd.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'end');
    });

    // Ajouter l'image de fin à la deuxième cellule
    if (cells[indexEnd]) {
        cells[indexEnd].appendChild(imgEnd);
        cells[indexEnd].classList.add('end'); // Ajouter la classe 'end' à la deuxième cellule
    }

    // Ajouter des gestionnaires d'événements dragover et drop à chaque cellule
    cells.forEach(cell => {
        cell.addEventListener('dragover', function(event) {
            event.preventDefault(); // Permettre le dépôt
        });

        cell.addEventListener('drop', function(event) {
            event.preventDefault();
            let droppedItem = event.dataTransfer.getData('text/plain');
            if (droppedItem === 'start') {
                // Supprimer l'image de départ de la cellule précédente
                let previousCell = document.querySelector('.start');
                if (previousCell) {
                    previousCell.removeChild(previousCell.querySelector('img'));
                    previousCell.classList.remove('start');
                }

                // Ajouter l'image de départ à la nouvelle cellule
                this.appendChild(imgStart);
                this.classList.add('start');
                
            } else if (droppedItem === 'end') { // Ajouter ce bloc
                // Supprimer l'image de fin de la cellule précédente
                let previousCell = document.querySelector('.end');
                if (previousCell) {
                    previousCell.removeChild(previousCell.querySelector('img'));
                    previousCell.classList.remove('end');
                }

                // Ajouter l'image de fin à la nouvelle cellule
                this.appendChild(imgEnd);
                this.classList.add('end');
            }
        });
    });
});