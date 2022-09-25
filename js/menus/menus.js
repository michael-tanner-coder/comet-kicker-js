// TODO: add option labels to language content
// TODO: use localstorage + global state to preserve selected options in menu

// MENU INPUTS
const INPUT_TYPES = {
  button: "button",
  select: "select",
  label: "label",
  text: "text",
};
const INPUT = {
  x: 0,
  y: 0,
  width: 64,
  height: 16,
  fontColor: WHITE,
  fontSize: 8,
  backgroundColor: PURPLE,
  padding: 4,
  handler: () => {},
};
const BUTTON = {
  ...INPUT,
  text: "Test button",
  type: INPUT_TYPES.button,
  onSelect: () => {
    console.log("selected button");
  },
};
const SELECT = {
  ...INPUT,
  text: "Test select",
  type: INPUT_TYPES.select,
  currentOption: 0,
  options: [
    { label: "test option 1", value: 1 },
    { label: "test option 2", value: 2 },
    { label: "test option 3", value: 2 },
    { label: "test option 4", value: 2 },
    { label: "test option 5", value: 2 },
  ],
  onChange: () => {
    console.log("changed option");
  },
};

const TEXT = {
  ...INPUT,
  text: "Test text",
  type: INPUT_TYPES.text,
};

// MENU PROTOTYPE
const MENU = {
  id: "menu",
  header: "Test header",
  cursor: 0,
  elements: [],
  boundary: { x: GAME_W / 4, y: GAME_H / 4, width: 160, height: 128 },
  backgroundColor: PURPLE,
  padding: 12,
  verticalSpacing: 12,
};

// GLOBAL STATE FOR MENU STACK
const MENUS = [];
const MENU_STACK = [];
const POINTER = { x: 0, y: 0, sprite: "shield", time: 0, w: 8, h: 8 };

// FUNCTIONS
const renderMenu = (menu) => {
  // Header
  context.fillStyle = WHITE;
  drawCenteredText(menu.header, menu.boundary.y - 32);

  // Elements
  menu.elements.forEach((element, i) => {
    //  Coordinates
    element.x = menu.boundary.x + menu.padding;
    element.y =
      menu.boundary.y +
      menu.padding +
      element.height * i +
      menu.verticalSpacing * i;

    //   Dimensions
    let measureText = context.measureText(element.text);
    element.width = measureText.width + element.padding;

    //   Cursor selection
    if (menu.cursor === i) {
      // Pointer
      POINTER.x = element.x - POINTER.w * 2;
      POINTER.y = element.y;
      context.fillStyle = PINK;
      if (element.type !== INPUT_TYPES.select) {
        element.fontSize = easingWithRate(element.fontSize, 16, 0.4);
        context.font = element.fontSize + "px PressStart2P";
      }
      context.fillText(
        element.text,
        element.x + element.padding / 2,
        element.y + element.height / 2 + element.padding + 1
      );
    } else {
      element.fontSize = easing(element.fontSize, 8);
    }

    //   Render input
    context.fillStyle = element.fontColor;
    context.fillText(
      element.text,
      element.x + element.padding / 2,
      element.y + element.height / 2 + element.padding
    );
    context.font = "8px PressStart2P";

    if (element.type === INPUT_TYPES.select) {
      // Render options for the select input
      context.fillStyle = element.fontColor;
      context.fillText(
        `< ${element.options[element.currentOption].label} >`,
        element.x + element.width + element.padding / 2,
        element.y + element.height / 2 + element.padding
      );
    }
  });

  // POINTER
  assignId(POINTER);
  POINTER.y = POINTER.y + Math.sin(POINTER.time * 0.15) * 6;
  POINTER.time += 1;
  POINTER.y = Math.floor(POINTER.y);
  drawTrail(POINTER);
  context.drawImage(IMAGES[POINTER.sprite], POINTER.x - 1, POINTER.y);
  storePreviousPosition(POINTER);

  // Footer
  if (menu.id !== "mainMenu") {
    context.fillStyle = WHITE;
    context.fillText("Space = go back", 16, 16);
  }
};

const goToMenu = (menu_id) => {
  const NEXT_MENU = MENUS.find((menu) => menu.id === menu_id);
  MENU_STACK.push(NEXT_MENU);
};

const goBack = () => {
  if (MENU_STACK.length > 1) {
    MENU_STACK.pop();
  }
};

const createMenu = (props = {}) => {
  const NEW_MENU = { ...MENU, ...props };
  NEW_MENU.elements.forEach((element) => {
    element.handler = () => {
      if (element.type == INPUT_TYPES.button) {
        element.onSelect(element);
      }

      if (element.type == INPUT_TYPES.select) {
        element.onChange(element);
      }
    };
  });
  MENUS.push(NEW_MENU);
};

const getCurrentMenu = () => {
  return MENU_STACK[MENU_STACK.length - 1];
};

const getCurrentMenuElement = () => {
  const current_menu = getCurrentMenu();
  return current_menu.elements[current_menu.cursor];
};

const getMenu = (menu_id) => {
  return MENUS.find((menu) => menu.id === menu_id);
};

const moveCursor = (menu, amount) => {
  menu.cursor = loopClamp(menu.cursor + amount, 0, menu.elements.length - 1);
};

const changeOptions = (select, amount) => {
  select.currentOption = loopClamp(
    select.currentOption + amount,
    0,
    select.options.length - 1
  );
};

const addOptionRange = (select_element, range_min, range_max) => {
  select_element.options = [];
  for (let i = range_min; i <= range_max; i++) {
    select_element.options.push({ label: i.toString(), value: i });
  }
};

// =====
// MENU HIERARCHY
// =====
// MAIN
// -- START GAME
// -- -- TUTORIAL
// -- -- PICK LEVEL
// -- OPTIONS
// -- -- GRAPHICS
// -- -- -- FULLSCREEN
// -- -- -- RESOLUTION
// -- -- SOUNDS
// -- -- -- MASTER VOLUME
// -- -- -- MUSIC VOLUME
// -- -- -- SFX VOLUME
// -- -- LANGUAGE
// -- -- -- ENGLISH
// -- -- -- SPANISH
// -- -- -- FRENCH
// -- -- GAMEPLAY
// -- -- -- SCREENSHAKE
// -- -- -- INVINCIBLE MODE
// -- -- -- GAME SPEED
// -- -- SCORES/DATA
// -- -- -- HIGH SCORES
// -- -- -- AVERAGE SCORE
// -- -- -- PROGRESS
// -- -- -- DELETE DATA
// -- -- -- -- ARE YOU SURE? Y/N
// -- -- CONTROLS
// -- -- -- PRESETS
// -- -- -- CUSTOM
// -- CREDITS

// MENUS
// main
createMenu({
  id: "mainMenu",
  header: "COMET KICKER",
  elements: [
    {
      ...BUTTON,
      text: "START GAME",
      onSelect: () => {
        game_state = STATES.GAME;
      },
    },
    {
      ...BUTTON,
      text: "HIGH SCORES",
      onSelect: () => goToMenu("highScoreMenu"),
    },
    { ...BUTTON, text: "OPTIONS", onSelect: () => goToMenu("optionsMenu") },
    { ...BUTTON, text: "CREDITS", onSelect: () => goToMenu("creditsMenu") },
  ],
});

// options
createMenu({
  id: "optionsMenu",
  header: "OPTIONS",
  elements: [
    { ...BUTTON, text: "GRAPHICS", onSelect: () => goToMenu("graphicsMenu") },
    { ...BUTTON, text: "SOUND", onSelect: () => goToMenu("soundMenu") },
    { ...BUTTON, text: "GAMEPLAY", onSelect: () => goToMenu("gameplayMenu") },
    { ...BUTTON, text: "LANGUAGE", onSelect: () => goToMenu("languageMenu") },
    { ...BUTTON, text: "DATA", onSelect: () => goToMenu("dataMenu") },
    { ...BUTTON, text: "CONTROLS", onSelect: () => goToMenu("controlsMenu") },
  ],
});

// credits
createMenu({
  id: "creditsMenu",
  header: "CREDITS",
  elements: [
    { ...BUTTON, text: "PLACEHOLDER", onSelect: () => {} },
    { ...BUTTON, text: "PLACEHOLDER", onSelect: () => {} },
    { ...BUTTON, text: "PLACEHOLDER", onSelect: () => {} },
  ],
});

// graphics
createMenu({
  id: "graphicsMenu",
  header: "GRAPHICS",
  elements: [
    { ...SELECT, text: "FULLSCREEN" },
    { ...SELECT, text: "RESOLUTION" },
  ],
});

// sound
const MASTER_VOLUME_OPTION = {
  ...SELECT,
  text: "MASTER VOLUME",
};
addOptionRange(MASTER_VOLUME_OPTION, 0, 10);

const MUSIC_VOLUME_OPTION = {
  ...SELECT,
  text: "MUSIC VOLUME",
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setMusicVolume(currentOption.value);
  },
};
addOptionRange(MUSIC_VOLUME_OPTION, 0, 10);

const SFX_VOLUME_OPTION = {
  ...SELECT,
  text: "SFX VOLUME",
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setSoundEffectVolume(currentOption.value);
  },
};
addOptionRange(SFX_VOLUME_OPTION, 0, 10);

createMenu({
  id: "soundMenu",
  header: "SOUND",
  elements: [MASTER_VOLUME_OPTION, MUSIC_VOLUME_OPTION, SFX_VOLUME_OPTION],
});

// language
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

createMenu({
  id: "gameplayMenu",
  header: "GAMEPLAY",
  elements: [
    {
      ...SELECT,
      text: "SCREENSHAKE",
    },
    {
      ...SELECT,
      text: "INVINCIBLE MODE",
    },
    {
      ...SELECT,
      text: "GAME SPEED",
    },
  ],
});

// score
createMenu({
  id: "dataMenu",
  header: "DATA",
  elements: [
    {
      ...BUTTON,
      text: "AVERAGE SCORE",
      onSelect: () => {},
    },
    { ...BUTTON, text: "PROGRESS", onSelect: () => {} },
    {
      ...BUTTON,
      text: "DELETE DATA?",
      onSelect: () => {},
    },
  ],
});

// high scores
const scores = JSON.parse(localStorage.getItem("high_scores"));
console.log("HIGH SCORE LIST");
console.log(scores);
const score_list = [];
scores.forEach((score, i) => {
  let score_text = i + 1 + ". " + Math.floor(score);
  let new_text = { ...TEXT };
  new_text.text = score_text;
  score_list.push(new_text);
});
createMenu({
  id: "highScoreMenu",
  header: "HIGH SCORES",
  elements: [...score_list],
});

// controls
createMenu({
  id: "controlsMenu",
  header: "CONTROLS",
  elements: [
    { ...SELECT, text: "PRESETS", onSelect: () => {} },
    { ...SELECT, text: "CUSTOM", onSelect: () => {} },
  ],
});

MENU_STACK.push(getMenu("mainMenu"));
