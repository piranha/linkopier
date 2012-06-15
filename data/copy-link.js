var coord = {x: 0, y: 0};

self.port.on('get-link', function() {
    var el = document.elementFromPoint(coord.x, coord.y);
    var link;
    switch (el.tagName) {
    case 'A':
        link = el.href;
        break;
    case 'IMG':
        link = el.src;
        break;
    default:
        link = '';
    }
    self.port.emit('link', link);
});

document.addEventListener('mousemove', function(e) {
    coord.x = e.clientX;
    coord.y = e.clientY;
});
