const TEXT_CONTENT = {
  // LANGUAGES
  english: {
    en: "english",
    es: "inglés",
    fr: "espagnol",
  },
  spanish: {
    en: "spanish",
    es: "español",
    fr: "spanish",
  },
  french: {
    en: "french",
    es: "francés",
    fr: "français",
  },

  // GAME TEXT
  score: {
    en: "score",
    es: "puntaje",
    fr: "score",
  },
  average_score: {
    en: "average score",
    es: "puntuación media",
    fr: "score moyen",
  },
  retry: {
    en: "retry",
    es: "rever",
    fr: "recommencez",
  },
  quit: {
    en: "quit",
    fr: "quitter",
    es: "abandonar",
  },
  press_enter: {
    en: "press enter",
    es: "presiona enter",
    fr: "appuyez sur entrée",
  },
  game_paused: {
    en: "game paused",
    es: "juego pausado",
    fr: "jeu en pause",
  },
  press_enter_to_continue: {
    en: "press enter to continue",
    es: "presiona enter para continuar",
    fr: "appuyez sur entrée pour continuer",
  },

  // OPTIONS
  on: {
    en: "on",
    es: "on",
    fr: "on",
  },
  off: {
    en: "off",
    es: "off",
    fr: "off",
  },
};

function getText(text) {
  // check if the text object exits
  if (!TEXT_CONTENT[text]) {
    // provide error message if the text object does not exist
    console.log("Text not found");

    // return [content not found] to inform dev that text is undefined
    return "[content not found]";
  }

  // check if the text is supported in the current language setting
  if (!TEXT_CONTENT[text][current_language]) {
    console.log("current language not supported for this text");

    // return english as default or return [content not found] to inform dev that text is undefined
    return TEXT_CONTENT[text]["en"]?.toUpperCase() || "[content not found]";
  }

  // if supported, return the text line in the current language
  return TEXT_CONTENT[text][current_language]?.toUpperCase();
}
