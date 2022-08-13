const INPUT_MAP = {
  // == KEYBOARD ==
  // Arrow keys
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,

  // SPACE
  [" "]: false,

  // MISC KEYS
  Enter: false,
  Escape: false,

  // == GAMEPAD ==
  left: false,
  right: false,
  down: false,
  up: false,
  lookleft: false,
  lookright: false,

  // analog sticks
  leftStick_xAxis: false,
  leftStick_yAxis: false,
  rightStick_xAxis: false,
  rightStick_yAxis: false,

  // buttons
  buttonA: false,
  buttonB: false,
  buttonX: false,
  buttonY: false,
  leftShoulder: false,
  rightShoulder: false,
  leftTrigger: false,
  rightTrigger: false,
  select: false,
  start: false,
  dpadUp: false,
  dpadDown: false,
  dpadLeft: false,
  dpadRight: false,
};

const INPUTS = {
  shoot: [" ", "buttonA"],
  moveLeft: ["ArrowLeft", "dpadLeft", "left"],
  moveRight: ["ArrowRight", "dpadRight", "right"],
  pause: ["Escape", "start"],
  select: ["Enter", "select"],
  start: ["start", "Enter"],
};

function isPressed(inputs) {
  var pressed = false;
  inputs.forEach((input) => {
    if (INPUT_MAP[input]) {
      pressed = true;
    }
  });
  return pressed;
}

window.addEventListener("keydown", function (e) {
  console.log(e);
  if (Object.keys(INPUT_MAP).includes(e.key)) {
    console.log(e.key + " is held");
    INPUT_MAP[e.key] = true;
  }
});

window.addEventListener("keyup", function (e) {
  console.log(e);
  if (Object.keys(INPUT_MAP).includes(e.key)) {
    console.log(e.key + " is lifted");
    INPUT_MAP[e.key] = false;
  }
});
