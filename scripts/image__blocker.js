document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    });
});