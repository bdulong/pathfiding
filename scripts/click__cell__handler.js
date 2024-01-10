document.addEventListener('DOMContentLoaded', (event) => {
    let cells = document.querySelectorAll('.cell');
    let isDrawing = false;
    let isErasing = false;

    cells.forEach(cell => {
        cell.addEventListener('mousedown', function(){
            isDrawing = true;
            // Si la cellule a déjà la classe 'wall', alors on est en mode effacement
            isErasing = this.classList.contains('wall');
            this.classList.toggle('wall');
        });

        cell.addEventListener('mouseover', function(){
            if(isDrawing) {
                // Si on est en mode effacement, on retire la classe 'wall', sinon on l'ajoute
                if(isErasing) {
                    this.classList.remove('wall');
                } else {
                    this.classList.add('wall');
                }
            }
        });

        cell.addEventListener('mouseup', function(){
            isDrawing = false;
        });
    });

    // Ajouter un événement mouseup à la fenêtre pour gérer le cas où l'utilisateur relâche le bouton de la souris en dehors d'une cellule
    window.addEventListener('mouseup', function(){
        isDrawing = false;
    });
});