var tabs = require('tabs');
var pagemod = require('page-mod');
var self = require('self');
var clipboard = require('clipboard');
var Hotkey = require('hotkeys').Hotkey;
var notifications = require("notifications");

var WORKERS = [];

function fy(title, text) {
    notifications.notify({
        title: title.toString(),
        text: text.toString()
    });
}

function copyUrl() {
    // fy('copy', tabs.activeTab.url);
    clipboard.set(tabs.activeTab.url);
}

pagemod.PageMod({
    include: '*',
    contentScriptFile: self.data.url('copy-link.js'),
    onAttach: function(worker) {
        WORKERS.push(worker);
        // fy('attached', WORKERS.length);
        worker.on('detach', function() {
            WORKERS.splice(WORKERS.indexOf(worker), 1);
            // fy('detached', WORKERS.length);
        });
        worker.port.on('link', function(link) {
            // fy('got', link);
            clipboard.set(link);
        });
    }
});

function copyLink() {
    var worker;
    for (var i = 0, l = WORKERS.length; i < l; i++) {
        if (WORKERS[i].tab == tabs.activeTab) {
            worker = WORKERS[i];
            break;
        }
    }
    if (!worker)
        return;
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
