const LANGUAGE_SELECT = { ...SELECT, text: "SELECT LANGUAGE" };
LANGUAGE_SELECT.options = [
  { label: getText("english"), value: "en" },
  { label: getText("spanish"), value: "es" },
  { label: getText("french"), value: "fr" },
];
createMenu({
  id: "languageMenu",
  header: "LANGUAGE",
  elements: [LANGUAGE_SELECT],
});

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
    },
    {
      ...SELECT,
      text: "GAME SPEED",
    },
  ],
});
