const OPTS = {
  delay: 300
}

browser.storage.sync.get().then(opts => {
  Object.assign(OPTS, opts);
}).catch(e => {
  console.error('Error loading options', e);
});


const coord = {x: 0, y: 0};

if (window == window.top) {
  document.addEventListener('mousemove', function(e) {
    coord.x = e.clientX;
    coord.y = e.clientY;
  });
  window.addEventListener('keyup', keyListener, false);
}

function getLink() {
  let el = document.elementFromPoint(coord.x, coord.y);
  if (!(el.tagName == 'A' || el.tagName == 'IMG')) {
    el = el.closest('a') || el.closest('img');
  }

  let url = el.tagName == 'A' ? el.href :
      el.tagName == 'IMG' ? el.src :
      '';

  if (url)
    return [url, el];
}

function keyListener(e) {
  if (e.ctrlKey) {
    switch (e.keyCode) {
    case 65: // 'a'
      return copy(window.location.href);
    case 83: // 's'
      var [url, el] = getLink();
      return url && copy(url, el);
    case 87: // 'w'
      var [url, el] = getLink();
      if (url) {
        url = el.tagName == 'A' ? `[${el.textContent.trim()}](${url})` :
          `![${el.alt}](${url})`;
      }
      return url && copy(url, el);
    }
  }
}

async function copy(s, el) {
  let overlay = el && highlight(el);
  let start = +new Date;

  try {
    await navigator.clipboard.writeText(s)
    // console.debug('Successfully copied');
  } catch(e) {
    console.error('Could not copy', e);
  }
}

function highlight(el) {
  const delay = OPTS.delay;

  let rect = el.getBoundingClientRect();
  let overlay = document.createElement('div');
  overlay.style.cssText = `
    position: absolute;
    top: ${rect.top + window.scrollY}px;
    left: ${rect.left + window.scrollX}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    background-color: rgba(255, 255, 0, 1);
    opacity: 0;
    transition: opacity ${delay / 2}ms ease-in-out;
    z-index: 99999;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);
  // console.debug('Appended overlay', overlay);
  setTimeout(_ => { overlay.style.opacity = 0.5 }, 1)
  setTimeout(_ => { overlay.style.opacity = 0 }, delay / 2)
  setTimeout(_ => { overlay.remove() }, delay);
  return overlay;
}
