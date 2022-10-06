createMenu({
  id: "controlsMenu",
  header: "CONTROLS",
  elements: [
    new Select({ ...SELECT, text: "PRESETS", onSelect: () => {} }),
    new Select({ ...SELECT, text: "CUSTOM", onSelect: () => {} }),
  ],
});
