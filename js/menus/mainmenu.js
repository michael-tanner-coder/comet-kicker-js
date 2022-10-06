createMenu({
  id: "mainMenu",
  header: "COMET KICKER",
  elements: [
    new Button({
      text: "START GAME",
      onSelect: () => {
        game_state = STATES.GAME;
        changeMusic("battle_music");
      },
    }),
    new Button({
      text: "HIGH SCORES",
      onSelect: () => goToMenu("highScoreMenu"),
    }),
    new Button({
      text: "OPTIONS",
      onSelect: () => goToMenu("optionsMenu"),
    }),
    new Button({
      text: "CREDITS",
      onSelect: () => goToMenu("creditsMenu"),
    }),
  ],
});
