createMenu({
  id: "optionsMenu",
  header: "OPTIONS",
  elements: [
    new Button({
      text: "GRAPHICS",
      onSelect: () => goToMenu("graphicsMenu"),
    }),
    new Button({
      text: "SOUND",
      onSelect: () => goToMenu("soundMenu"),
    }),
    new Button({
      text: "GAMEPLAY",
      onSelect: () => goToMenu("gameplayMenu"),
    }),
    new Button({
      text: "LANGUAGE",
      onSelect: () => goToMenu("languageMenu"),
    }),
    new Button({
      text: "DATA",
      onSelect: () => goToMenu("dataMenu"),
    }),
    new Button({
      text: "CONTROLS",
      onSelect: () => goToMenu("controlsMenu"),
    }),
  ],
});
