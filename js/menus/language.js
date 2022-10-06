const LANGUAGE_SELECT = new Select({
  text: "SELECT LANGUAGE",
  options: [
    { label: getText("english"), value: "en" },
    { label: getText("spanish"), value: "es" },
    { label: getText("french"), value: "fr" },
  ],
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    current_language = currentOption.value;
  },
});
createMenu({
  id: "languageMenu",
  header: "LANGUAGE",
  elements: [LANGUAGE_SELECT],
});
