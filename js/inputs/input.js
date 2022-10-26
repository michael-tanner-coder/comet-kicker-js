// ---Input Constants---
const KEYBOARD_INPUTS = {
  // Arrow keys
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,

  // Letter Keys
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,

  // SPACE
  [" "]: false,

  // MISC KEYS
  Enter: false,
  Escape: false,
};
const GAMEPAD_INPUTS = {
  // left analog stick
  left: false,
  right: false,
  down: false,
  up: false,
  lookleft: false,
  lookright: false,

  // face buttons
  buttonA: false,
  buttonB: false,
  buttonX: false,
  buttonY: false,

  // shoulders/triggers
  leftShoulder: false,
  rightShoulder: false,
  leftTrigger: false,
  rightTrigger: false,

  // d-pad
  dpadUp: false,
  dpadDown: false,
  dpadLeft: false,
  dpadRight: false,

  // misc buttons
  select: false,
  start: false,
};

const INPUTS = {
  // == KEYBOARD ==
  ...KEYBOARD_INPUTS,
  // == GAMEPAD ==
  ...GAMEPAD_INPUTS,
};

const INPUT_STATES = {
  idle: "idle",
  held: "held",
  pressed: "pressed",
  released: "released",
};

const DEFAULT_INPUT_STATE = {
  state: INPUT_STATES.idle,
  timer: 0,
  inputs: [],
};

/**
 * This data structure gets changed in initializeInputState
 * Each element winds up looking like:
 * {
 *   "state": "idle",
 *   "timer": 0,
 *   "inputs": [
 *     "x",
 *     "buttonX",
 *     "c"
 *   ],
 *   "name": "shoot"
 * }
 */
const CONTROLS = {
  shoot: ["x", "buttonX", "c"],
  jump: [" ", "buttonA", "buttonY"],
  moveLeft: ["ArrowLeft", "dpadLeft", "left"],
  moveRight: ["ArrowRight", "dpadRight", "right"],
  moveUp: ["ArrowUp", "dpadUp", "up"],
  moveDown: ["ArrowDown", "dpadDown", "down"],
  pause: ["p", "start"],
  accept: ["x", "buttonA"],
  decline: [" ", "buttonB", "select"],
  autoKill: ["c"],
};

let UNPROCESSED_INPUTS = [];

function initializeInputState() {
  for (let control in CONTROLS) {
    if (localStorage.getItem(control)) {
      CONTROLS[control] = JSON.parse(localStorage.getItem(control));
    }
  }
  const controls = Object.keys(CONTROLS);
  controls.forEach(function (control) {
    const inputs = [...CONTROLS[control]];
    CONTROLS[control] = { ...DEFAULT_INPUT_STATE, inputs, name: control };
  });
}

initializeInputState();

// --- State Checks ---
function wasPressed(inputs) {
  var pressed = false;
  inputs.forEach((input) => {
    if (INPUTS[input]) {
      pressed = true;
    }
  });
  return pressed;
}

function wasReleased(inputs) {
  var released = true;
  inputs.forEach((input) => {
    if (INPUTS[input]) {
      released = false;
    }
  });
  return released;
}

function inputStateMachine(input) {
  // Button states:
  // Idle
  // -- default state
  // -- if activated, go to Pressed state
  // Pressed
  // -- if released, go to Idle state
  // -- If still pressed on next frame, go to Held state
  // Held
  // -- increment hold timer
  // -- if released, go to Idle state. Reset timer.
  switch (input.state) {
    // IDLE
    case INPUT_STATES.idle:
      if (wasPressed(input.inputs)) {
        input.state = INPUT_STATES.pressed;
        UNPROCESSED_INPUTS.push(input);
      }

      break;

    // PRESSED
    case INPUT_STATES.pressed:
      break;

    // HELD
    case INPUT_STATES.held:
      input.timer++;

      if (wasReleased(input.inputs)) {
        input.state = INPUT_STATES.released;
        input.timer = 0;
      }

      break;

    // RELEASED
    case INPUT_STATES.released:
      input.state = INPUT_STATES.idle;

      break;
  }
}

function releaseInputs() {
  UNPROCESSED_INPUTS.forEach((input) => {
    if (wasReleased(input.inputs)) {
      input.state = INPUT_STATES.idle;
    } else {
      input.state = INPUT_STATES.held;
    }
  });
  UNPROCESSED_INPUTS = [];
}

// ---INPUT API---

// Only detects first input
// if (onPress(CONTROLS.myInput)) {
//    (...some logic)
// }
function onPress(input) {
  // detect which device the input came from
  input.inputs.forEach((i) => {
    if (KEYBOARD_INPUTS.hasOwnProperty(i) && INPUTS[i] === true) {
      current_device = "keyboard";
    }

    if (GAMEPAD_INPUTS.hasOwnProperty(i) && INPUTS[i] === true) {
      current_device = "gamepad";
    }
  });

  return input.state === INPUT_STATES.pressed;
}

// Only detects when button is released
// if (onRelease(CONTROLS.myInput)) {
//    (...some logic)
// }
function onRelease(input) {
  if (input.state === INPUT_STATES.released) {
    input.state = INPUT_STATES.idle;
    return true;
  }

  return false;
}

// Returns true for as long as the button is held
// if (onHold(CONTROLS.myInput)) {
//    (...some logic)
// }
function onHold(input) {
  return input.state === INPUT_STATES.held;
}

// -- Remapping ---
function remapInput(control, newInput, index) {
  if (CONTROLS[control]) {
    CONTROLS[control].inputs[index] = newInput;
    localStorage.setItem(control, JSON.stringify(CONTROLS[control].inputs));
  }
}

// ---Listeners---
function keyListener() {
  const input_keys = Object.keys(CONTROLS);
  input_keys.forEach((key) => {
    inputStateMachine(CONTROLS[key]);
  });
}

function gamepadListener() {
  const inputs = Object.keys(GAMEPAD);
  inputs.forEach((input) => {
    if (
      typeof GAMEPAD[input] === "function" &&
      input !== "butt" &&
      input !== "axis"
    ) {
      INPUTS[input] = GAMEPAD[input]() ? true : false;
    }
  });
}

function getCurrentInputDevice() {
  const keyboard_inputs = Object.keys(KEYBOARD_INPUTS);
  const gamepad_inputs = Object.keys(GAMEPAD_INPUTS);

  gamepad_inputs.forEach((input) => {
    if (INPUTS[input]) {
      current_device = "gamepad";
    }
  });

  keyboard_inputs.forEach((input) => {
    if (INPUTS[input]) {
      current_device = "keyboard";
    }
  });
}

function inputListener() {
  gamepadListener();
  keyListener();
}

window.addEventListener("keydown", function (e) {
  console.log(e);
  if (Object.keys(INPUTS).includes(e.key)) {
    console.log(e.key + " is held");
    INPUTS[e.key] = true;
  }
});

window.addEventListener("keyup", function (e) {
  console.log(e);
  if (Object.keys(INPUTS).includes(e.key)) {
    console.log(e.key + " is lifted");
    INPUTS[e.key] = false;
  }
});
