createMenu({
  id: "optionsMenu",
  key: "options",
  header: "OPTIONS",
  elements: [
    new Button({
      key: "graphics",
      text: "GRAPHICS",
      onSelect: () => goToMenu("graphicsMenu"),
    }),
    new Button({
      key: "sound",
      text: "SOUND",
      onSelect: () => goToMenu("soundMenu"),
    }),
    new Button({
      key: "gameplay",
      text: "GAMEPLAY",
      onSelect: () => goToMenu("gameplayMenu"),
    }),
    new Button({
      key: "language",
      text: "LANGUAGE",
      onSelect: () => goToMenu("languageMenu"),
    }),
    new Button({
      key: "data",
      text: "DATA",
      onSelect: () => goToMenu("dataMenu"),
    }),
    new Button({
      key: "controls",
      text: "CONTROLS",
      onSelect: () => goToMenu("controlsMenu"),
    }),
  ],
});
