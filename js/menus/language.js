const LANGUAGE_SELECT = new Select({
  text: "SELECT LANGUAGE",
  key: "select_language",
  options: [
    { label: getText("english"), value: "en" },
    { label: getText("spanish"), value: "es" },
    { label: getText("french"), value: "fr" },
    { label: getText("french"), value: "ch" },
  ],
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    current_language = currentOption.value;
  },
});

const ENGLISH = new Button({
  text: "ENGLISH",
  key: "english",
  onSelect: (input) => {
    current_language = "en";
    localStorage.setItem("current_language", current_language);
  },
});
const SPANISH = new Button({
  text: "SPANISH",
  key: "spanish",
  onSelect: (input) => {
    current_language = "es";
    localStorage.setItem("current_language", current_language);
  },
});
const FRENCH = new Button({
  text: "FRENCH",
  key: "french",
  onSelect: (input) => {
    current_language = "fr";
    localStorage.setItem("current_language", current_language);
  },
});
const CHINESE = new Button({
  text: "CHINESE",
  key: "chinese",
  onSelect: (input) => {
    current_language = "zh";
    localStorage.setItem("current_language", current_language);
  },
});
createMenu({
  key: "language",
  id: "languageMenu",
  header: "LANGUAGE",
  elements: [ENGLISH, SPANISH, FRENCH, CHINESE],
});
