const GAME_SPEED_OPTION = new Select({
  text: "GAME SPEED",
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    game_speed = currentOption.value / 10;
  },
});
addOptionRange(GAME_SPEED_OPTION, 1, 10);

createMenu({
  id: "gameplayMenu",
  header: "GAMEPLAY",
  elements: [
    new Select({
      text: "SCREENSHAKE",
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        screen_shake_on = currentOption.value;
      },
      options: [
        { label: getText("on"), value: true },
        { label: getText("off"), value: false },
      ],
    }),
    new Select({
      text: "INVINCIBLE MODE",
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        invincible_mode = currentOption.value;
      },
      options: [
        { label: getText("off"), value: false },
        { label: getText("on"), value: true },
      ],
    }),
    GAME_SPEED_OPTION,
  ],
});
