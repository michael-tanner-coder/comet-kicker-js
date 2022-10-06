createMenu({
  id: "controlsMenu",
  key: "controls",
  header: "CONTROLS",
  elements: [
    new Select({ key: "presets", text: "PRESETS", onSelect: () => {} }),
    new Select({ key: "custom", text: "CUSTOM", onSelect: () => {} }),
  ],
});
