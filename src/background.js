chrome.commands.onCommand.addListener(function(command) {
  if (command === "open_popup") {
    chrome.system.display.getInfo(function(displays) {
      if (displays.length > 0) {
        // Assuming the first display is the primary display
        let primaryDisplay = displays[0];
        let screenWidth = primaryDisplay.bounds.width;
        let screenHeight = primaryDisplay.bounds.height;

        // Calculate the position to place the pop-up on the right side in the middle
        let left = screenWidth - 300; // Assuming the pop-up width is 300px
        let top = (screenHeight / 2) - (500 / 2); // Assuming the pop-up height is 500px

        chrome.windows.create({
          url: chrome.runtime.getURL('/dir/popup.html'),
          type: 'popup',
          width: 300,
          height: 500,
          left: left,
          top: top
        });
      }
    });
  }
});
