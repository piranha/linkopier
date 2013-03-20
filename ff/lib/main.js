var tabs = require('tabs');
var pagemod = require('page-mod');
var self = require('self');
var clipboard = require('clipboard');
var Hotkey = require('hotkeys').Hotkey;

var WORKERS = [];
function activeWorker() {
    for (var i = 0, l = WORKERS.length; i < l; i++) {
        if (WORKERS[i].tab == tabs.activeTab) {
            return WORKERS[i];
        }
    }
}

function copyUrl() {
    clipboard.set(tabs.activeTab.url);
}

pagemod.PageMod({
    include: '*',
    contentScriptWhen: 'start',
    contentScriptFile: self.data.url('copy-link.js'),
    onAttach: function(worker) {
        WORKERS.push(worker);
        worker.on('detach', function() {
            WORKERS.splice(WORKERS.indexOf(worker), 1);
        });
        worker.port.on('link', function(link) {
            if (link)
                clipboard.set(link, 'text');
        });
    }
});

function copyLink() {
    var worker = activeWorker();
    if (worker)
        worker.port.emit('get-link');
}


var copyUrlKey = Hotkey({
    combo: 'control-a',
    onPress: copyUrl
});

var copyLinkKey = Hotkey({
    combo: 'control-s',
    onPress: copyLink
});
