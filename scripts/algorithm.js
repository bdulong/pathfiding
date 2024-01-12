document.addEventListener('DOMContentLoaded', () => {
    getCoordinates();
    class PriorityQueue {
        constructor() {
            this.elements = [];
        }
    
        isEmpty() {
            return this.elements.length === 0;
        }
    
        put(item, priority) {
            this.elements.push({item, priority});
            this.elements.sort((a, b) => a.priority - b.priority);
        }
    
        get() {
            return this.elements.shift().item;
        }
    }

    function dijkstra(grid, start, end) {
        console.log(`Point de départ : (${start.i}, ${start.j})`);
        console.log(`Point d'arrivée : (${end.i}, ${end.j})`);
        let startKey = start.i + '-' + start.j;
        let endKey = end.i + '-' + end.j;
        let visited = new Set();
        let queue = new PriorityQueue();
        queue.put(startKey, 0);
        let cameFrom = {};
        let costSoFar = {};
        costSoFar[startKey] = 0;

        while (!queue.isEmpty()) {
            let currentKey = queue.get();
            visited.add(currentKey);
        
            if (currentKey === endKey) {
                break;
            }
        
            let [i, j] = currentKey.split('-').map(Number);
            let current = grid[i][j];
            for (let next of getNeighbors(grid, current)) {
                let nextKey = next.i + '-' + next.j;
                if (visited.has(nextKey)) {
                    continue;
                }
                let newCost = costSoFar[currentKey] + 1;
                if (!costSoFar[nextKey] || newCost < costSoFar[nextKey]) {
                    costSoFar[nextKey] = newCost;
                    let priority = newCost + heuristic(end, next);
                    queue.put(nextKey, priority);
                    cameFrom[nextKey] = currentKey;
                }
            }
        }

        return reconstructPath(cameFrom, startKey, endKey).map(key => {
        let [i, j] = key.split('-').map(Number);
        return grid[i][j];
    });
}

    function getNeighbors(grid, cell) {
        let neighbors = [];
    
        let i = cell.i;
        let j = cell.j;
    
        // Voisin du haut
        if (i > 0) neighbors.push(grid[i - 1][j]);
        // Voisin du bas
        if (i < grid.length - 1) neighbors.push(grid[i + 1][j]);
        // Voisin de gauche
        if (j > 0) neighbors.push(grid[i][j - 1]);
        // Voisin de droite
        if (j < grid[0].length - 1) neighbors.push(grid[i][j + 1]);
    
        return neighbors;
    }

    function heuristic(a, b) {
        // Retourne une estimation du coût pour atteindre b à partir de a
        // Utilise la distance de Manhattan comme heuristique
        return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
    }

    function getCoordinates() {
        let startCell = document.querySelector('.start');
        let endCell = document.querySelector('.end');
    
        if (!startCell || !endCell) {
            console.error("Les cellules de départ et d'arrivée ne sont pas définies.");
            return;
        }
    
        let startId = startCell.id;
        let endId = endCell.id;
    
        let startCoordinates = startId.split('-').slice(1).map(Number);
        let endCoordinates = endId.split('-').slice(1).map(Number);
    
        console.log(`Point de départ : (${startCoordinates[0]}, ${startCoordinates[1]})`);
        console.log(`Point d'arrivée : (${endCoordinates[0]}, ${endCoordinates[1]})`);
    }

    function reconstructPath(cameFrom, startKey, endKey) {
        let currentKey = endKey;
        let path = [currentKey];
        while (currentKey !== startKey) {
            currentKey = cameFrom[currentKey];
            path.unshift(currentKey);
        }
        return path;
    }

    let start = window.grid[0][0];
    let end = window.grid[window.grid.length - 1][window.grid[0].length - 1];

    let path = dijkstra(window.grid, start, end);
    for (let cell of path) {
        let cellElement = cell.element;
        if (cellElement) {
            cellElement.classList.add('path');
        }
    }
});