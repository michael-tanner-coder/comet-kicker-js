createMenu({
  id: "mainMenu",
  key: "comet_kicker",
  header: "COMET KICKER",
  image: "logo",
  boundary: {
    x: GAME_W / 4,
    y: GAME_H / 4 + 50,
    width: 160,
    height: 128,
  },
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
