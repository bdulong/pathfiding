document.addEventListener('DOMContentLoaded', () => {
    let cells = document.querySelectorAll('.cell');
    let isDrawing = false;
    let isErasing = false;
    let isDraggingStart = false;
    let isDraggingEnd = false;

    let imgStart = document.querySelector('.start img');
    let imgEnd = document.querySelector('.end img');

    if (imgStart) {
        imgStart.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', 'start');
            isDraggingStart = true;
        });

        imgStart.addEventListener('dragend', function() {
            isDraggingStart = false;
            isDrawing = false;
        });
    }

    if (imgEnd) {
        imgEnd.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', 'end');
            isDraggingEnd = true;
        });

        imgEnd.addEventListener('dragend', function() {
            isDraggingEnd = false;
            isDrawing = false;
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('mousedown', function(){
            if (!isDraggingStart && !isDraggingEnd) {
                isDrawing = true;
                isErasing = this.classList.contains('wall');
                if (!this.classList.contains('start') && !this.classList.contains('end')) {
                    this.classList.toggle('wall');
                }
            }
        });

        cell.addEventListener('mouseover', function(){
            if (isDrawing && !isDraggingStart && !isDraggingEnd) {
                if(isErasing) {
                    if (!this.classList.contains('start') && !this.classList.contains('end')) {
                        this.classList.remove('wall');
                    }
                } else {
                    if (!this.classList.contains('start') && !this.classList.contains('end')) {
                        this.classList.add('wall');
                    }
                }
            }
        });

        cell.addEventListener('mouseup', function(){
            if (!isDraggingStart && !isDraggingEnd) {
                isDrawing = false;
            }
        });

        cell.addEventListener('dragover', function(event) {
            event.preventDefault();
        });

        cell.addEventListener('drop', function(event) {
            event.preventDefault();
            let droppedItem = event.dataTransfer.getData('text/plain');
            if (droppedItem === 'start') {
                this.classList.remove('wall');
                this.classList.add('start');
            } else if (droppedItem === 'end') {
                this.classList.remove('wall');
                this.classList.add('end');
            }
        });
    });

    window.addEventListener('mouseup', function(){
        if (!isDraggingStart) {
            isDrawing = false;
        }
    });

    document.querySelector('img[src="img/trash.svg"]').addEventListener('click', function() {
        cells.forEach(cell => {
            if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.remove('wall');
            }
        });
    });
});