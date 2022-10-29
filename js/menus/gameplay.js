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

const GAME_HP_OPTION = new Select({
  text: "MAX HP",
  key: "hp",
  currentOption: 0, // 0 based (1-10), so (0-9)
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    MAX_HP = currentOption.value;
    PLAYER.hp = MAX_HP;
    window.localStorage.setItem("MAX_HP", MAX_HP);
  },
});
addOptionRange(GAME_HP_OPTION, 1, 6);

createMenu({
  id: "gameplayMenu",
  key: "gameplay",
  header: "GAMEPLAY",
  elements: [
    new Select({
      key: "screenshake",
      text: "SCREENSHAKE",
      currentOption: screen_shake_on ? 0 : 1,
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        toggleScreenshake(currentOption.value);
      },
      options: [
        { label: getText("on"), value: true },
        { label: getText("off"), value: false },
      ],
    }),
    new Select({
      key: "invincible_mode",
      text: "INVINCIBLE MODE",
      currentOption: invincible_mode ? 1 : 0,
      onChange: (input) => {
        var currentOption = input.options[input.currentOption];
        toggleInvincibleMode(currentOption.value);
      },
      options: [
        { label: getText("off"), value: false },
        { label: getText("on"), value: true },
      ],
    }),
    GAME_SPEED_OPTION,
    new Button({
      key: "colors",
      text: "COLORS",
      onSelect: () => goToMenu("colorsMenu"),
    }),
  ],
});
