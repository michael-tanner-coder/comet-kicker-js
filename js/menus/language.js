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
  },
});
const SPANISH = new Button({
  text: "SPANISH",
  key: "spanish",
  onSelect: (input) => {
    current_language = "es";
  },
});
const FRENCH = new Button({
  text: "FRENCH",
  key: "french",
  onSelect: (input) => {
    current_language = "fr";
  },
});
const CHINESE = new Button({
  text: "CHINESE",
  key: "chinese",
  onSelect: (input) => {
    current_language = "ch";
  },
});
createMenu({
  key: "language",
  id: "languageMenu",
  header: "LANGUAGE",
  elements: [ENGLISH, SPANISH, FRENCH, CHINESE],
});
