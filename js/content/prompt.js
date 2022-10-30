const PROMPT = {
  x: 0,
  y: GAME_H + 32,
  w: 0,
  h: 32,
  color: WHITE,
  text: "SHOOT: ",
  controls: ["shoot", "moveUp", "moveDown"],
  ready: false,
};

const MOTIVATIONS = ["Nice!", "Great!", "Go get 'em!", "Got it!"];

// TUTORIAL PROMPTS
const SHOOT_PROMPT = {
  ...PROMPT,
  text: "KICK: ",
  controls: ["shoot"],
};
const JUMP_PROMPT = {
  ...PROMPT,
  text: "JUMP: ",
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
  text: "KICK UP: ",
  controls: ["shoot", "moveUp"],
};
const SHOOT_DOWN_PROMPT = {
  ...PROMPT,
  text: "KICK DOWN: ",
  controls: ["shoot", "moveDown"],
};

const PROMPTS = [
  // Movement
  MOVE_LEFT_PROMPT,
  MOVE_RIGHT_PROMPT,

  // Shooting
  SHOOT_PROMPT,
  SHOOT_UP_PROMPT,
  SHOOT_DOWN_PROMPT,

  // Jumping
  JUMP_PROMPT,
];
var tutorial_index = 0;

const drawPrompt = (prompt) => {
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

const updatePrompt = (prompt) => {
  prompt.w = context.measureText(prompt.text).width;

  if (!prompt.ready) {
    prompt.x = GAME_W / 2 - prompt.w / 2;
    let target_y = GAME_H - prompt.h + 22;
    prompt.y = prompt.y = easing(prompt.y, target_y);

    if (Math.abs(prompt.y - target_y) < 0.01) {
      prompt.ready = true;
    }
    prompt.x = Math.floor(prompt.x);
    prompt.y = Math.floor(prompt.y);
    return;
  }

  let all_pressed = true;

  prompt.controls.forEach((control) => {
    if (!onHold(CONTROLS[control])) {
      all_pressed = false;
    }
  });

  if (all_pressed) {
    tutorial_index += 1;
    let text_object = spawnObject(TEXT_OBJECT, PLAYER.x, PLAYER.y);
    text_object.text = choose(MOTIVATIONS);
    playSoundEffect("heal_hp");
    if (tutorial_index > PROMPTS.length - 1) {
      finished_tutorial = true;
      localStorage.setItem("finished_tutorial", finished_tutorial);
    }
  }

  prompt.x = Math.floor(prompt.x);
  prompt.y = Math.floor(prompt.y);
};
