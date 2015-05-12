var mediaState = "play";

var pause = function(tab) {
    chrome.tabs.sendMessage(tab.id, {action: "pause"}, function(response) {
        console.log(response.status);
        mediaState = "paused";
        return response.status;
    });
}

var play = function(tab) {
    chrome.tabs.sendMessage(tab.id, {action: "play"}, function(response) {
        console.log(response.status);
        mediaState = "play";
        return response.status
    });
}

var stateToActionMap = {
    paused: play,
    play: pause
}

function startMutify() {
    var queryInfo = {
        url:[
                '*://www.youtube.com/*'
        ]
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        console.log(tab.url);
        if(tab.length == 0 ) {
            return;
        }
        stateToActionMap[mediaState](tab);
    });
}

chrome.commands.onCommand.addListener(function(command) {
    console.log("Iam here");
    startMutify();
    console.log('onCommand event received for message: ', command);
});
