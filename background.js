var mediaState = "play";

var pause = function(tabs) {
    for(var i=0; i < tabs.length; i++){
        var tab = tabs[i];
        chrome.tabs.sendMessage(tab.id, {action: "pause"}, function(response) {
            // response.status;
        });
    }
    mediaState = "paused";
};

var play = function(tabs) {
    //For now play the last tab
    var tab = tabs[tabs.length - 1];
    chrome.tabs.sendMessage(tab.id, {action: "play"}, function(response) {
        // response.status
    });
    mediaState = "play";
};

var stateToActionMap = {
    paused: play,
    play: pause
};

function startPausify() {
    var queryInfo = {
        url:[
                '*://www.youtube.com/*',
                '*://www.pandora.com/*',
                '*://soundcloud.com/*'
        ]
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        if(tabs.length == 0 ) {
            return;
        }
        stateToActionMap[mediaState](tabs);
    });
};

chrome.commands.onCommand.addListener(function(command) {
    startPausify();
});
