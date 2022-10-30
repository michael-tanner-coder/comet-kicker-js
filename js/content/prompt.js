const PROMPT = {
  x: GAME_W / 2,
  y: GAME_H,
  w: 0,
  h: 32,
  color: WHITE,
  text: "SHOOT: ",
  control: "shoot",
};

const drawPrompt = (prompt) => {
  prompt.w = context.measureText(prompt.text).width;
  prompt.x = GAME_W / 2 - prompt.w / 2;
  prompt.y = GAME_H - prompt.h + 16;

  prompt.x = Math.floor(prompt.x);
  prompt.y = Math.floor(prompt.y);

  context.fillStyle = "#00000088";
  context.fillRect(0, GAME_H - prompt.h, GAME_W, prompt.h);

  context.fillStyle = prompt.color;
  context.fillText(prompt.text, prompt.x, prompt.y);

  playAnimation(
    getInputAnimation(CONTROLS[prompt.control]),
    1,
    prompt.x + prompt.w,
    prompt.y - 12
  );
};
