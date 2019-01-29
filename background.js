if (!document.pictureInPictureEnabled) {
  chrome.browserAction.setTitle({ title: 'Picture-in-Picture NOT supported' });
} else {
  const code = `
    (async () => {
      const videos = Array.from(document.querySelectorAll('video'))
          .filter(video => video.readyState != 0)
          .filter(video => video.disablePictureInPicture == false)
          .sort((v1, v2) => {
            const v1Rect = v1.getClientRects()[0];
            const v2Rect = v1.getClientRects()[0];
            return ((v2Rect.width * v2Rect.height) -(v1Rect.width * v1Rect.height));
          });

      if (videos.length === 0)
        return;

      const video = videos[0];

      if (video.hasAttribute('__pip__')) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
        video.setAttribute('__pip__', true);
        video.addEventListener('leavepictureinpicture', event => {
          video.removeAttribute('__pip__');
        }, { once: true });
      }
    })();
  `;
  chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.executeScript({ code, allFrames: true });
  });
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "active") {
      chrome.tabs.executeScript({ code, allFrames: true });
      sendResponse({ result: true });
    } else sendResponse({}); // snub them.
  });
}