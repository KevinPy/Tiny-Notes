const OT = window.OverType?.default || window.OverType;
const storage = chrome.storage.sync || chrome.storage.local;
const STORAGE_KEY = "tiny-notes-key";
const DEFAULT_SETTINGS = {
  theme: "light",
  toolbar: true,
  showStats: true,
};

const DEFAULT_VALUE = `# Welcome to Tiny Notes

This is **markdown** with *real-time* preview.

You are the possibility to modify, in _options_ page:
1. Theme
2. Display mode (popup or side panel)
3. Width
4. Height
5. Toolbar
6. Statistics`;

const getSavedContent = () => {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_VALUE;
};

const saveContent = (content) => {
  localStorage.setItem(STORAGE_KEY, content);
};

const initializeEditor = async () => {
  const result = await storage.get(["theme", "toolbar", "showStats"]);
  const theme = result.theme || DEFAULT_SETTINGS.theme;
  const toolbar =
    result.toolbar !== undefined ? result.toolbar : DEFAULT_SETTINGS.toolbar;
  const showStats =
    result.showStats !== undefined
      ? result.showStats
      : DEFAULT_SETTINGS.showStats;

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
