const OT = window.OverType?.default || window.OverType;
const storage = chrome.storage.sync || chrome.storage.local;
const STORAGE_KEY = "tiny-notes-key";
const DEFAULT_SETTINGS = {
  theme: "light",
  width: 600,
  height: 400,
  toolbar: true,
  showStats: true,
};

const DEFAULT_VALUE = `# Welcome to Tiny Notes

This is **markdown** with *real-time* preview.

You are the possibility to modify, in _options_ page:
1. Theme
2. Width
3. Height
4. Toolbar
5. Statistics`;

const getSavedContent = () => {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_VALUE;
};

const saveContent = (content) => {
  localStorage.setItem(STORAGE_KEY, content);
};

const initializeEditor = async () => {
  const result = await storage.get([
    "theme",
    "width",
    "height",
    "toolbar",
    "showStats",
  ]);
  const theme = result.theme || DEFAULT_SETTINGS.theme;
  const width = result.width || DEFAULT_SETTINGS.width;
  const height = result.height || DEFAULT_SETTINGS.height;
  const toolbar =
    result.toolbar !== undefined ? result.toolbar : DEFAULT_SETTINGS.toolbar;
  const showStats =
    result.showStats !== undefined
      ? result.showStats
      : DEFAULT_SETTINGS.showStats;

  document.body.style.width = `${width}px`;
  document.body.style.height = `${height}px`;

  const [editor] = new OT("#editor", {
    theme,
    toolbar,
    showStats,
    placeholder: "Enter your notes with markdown...",
    value: getSavedContent(),
    onChange: (value) => {
      saveContent(value);
    },
  });

  return editor;
};

initializeEditor().catch(console.error);
