const TEXT_CONTENT = {
  // LANGUAGES
  english: {
    en: "english",
    es: "english",
    fr: "english",
    zh: "english",
  },
  spanish: {
    en: "español",
    es: "español",
    fr: "español",
    zh: "español",
  },
  french: {
    en: "français",
    es: "français",
    fr: "français",
    zh: "français",
  },
  chinese: {
    en: "简体",
    es: "简体",
    fr: "简体",
    zh: "简体",
  },

  // GAME TEXT
  comet_kicker: {
    en: "COMET KICKER",
    es: "COMET KICKER",
    fr: "COMET KICKER",
    zh: "COMET KICKER",
  },
  score: {
    en: "score",
    es: "puntaje",
    fr: "score",
    zh: "分 ",
  },
  average_score: {
    en: "average score",
    es: "puntuación media",
    fr: "score moyen",
    zh: "平均分",
  },
  average: {
    en: "average",
    es: "media",
    fr: "moyen",
    zh: "平均",
  },
  retry: {
    en: "retry",
    es: "rever",
    fr: "recommencez",
    zh: "再试一次",
  },
  quit: {
    en: "quit",
    fr: "quitter",
    es: "abandonar",
    zh: "停",
  },
  press_enter: {
    en: "press enter",
    es: "presiona enter",
    fr: "appuyez sur entrée",
    zh: "按回车键",
  },
  game_paused: {
    en: "paused",
    es: "pausado",
    fr: "pause",
    zh: "暂停",
  },
  press_enter_to_continue: {
    en: "press enter to continue",
    es: "presiona enter para continuar",
    fr: "appuyez sur entrée pour continuer",
    zh: "按回车键",
  },
  game_over: {
    en: "GAME OVER!",
    es: "¡JUEGO TERMINADO!",
    fr: "JEU TERMINÉ!",
    zh: "游戏结束了!",
  },

  // MENUS
  start_game: {
    en: "START GAME",
    es: "EMPEZAR JUEGO",
    fr: "DÉMARRER JEU",
    zh: "开始",
  },
  high_scores: {
    en: "HIGH SCORES",
    es: "PUNTUACIONES ALTAS",
    fr: "SCORES ÉLEVÉS",
    zh: "高分",
  },
  options: {
    en: "OPTIONS",
    es: "OPCIONES",
    fr: "OPTIONS",
    zh: "选单",
  },
  credits: {
    en: "CREDITS",
    es: "CRÉDITOS",
    fr: "CRÉDITS",
    zh: "",
  },
  graphics: {
    en: "GRAPHICS",
    es: "GRÁFICOS",
    fr: "GRAPHIQUE",
    zh: "制图",
  },
  sound: {
    en: "SOUND",
    es: "SONIDO",
    fr: "DU SON",
    zh: "声音",
  },
  gameplay: {
    en: "GAMEPLAY",
    es: "JUEGO",
    fr: "JEU",
    zh: "游戏性",
  },
  language: {
    en: "LANGUAGE",
    es: "IDIOMA",
    fr: "LANGUE",
    zh: "语言",
  },
  data: {
    en: "DATA",
    es: "DATOS",
    fr: "LES DONNÉES",
    zh: "数据",
  },
  controls: {
    en: "CONTROLS",
    es: "CONTROL",
    fr: "LES CONTRÔLES",
    zh: "游戏控制",
  },

  // OPTION VALUES
  on: {
    en: "on",
    es: "en",
    fr: "sur",
    zh: "开",
  },
  off: {
    en: "off",
    es: "apagado",
    fr: "à l'arrêt",
    zh: "关",
  },

  // GRAPHICS
  fullscreen: {
    en: "FULLSCREEN",
    es: "PANTALLA COMPLETA",
    fr: "PLEIN ÉCRAN",
    zh: "",
  },
  resolution: {
    en: "RESOLUTION",
    es: "RESOLUCIÓN",
    fr: "RÉSOLUTION",
    zh: "",
  },

  // SOUND
  master_volume: {
    en: "MASTER VOLUME",
    es: "VOLUMEN PRINCIPAL",
    fr: "VOLUME PRINCIPAL",
    zh: "音量",
  },
  sound_volume: {
    en: "SOUND VOLUME",
    es: "SONIDO",
    fr: "DU SON",
    zh: "声效",
  },
  music_volume: {
    en: "MUSIC VOLUME",
    es: "MÚSICA",
    fr: "MUSIQUE",
    zh: "音乐",
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
