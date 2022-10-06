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
    {
      ...SELECT,
      text: "RESOLUTION",
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        canvas.style.width = `${currentOption.value.width}px`;
        canvas.style.height = `${currentOption.value.height}px`;
      },
      options: [
        { label: "320x240", value: { width: 320, height: 240 } },
        { label: "640x480", value: { width: 640, height: 480 } },
        { label: "1280x960", value: { width: 1280, height: 960 } },
      ],
    },
  ],
});
