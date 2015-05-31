var pauseVideo = function(){
    if(document.getElementsByClassName("pauseButton").length > 0)
        document.getElementsByClassName("pauseButton")[0].click();
        return "paused";
};

var playVideo = function(){
    console.log(document.getElementsByClassName("playButton"));
    if (document.getElementsByClassName("playButton").length > 0)
        document.getElementsByClassName("playButton")[0].click();
        return "play";
};

var messageToActionMap = {
    pause: pauseVideo,
    play: playVideo
};

window.addEventListener("load", function(event) {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("action request" + request.action);
            var status = messageToActionMap[request.action]();
            sendResponse({status: status});
        }
    );
});
