function onRequest(link) {
    var input = document.getElementById('url');
    if (!input)
        return;

    input.value = link;
    input.select();
    document.execCommand('copy', false, null);
}

chrome.extension.onMessage.addListener(onRequest);
