function nukeEducationPlayers() {
  // Remove iframes immediately
  document.querySelectorAll('iframe[src*="youtubeeducation.com"]').forEach(iframe => {
    iframe.remove();
    iframe.src = 'about:blank';
  });

  // Block audio containers
  const audioContainers = document.querySelectorAll('.yt-education-audio, .audio-preview-container');
  audioContainers.forEach(container => {
    container.innerHTML = '';
    container.remove();
  });

  // Disable player API
  const scripts = document.querySelectorAll('script[src*="www.youtube.com/embed/"]');
  scripts.forEach(script => script.remove());
}

function handleMutations(mutations) {
  mutations.forEach(mutation => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.matches?.('iframe[src*="youtubeeducation.com"]')) {
          node.remove();
          node.src = 'about:blank';
        }
      });
    }
  });
}

const observer = new MutationObserver(handleMutations);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});

// Nuclear option for stubborn audio
document.addEventListener('DOMContentLoaded', () => {
  setInterval(nukeEducationPlayers, 1000);
  nukeEducationPlayers();
});

// Block autoplay at network level
chrome.webRequest.onBeforeRequest.addListener(
  details => ({ cancel: true }),
  { urls: ["*://*.youtubeeducation.com/*", "*://www.youtube.com/embed/*?autoplay=1*"] },
  ["blocking"]
);