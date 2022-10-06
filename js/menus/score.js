createMenu({
  id: "dataMenu",
  key: "data",
  header: "DATA",
  elements: [
    new Button({
      key: "average_score",
      text: "AVERAGE SCORE",
      onSelect: () => {},
    }),
    new Button({ key: "progress", text: "PROGRESS", onSelect: () => {} }),
    new Button({
      key: "delete_data",
      text: "DELETE DATA?",
      onSelect: () => {},
    }),
  ],
});
