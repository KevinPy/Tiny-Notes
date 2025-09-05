const storage = chrome.storage.sync || chrome.storage.local;

const DEFAULT_SETTINGS = {
  theme: "light",
  displayMode: "popup",
  width: 600,
  height: 400,
  toolbar: true,
  showStats: true,
};

storage
  .get(["theme", "displayMode", "width", "height", "toolbar", "showStats"])
  .then((result) => {
    document.getElementById("theme").value =
      result.theme || DEFAULT_SETTINGS.theme;
    document.getElementById("displayMode").value =
      result.displayMode || DEFAULT_SETTINGS.displayMode;
    document.getElementById("width").value =
      result.width || DEFAULT_SETTINGS.width;
    document.getElementById("height").value =
      result.height || DEFAULT_SETTINGS.height;
    document.getElementById("toolbar").checked =
      result.toolbar !== undefined ? result.toolbar : DEFAULT_SETTINGS.toolbar;
    document.getElementById("showStats").checked =
      result.showStats !== undefined
        ? result.showStats
        : DEFAULT_SETTINGS.showStats;
  });

document.getElementById("theme").addEventListener("change", (event) => {
  storage.set({ theme: event.target.value });
});

document.getElementById("displayMode").addEventListener("change", (event) => {
  storage.set({ displayMode: event.target.value });
});

document.getElementById("width").addEventListener("change", (event) => {
  const width = parseInt(event.target.value);
  if (width >= 300 && width <= 800) {
    storage.set({ width: width });
  }
});

document.getElementById("height").addEventListener("change", (event) => {
  const height = parseInt(event.target.value);
  if (height >= 200 && height <= 600) {
    storage.set({ height: height });
  }
});

document.getElementById("toolbar").addEventListener("change", (event) => {
  storage.set({ toolbar: event.target.checked });
});

document.getElementById("showStats").addEventListener("change", (event) => {
  storage.set({ showStats: event.target.checked });
});

document.getElementById("reset-dimensions").addEventListener("click", () => {
  document.getElementById("width").value = DEFAULT_SETTINGS.width;
  document.getElementById("height").value = DEFAULT_SETTINGS.height;
  document.getElementById("toolbar").checked = DEFAULT_SETTINGS.toolbar;
  document.getElementById("showStats").checked = DEFAULT_SETTINGS.showStats;
  document.getElementById("displayMode").value = DEFAULT_SETTINGS.displayMode;
  storage.set({
    width: DEFAULT_SETTINGS.width,
    height: DEFAULT_SETTINGS.height,
    toolbar: DEFAULT_SETTINGS.toolbar,
    showStats: DEFAULT_SETTINGS.showStats,
    displayMode: DEFAULT_SETTINGS.displayMode,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const trademarkElement = document.querySelector(".copyright");
  if (trademarkElement) {
    trademarkElement.textContent = `© ${year} Tiny Notes`;
  }
});
