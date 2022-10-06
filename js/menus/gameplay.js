createMenu({
  id: "gameplayMenu",
  header: "GAMEPLAY",
  elements: [
    {
      ...SELECT,
      text: "SCREENSHAKE",
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        screen_shake_on = currentOption.value;
      },
      options: [
        { label: getText("on"), value: true },
        { label: getText("off"), value: false },
      ],
    },
    {
      ...SELECT,
      text: "INVINCIBLE MODE",
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        invincible_mode = currentOption.value;
      },
      options: [
        { label: getText("off"), value: false },
        { label: getText("on"), value: true },
      ],
    },
    {
      ...SELECT,
      text: "GAME SPEED",
    },
  ],
});
