const TEXT = {
  english: {
    en: "english",
    fr: "espagnol",
    es: "english",
  },
  spanish: {
    en: "spanish",
    fr: "spanish",
    es: "español",
  },
  french: {
    en: "french",
    fr: "français",
    es: "francés",
  },
  score: {
    en: "score",
    fr: "score",
    es: "puntaje",
  },
  retry: {
    en: "retry",
    fr: "recommencez",
    es: "rever",
  },
  press_enter: {
    en: "press enter",
    fr: "appuyez sur entrée",
    es: "presiona enter",
  },
};

function getText(text) {
  //   check if the text object exits
  if (!TEXT[text]) {
    // provide error message if the text object does not exist
    console.log("Text not found");

    // return --- to inform dev that text is undefined
    return "---";
  }

  //   check if the text is supported in the current language setting
  if (!TEXT[text][current_language]) {
    console.log("current language not supported for this text");

    // return english as default or return --- to inform dev that text is undefined
    return TEXT[text]["en"]?.toUpperCase() || "---";
  }

  //   if supported, return the text line in the current language
  return TEXT[text][current_language]?.toUpperCase();
}
