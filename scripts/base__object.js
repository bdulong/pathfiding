document.addEventListener('DOMContentLoaded', () => {
    let cells = document.querySelectorAll('.checkerboard .cell');

    // Créer une balise img pour l'image de départ
    let imgStart = document.createElement('img');
    imgStart.src = 'img/start.svg';
    imgStart.draggable = true; // Rendre l'image déplaçable

    imgStart.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'start');
    });

    // Ajouter l'image de départ à la première cellule
    let cellStart = document.getElementById('cell-5-6');
    if (cellStart) {
        cellStart.appendChild(imgStart);
        cellStart.classList.add('start'); // Ajouter la classe 'start' à la première cellule
    }

    // Créer une balise img pour l'image de fin
    let imgEnd = document.createElement('img');
    imgEnd.src = 'img/end.svg';
    imgEnd.draggable = true; // Rendre l'image déplaçable

    imgEnd.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'end');
    });

    // Ajouter l'image de fin à la deuxième cellule
    let cellEnd = document.getElementById('cell-8-21');
    if (cellEnd) {
        cellEnd.appendChild(imgEnd);
        cellEnd.classList.add('end'); // Ajouter la classe 'end' à la deuxième cellule
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
                
            } else if (droppedItem === 'end') {
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