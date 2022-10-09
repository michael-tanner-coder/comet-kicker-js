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
  average: {
    en: "average",
    es: "media",
    fr: "moyen",
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
    fr: "DÉMARRER JEU",
  },
  high_scores: {
    en: "HIGH SCORES",
    es: "PUNTUACIONES ALTAS",
    fr: "SCORES ÉLEVÉS",
  },
  options: {
    en: "OPTIONS",
    es: "OPCIONES",
    fr: "OPTIONS",
  },
  credits: {
    en: "CREDITS",
    es: "CRÉDITOS",
    fr: "CRÉDITS",
  },
  graphics: {
    en: "GRAPHICS",
    es: "GRÁFICOS",
    fr: "GRAPHIQUE",
  },
  sound: {
    en: "SOUND",
    es: "SONIDO",
    fr: "DU SON",
  },
  gameplay: {
    en: "GAMEPLAY",
    es: "JUEGO",
    fr: "JEU",
  },
  language: {
    en: "LANGUAGE",
    es: "IDIOMA",
    fr: "LANGUE",
  },
  data: {
    en: "DATA",
    es: "DATOS",
    fr: "LES DONNÉES",
  },
  controls: {
    en: "CONTROLS",
    es: "CONTROL",
    fr: "LES CONTRÔLES",
  },

  // OPTION VALUES
  on: {
    en: "on",
    es: "en",
    fr: "sur",
  },
  off: {
    en: "off",
    es: "apagado",
    fr: "à l'arrêt",
  },

  // GRAPHICS
  fullscreen: {
    en: "FULLSCREEN",
    es: "PANTALLA COMPLETA",
    fr: "PLEIN ÉCRAN",
  },
  resolution: {
    en: "RESOLUTION",
    es: "RESOLUCIÓN",
    fr: "RÉSOLUTION",
  },

  // SOUND
  master_volume: {
    en: "MASTER VOLUME",
    es: "VOLUMEN PRINCIPAL",
    fr: "VOLUME PRINCIPAL",
  },
  sound_volume: {
    en: "SOUND VOLUME",
    es: "SONIDO",
    fr: "DU SON",
  },
  music_volume: {
    en: "MUSIC VOLUME",
    es: "MÚSICA",
    fr: "MUSIQUE",
  },

  // GAMEPLAY
  game_speed: {
    en: "GAME SPEED",
    es: "VELOCIDAD DEL JUEGO",
    fr: "VITESSE DE JEU",
  },
  screenshake: {
    en: "SCREEN SHAKE",
    es: "MOVIMIENTO DE PANTALLA",
    fr: "SECOUEMENT D'ÉCRAN",
  },
  invincible_mode: {
    en: "INVINCIBLE MODE",
    es: "MODO INVENCIBLE",
    fr: "MODE INVINCIBLE",
  },

  // LANGUAGE
  select_language: {
    en: "SELECT LANGUAGE",
    es: "SELECCIONE EL IDIOMA",
    fr: "CHOISIR LA LANGUE",
  },

  // DATA
  progress: {
    en: "PROGRESS",
    es: "PROGRESO",
    fr: "LE PROGRÈS",
  },
  delete_data: {
    en: "DELETE DATA?",
    es: "¿BORRAR DATOS?",
    fr: "SUPRIMMER LES DONNÉES?",
  },

  // CONTROLS
  presets: {
    en: "PRESETS",
    es: "PREESTABLECIDA",
    fr: "PRÉCONFIGURATIONS",
  },
  custom: {
    en: "CUSTOM",
    es: "DISFRAZ",
    fr: "DOUANE",
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
