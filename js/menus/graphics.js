createMenu({
  id: "graphicsMenu",
  header: "GRAPHICS",
  elements: [
    {
      ...SELECT,
      text: "FULLSCREEN",
      options: [
        { label: getText("off"), value: false },
        { label: getText("on"), value: true },
      ],
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        toggleFullscreen(currentOption.value);
      },
    },
    { ...SELECT, text: "RESOLUTION" },
  ],
});
