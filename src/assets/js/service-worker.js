chrome.action.onClicked.addListener(async () => {
  const storage = chrome.storage.sync || chrome.storage.local;
  const result = await storage.get(["displayMode"]);
  const displayMode = result.displayMode || "popup";

  if (displayMode === "sidepanel") {
    chrome.sidePanel.open({ windowId: (await chrome.windows.getCurrent()).id });
  } else {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.displayMode) {
    const newDisplayMode = changes.displayMode.newValue;
    chrome.sidePanel.setPanelBehavior({
      openPanelOnActionClick: newDisplayMode === "sidepanel" ? true : false,
    });
  }
});
