const color_options = [
  { label: getText("default"), value: "default" },
  { label: getText("red"), value: "red" },
  { label: getText("yellow"), value: "yellow" },
  { label: getText("green"), value: "green" },
];

const current_color_index = color_options.indexOf(
  color_options.find((option) => option.value === playerColorKey)
);

createMenu({
  id: "colorsMenu",
  key: "colors",
  header: "COLORS",
  elements: [
    new Select({
      key: "player_color",
      text: "PLAYER COLOR",
      currentOption: current_color_index,
      options: color_options,
      onChange: (input) => {
        playerColorKey = input.options[input.currentOption].value;
        swapPlayerColors();
        localStorage.setItem("playerColorKey", playerColorKey);
      },
    }),
  ],
});
