createMenu({
  id: "mainMenu",
  key: "comet_kicker",
  header: "COMET KICKER",
  elements: [
    new Button({
      key: "start_game",
      text: "START GAME",
      onSelect: () => {
        game_state = STATES.GAME;
        changeMusic("battle_music");
      },
    }),
    new Button({
      key: "high_scores",
      text: "HIGH SCORES",
      onSelect: () => goToMenu("highScoreMenu"),
    }),
    new Button({
      key: "options",
      text: "OPTIONS",
      onSelect: () => goToMenu("optionsMenu"),
    }),
    new Button({
      key: "credits",
      text: "CREDITS",
      onSelect: () => goToMenu("creditsMenu"),
    }),
  ],
});
