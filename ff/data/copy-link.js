var coord = {x: 0, y: 0};

document.addEventListener('mousemove', function(e) {
    coord.x = e.clientX;
    coord.y = e.clientY;
});

function getLink() {
    var el = document.elementFromPoint(coord.x, coord.y);
    var link;
    switch (el.tagName) {
    case 'A':
        return el.href;
    case 'IMG':
        return el.src;
    default:
        return '';
    }
}

self.port.on('get-link', function() {
    self.port.emit('link', getLink());
});
