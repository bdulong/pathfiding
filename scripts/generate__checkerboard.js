document.addEventListener('DOMContentLoaded', () => {
    let checkerboard = document.querySelector('.checkerboard');
    //Réprésentation de checkerboard sous forme de tableau bidimensionnel
    window.grid = [];

    //Créé un fragment pour ne pas avoir à modifier le DOM à chaque fois
    let fragment = document.createDocumentFragment();

    //Créé 14 lignes
    for (let i = 0; i < 14; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        //Déclare rowCells qui contient l'identité d'une cell
        let rowCells = [];
        //Créé 28 cellules
        for (let j = 0; j < 28; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell-' + i + '-' + j;
            row.appendChild(cell);
            //Ajoute nouvel objet dans rowCells avec les coordonées i et j et la class (cell) ainsi que son id
            rowCells.push({i: i, j: j, element: cell});
        }
        //Ajoute chaque row à fragment
        fragment.appendChild(row);
        //Ajoute chaque rowCells à window.grid
        window.grid.push(rowCells);
    }
    //Quand la boucle est finie ajoute fragment à checkerboard
    checkerboard.appendChild(fragment);
});