const LANGUAGE_SELECT = { ...SELECT, text: "SELECT LANGUAGE" };
LANGUAGE_SELECT.options = [
  { label: getText("english"), value: "en" },
  { label: getText("spanish"), value: "es" },
  { label: getText("french"), value: "fr" },
];
createMenu({
  id: "languageMenu",
  header: "LANGUAGE",
  elements: [LANGUAGE_SELECT],
});
