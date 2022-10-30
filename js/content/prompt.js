const PROMPT = {
  x: GAME_W / 2,
  y: GAME_H,
  w: 0,
  h: 32,
  color: WHITE,
  text: "SHOOT: ",
  controls: ["shoot", "moveUp", "moveDown"],
};

// CONTROL PROMPTS
const SHOOT_PROMPT = {
  ...PROMPT,
  text: "SHOOT: ",
  controls: ["shoot"],
};
const SHORT_JUMP_PROMPT = {
  ...PROMPT,
  text: "SHORT JUMP (tap): ",
  controls: ["jump"],
};
const LONG_JUMP_PROMPT = {
  ...PROMPT,
  text: "LONG JUMP (hold): ",
  controls: ["jump"],
};
const MOVE_LEFT_PROMPT = {
  ...PROMPT,
  text: "MOVE LEFT: ",
  controls: ["moveLeft"],
};
const MOVE_RIGHT_PROMPT = {
  ...PROMPT,
  text: "MOVE RIGHT: ",
  controls: ["moveRight"],
};
const SHOOT_UP_PROMPT = {
  ...PROMPT,
  text: "SHOOT UP: ",
  controls: ["shoot", "moveUp"],
};
const SHOOT_DOWN_PROMPT = {
  ...PROMPT,
  text: "SHOOT UP: ",
  controls: ["shoot", "moveDown"],
};

const drawPrompt = (prompt) => {
  prompt.w = context.measureText(prompt.text).width;
  prompt.x = GAME_W / 2 - prompt.w / 2;
  prompt.y = GAME_H - prompt.h + 22;

  prompt.x = Math.floor(prompt.x);
  prompt.y = Math.floor(prompt.y);

  context.fillStyle = "#00000088";
  context.fillRect(0, GAME_H - prompt.h, GAME_W, prompt.h);

  context.fillStyle = prompt.color;
  context.fillText(prompt.text, prompt.x, prompt.y);

  prompt.controls.forEach((control, i) => {
    playAnimation(
      getInputAnimation(CONTROLS[control]),
      1,
      prompt.x + prompt.w + 32 * i,
      prompt.y - 12
    );
    if (i !== prompt.controls.length - 1) {
      context.fillText("+", prompt.x + prompt.w + 32 * i + 20, prompt.y);
    }
  });
};
