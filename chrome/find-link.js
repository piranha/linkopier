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

if (window == top) {
    window.addEventListener('keyup', keyListener, false);
}

// ctrl-a/ctrl-s
function keyListener(e) {
    if (!e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
        return;

    var url;
    if (e.keyCode == 65) // 'a'
        url = window.location.href;
    else if (e.keyCode == 83) // 's'
        url = getLink();

    if (url)
        chrome.extension.sendMessage(url);
}
