document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    });
});