// TODO: add option labels to language content
// TODO: use localstorage + global state to preserve selected options in menu
// TODO: set option values to a default based on localStorage

// Options to finish:
// TODO: show average scores
// TODO: show progress
// TODO: delete data
// TODO: remap controls
// TODO: select presets
// TODO: credits

// GLOBAL STATE FOR MENU STACK
const MENUS = [];
const MENU_STACK = [];
const POINTER = { x: 0, y: 0, sprite: "shield", time: 0, w: 8, h: 8 };

// UTILS
const goToMenu = (menu_id) => {
  const NEXT_MENU = MENUS.find((menu) => menu.id === menu_id);
  NEXT_MENU.refreshMenu();
  MENU_STACK.push(NEXT_MENU);
};

const goBack = () => {
  if (MENU_STACK.length > 1) {
    if(globalCreditsShowHack) {
      globalCreditsShowHack = false;
      console.log("turning off credits display hack");
    }
    MENU_STACK.pop();
  }
};

const createMenu = (props = {}) => {
  const NEW_MENU_PROPS = { ...props };
  const NEW_MENU = new Menu(NEW_MENU_PROPS);
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
  const retrieved_menu = MENUS.find((menu) => menu.id === menu_id);
  retrieved_menu.refreshMenu();
  return retrieved_menu;
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
