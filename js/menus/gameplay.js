const GAME_SPEED_OPTION = new Select({
  text: "GAME SPEED",
  key: "game_speed",
  currentOption: game_speed * 10 - 1, // 0 based (1-10), so (0-9)
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    game_speed = currentOption.value / 10;
  },
});
addOptionRange(GAME_SPEED_OPTION, 1, 10);

createMenu({
  id: "gameplayMenu",
  key: "gameplay",
  header: "GAMEPLAY",
  elements: [
    new Select({
      key: "screenshake",
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
      key: "invincible_mode",
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
