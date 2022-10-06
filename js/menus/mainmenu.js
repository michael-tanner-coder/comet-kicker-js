createMenu({
  id: "mainMenu",
  header: "COMET KICKER",
  elements: [
    {
      ...BUTTON,
      text: "START GAME",
      onSelect: () => {
        game_state = STATES.GAME;
        changeMusic("battle_music");
      },
    },
    {
      ...BUTTON,
      text: "HIGH SCORES",
      onSelect: () => goToMenu("highScoreMenu"),
    },
    { ...BUTTON, text: "OPTIONS", onSelect: () => goToMenu("optionsMenu") },
    { ...BUTTON, text: "CREDITS", onSelect: () => goToMenu("creditsMenu") },
  ],
});
