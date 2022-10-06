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
  comet_kicker: {
    en: "COMET KICKER",
    es: "COMET KICKER",
    fr: "COMET KICKER",
  },
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

  // MENUS
  start_game: {
    en: "START GAME",
    es: "EMPEZAR JUEGO",
  },
  high_scores: {
    en: "HIGH SCORES",
    es: "PUNTUACIONES ALTAS",
  },
  options: {
    en: "OPTIONS",
    es: "OPCIONES",
  },
  credits: {
    en: "CREDITS",
    es: "CRÉDITOS",
  },
  graphics: {
    en: "GRAPHICS",
    es: "GRÁFICOS",
  },
  sound: {
    en: "SOUND",
    es: "SONIDO",
  },
  gameplay: {
    en: "GAMEPLAY",
    es: "JUEGO",
  },
  language: {
    en: "LANGUAGE",
    es: "IDIOMA",
  },
  data: {
    en: "DATA",
    es: "DATOS",
  },
  controls: {
    en: "CONTROLS",
    es: "CONTROL",
  },

  // OPTION VALUES
  on: {
    en: "on",
    es: "en",
    fr: "on",
  },
  off: {
    en: "off",
    es: "apagado",
    fr: "off",
  },

  // GRAPHICS
  fullscreen: {
    en: "FULLSCREEN",
    es: "PANTALLA COMPLETA",
  },
  resolution: {
    en: "RESOLUTION",
    es: "RESOLUCIÓN",
  },

  // SOUND
  master_volume: {
    en: "MASTER VOLUME",
    es: "VOLUMEN PRINCIPAL",
  },
  sound_volume: {
    en: "SOUND VOLUME",
    es: "SONIDO",
  },
  music_volume: {
    en: "MUSIC VOLUME",
    es: "MÚSICA",
  },

  // GAMEPLAY
  game_speed: {
    en: "GAME SPEED",
    es: "VELOCIDAD DEL JUEGO",
  },
  screenshake: {
    en: "SCREEN SHAKE",
    es: "MOVIMIENTO DE PANTALLA",
  },
  invincible_mode: {
    en: "INVINCIBLE MODE",
    es: "MODO INVENCIBLE",
  },

  // LANGUAGE
  select_language: {
    en: "SELECT LANGUAGE",
    es: "SELECCIONE EL IDIOMA",
  },

  // DATA
  progress: {
    en: "PROGRESS",
    es: "PROGRESO",
  },
  delete_data: {
    en: "DELETE DATA?",
    es: "¿BORRAR DATOS?",
  },

  // CONTROLS
  presets: {
    en: "PRESETS",
    es: "PREESTABLECIDA",
  },
  custom: {
    en: "CUSTOM",
    es: "DISFRAZ",
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
