function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;
};

function pipActive() {
    chrome.extension.sendRequest({
        action: "active"
    }, function (response) {
        console.log("PIP succeed.");
    });
}

window.addEventListener("load", function () {
    var htmlDOM = parseDom('<button onclick="pipActive()" class="ytp-pip-button ytp-button" aria-label="画中画 (Alt+P)" title="画中画 (Alt+P)" style="vertical-align: top;text-align: center;"><svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%" style="fill: #fff;width: 50%;"><path d="M2.667 2.667h18.667v18.667h-18.667v-18.667M29.333 10.667v18.667h-18.667v-5.333h2.667v2.667h13.333v-13.333h-2.667v-2.667h5.333z"></path></svg></button>')[0];
    document.getElementsByClassName("ytp-right-controls")[0].prepend(htmlDOM);
}, false);