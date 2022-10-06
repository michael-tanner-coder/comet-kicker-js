createMenu({
  id: "dataMenu",
  header: "DATA",
  elements: [
    {
      ...BUTTON,
      text: "AVERAGE SCORE",
      onSelect: () => {},
    },
    { ...BUTTON, text: "PROGRESS", onSelect: () => {} },
    {
      ...BUTTON,
      text: "DELETE DATA?",
      onSelect: () => {},
    },
  ],
});
