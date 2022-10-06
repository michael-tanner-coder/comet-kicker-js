createMenu({
  id: "optionsMenu",
  header: "OPTIONS",
  elements: [
    { ...BUTTON, text: "GRAPHICS", onSelect: () => goToMenu("graphicsMenu") },
    { ...BUTTON, text: "SOUND", onSelect: () => goToMenu("soundMenu") },
    { ...BUTTON, text: "GAMEPLAY", onSelect: () => goToMenu("gameplayMenu") },
    { ...BUTTON, text: "LANGUAGE", onSelect: () => goToMenu("languageMenu") },
    { ...BUTTON, text: "DATA", onSelect: () => goToMenu("dataMenu") },
    { ...BUTTON, text: "CONTROLS", onSelect: () => goToMenu("controlsMenu") },
  ],
});
