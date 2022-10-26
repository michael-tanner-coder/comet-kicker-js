const ANIMATIONS = {
  // UI ANIMATIONS
  // face buttons
  buttonBlank: {
    sprite: "controls",
    frames: [{ x: 0, y: 0, w: 15, h: 15 }],
    current_frame: 0,
  },
  buttonA: {
    sprite: "controls",
    frames: [{ x: 16, y: 0, w: 15, h: 15 }],
    current_frame: 0,
  },
  buttonB: {
    sprite: "controls",
    frames: [{ x: 32, y: 0, w: 15, h: 15 }],
    current_frame: 0,
  },
  buttonX: {
    sprite: "controls",
    frames: [{ x: 48, y: 0, w: 15, h: 15 }],
    current_frame: 0,
  },
  buttonY: {
    sprite: "controls",
    frames: [{ x: 64, y: 0, w: 15, h: 15 }],
    current_frame: 0,
  },
  // dpad
  dpadBlank: {
    sprite: "controls",
    frames: [{ x: 80, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  dpadUp: {
    sprite: "controls",
    frames: [{ x: 112, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  dpadRight: {
    sprite: "controls",
    frames: [{ x: 144, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  dpadDown: {
    sprite: "controls",
    frames: [{ x: 176, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  dpadLeft: {
    sprite: "controls",
    frames: [{ x: 208, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  // control sticks
  up: {
    sprite: "controls",
    frames: [{ x: 112, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  right: {
    sprite: "controls",
    frames: [{ x: 144, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  down: {
    sprite: "controls",
    frames: [{ x: 176, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  left: {
    sprite: "controls",
    frames: [{ x: 208, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  upTwo: {
    sprite: "controls",
    frames: [{ x: 112, y: 64, w: 32, h: 32 }],
    current_frame: 0,
  },
  rightTwo: {
    sprite: "controls",
    frames: [{ x: 144, y: 64, w: 32, h: 32 }],
    current_frame: 0,
  },
  downTwo: {
    sprite: "controls",
    frames: [{ x: 176, y: 64, w: 32, h: 32 }],
    current_frame: 0,
  },
  leftTwo: {
    sprite: "controls",
    frames: [{ x: 208, y: 64, w: 32, h: 32 }],
    current_frame: 0,
  },

  // bumpers/triggers
  leftTrigger: {
    sprite: "controls",
    frames: [{ x: 0, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  leftShoulder: {
    sprite: "controls",
    frames: [{ x: 16, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  rightShoulder: {
    sprite: "controls",
    frames: [{ x: 32, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  rightTrigger: {
    sprite: "controls",
    frames: [{ x: 48, y: 32, w: 32, h: 32 }],
    current_frame: 0,
  },
  // arrow keys
  ArrowLeft: {
    sprite: "controls",
    frames: [{ x: 320, y: 0, w: 16, h: 16 }],
    current_frame: 0,
  },
  ArrowUp: {
    sprite: "controls",
    frames: [{ x: 336, y: 0, w: 16, h: 16 }],
    current_frame: 0,
  },
  ArrowDown: {
    sprite: "controls",
    frames: [{ x: 352, y: 0, w: 16, h: 16 }],
    current_frame: 0,
  },
  ArrowRight: {
    sprite: "controls",
    frames: [{ x: 368, y: 0, w: 16, h: 16 }],
    current_frame: 0,
  },
  // letter keys
  a: {
    sprite: "controls",
    frames: [{ x: 320, y: 16, w: 16, h: 16 }],
    current_frame: 0,
  },
  b: {
    sprite: "controls",
    frames: [{ x: 336, y: 16, w: 16, h: 16 }],
    current_frame: 0,
  },
  c: {
    sprite: "controls",
    frames: [{ x: 352, y: 16, w: 16, h: 16 }],
    current_frame: 0,
  },
  d: {
    sprite: "controls",
    frames: [{ x: 368, y: 16, w: 16, h: 16 }],
    current_frame: 0,
  },
  e: {
    sprite: "controls",
    frames: [{ x: 320, y: 32, w: 16, h: 16 }],
    current_frame: 0,
  },
  f: {
    sprite: "controls",
    frames: [{ x: 336, y: 32, w: 16, h: 16 }],
    current_frame: 0,
  },
  g: {
    sprite: "controls",
    frames: [{ x: 352, y: 32, w: 16, h: 16 }],
    current_frame: 0,
  },
  h: {
    sprite: "controls",
    frames: [{ x: 368, y: 32, w: 16, h: 16 }],
    current_frame: 0,
  },
  i: {
    sprite: "controls",
    frames: [{ x: 320, y: 48, w: 16, h: 16 }],
    current_frame: 0,
  },
  j: {
    sprite: "controls",
    frames: [{ x: 336, y: 48, w: 16, h: 16 }],
    current_frame: 0,
  },
  k: {
    sprite: "controls",
    frames: [{ x: 352, y: 48, w: 16, h: 16 }],
    current_frame: 0,
  },
  l: {
    sprite: "controls",
    frames: [{ x: 368, y: 48, w: 16, h: 16 }],
    current_frame: 0,
  },
  m: {
    sprite: "controls",
    frames: [{ x: 320, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  n: {
    sprite: "controls",
    frames: [{ x: 336, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  o: {
    sprite: "controls",
    frames: [{ x: 352, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  p: {
    sprite: "controls",
    frames: [{ x: 368, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  q: {
    sprite: "controls",
    frames: [{ x: 320, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },
  r: {
    sprite: "controls",
    frames: [{ x: 336, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },
  s: {
    sprite: "controls",
    frames: [{ x: 352, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },
  t: {
    sprite: "controls",
    frames: [{ x: 368, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },
  u: {
    sprite: "controls",
    frames: [{ x: 320, y: 96, w: 16, h: 16 }],
    current_frame: 0,
  },
  v: {
    sprite: "controls",
    frames: [{ x: 336, y: 96, w: 16, h: 16 }],
    current_frame: 0,
  },
  w: {
    sprite: "controls",
    frames: [{ x: 352, y: 96, w: 16, h: 16 }],
    current_frame: 0,
  },
  x: {
    sprite: "controls",
    frames: [{ x: 368, y: 96, w: 16, h: 16 }],
    current_frame: 0,
  },
  y: {
    sprite: "controls",
    frames: [{ x: 320, y: 112, w: 16, h: 16 }],
    current_frame: 0,
  },
  z: {
    sprite: "controls",
    frames: [{ x: 336, y: 112, w: 16, h: 16 }],
    current_frame: 0,
  },

  // misc
  Escape: {
    sprite: "controls",
    frames: [{ x: 352, y: 112, w: 16, h: 16 }],
    current_frame: 0,
  },
  [" "]: {
    sprite: "controls",
    frames: [{ x: 368, y: 112, w: 32, h: 16 }],
    current_frame: 0,
  },

  // PLAYER ANIMATIONS
  // idle
  playerIdleRight: {
    sprite: "player_sheet",
    frames: [
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 32, y: 0, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  playerIdleLeft: {
    sprite: "player_sheet",
    frames: [
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 32, y: 16, w: 16, h: 16 },
    ],
    current_frame: 0,
  },

  // move
  playerRunningRight: {
    sprite: "player_sheet",
    frames: [
      { x: 0, y: 32, w: 16, h: 16 },
      { x: 16, y: 32, w: 16, h: 16 },
      { x: 32, y: 32, w: 16, h: 16 },
      { x: 48, y: 32, w: 16, h: 16 },
      { x: 16, y: 32, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  playerRunningLeft: {
    sprite: "player_sheet",
    frames: [
      { x: 0, y: 48, w: 16, h: 16 },
      { x: 16, y: 48, w: 16, h: 16 },
      { x: 32, y: 48, w: 16, h: 16 },
      { x: 48, y: 48, w: 16, h: 16 },
      { x: 16, y: 48, w: 16, h: 16 },
    ],
    current_frame: 0,
  },

  // kick
  playerKickingRight: {
    sprite: "player_sheet",
    frames: [{ x: 0, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  playerKickingLeft: {
    sprite: "player_sheet",
    frames: [{ x: 16, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  playerKickingUp: {
    sprite: "player_sheet",
    frames: [{ x: 32, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },
  playerKickingDown: {
    sprite: "player_sheet",
    frames: [{ x: 48, y: 64, w: 16, h: 16 }],
    current_frame: 0,
  },

  // take damage
  playerHitRight: {
    sprite: "player_sheet",
    frames: [{ x: 16, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },
  playerHitLeft: {
    sprite: "player_sheet",
    frames: [{ x: 32, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },
  playerLose: {
    sprite: "player_sheet",
    frames: [{ x: 0, y: 80, w: 16, h: 16 }],
    current_frame: 0,
  },

  // SHOOTING ANIMATIONS
  // normal shot
  normalShotMoveRight: {
    sprite: "shot",
    frames: [{ x: 0, y: 0, w: 16, h: 22 }],
    current_frame: 0,
  },
  normalShotMoveLeft: {
    sprite: "shot",
    frames: [{ x: 16, y: 0, w: 16, h: 22 }],
    current_frame: 0,
  },
  normalShotMoveDown: {
    sprite: "shot",
    frames: [{ x: 32, y: 0, w: 16, h: 16 }],
    current_frame: 0,
  },
  normalShotMoveUp: {
    sprite: "shot",
    frames: [{ x: 48, y: 0, w: 16, h: 16 }],
    current_frame: 0,
  },

  // wide shot
  wideShotMoveRight: {
    sprite: "wide_shot",
    frames: [{ x: 0, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  wideShotMoveLeft: {
    sprite: "wide_shot",
    frames: [{ x: 32, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  wideShotMoveDown: {
    sprite: "wide_shot",
    frames: [{ x: 64, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },
  wideShotMoveUp: {
    sprite: "wide_shot",
    frames: [{ x: 96, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },

  // missile shot
  missileMoveUp: {
    sprite: "missile",
    frames: [{ x: 0, y: 0, w: 16, h: 32 }],
    current_frame: 0,
  },
  missileMoveDown: {
    sprite: "missile",
    frames: [{ x: 16, y: 0, w: 16, h: 32 }],
    current_frame: 0,
  },
  missileMoveLeft: {
    sprite: "missile",
    frames: [{ x: 32, y: 16, w: 32, h: 16 }],
    current_frame: 0,
  },
  missileMoveRight: {
    sprite: "missile",
    frames: [{ x: 32, y: 0, w: 32, h: 16 }],
    current_frame: 0,
  },

  // ENEMY ANIMATIONS
  // basic enemy
  enemyMoveRight: {
    sprite: "enemy_sheet",
    frames: [
      // start
      { x: 0, y: 0, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  enemyMoveLeft: {
    sprite: "enemy_sheet",
    frames: [
      // start
      { x: 0, y: 16, w: 16, h: 16 },
    ],
    current_frame: 0,
  },

  // rolling enemy
  rollingEnemyMoveRight: {
    sprite: "rolling_enemy",
    frames: [
      // start
      { x: 0, y: 0, w: 32, h: 32 },
    ],
    current_frame: 0,
  },
  rollingEnemyMoveLeft: {
    sprite: "rolling_enemy",
    frames: [
      // start
      { x: 0, y: 32, w: 32, h: 32 },
    ],
    current_frame: 0,
  },

  // bouncing enemy
  bouncingEnemyMoveRight: {
    sprite: "bouncing_enemy",
    frames: [
      // start
      { x: 0, y: 0, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  bouncingEnemyMoveLeft: {
    sprite: "bouncing_enemy",
    frames: [
      // start
      { x: 0, y: 16, w: 16, h: 16 },
    ],
    current_frame: 0,
  },

  // exploding enemy
  explodingEnemyMoveDown: {
    sprite: "exploding_enemy",
    frames: [
      // start
      { x: 0, y: 0, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
};

const playAnimation = (animation, speed, x, y, w_scale = 1, h_scale = 1) => {
  const anim = animation;
  const frame_index = Math.floor(anim.current_frame);
  const frame = anim.frames[frame_index];

  // Render current animation frame
  if (anim) {
    context.drawImage(
      // Sprite
      IMAGES[anim.sprite],

      // Source
      frame.x,
      frame.y,
      frame.w,
      frame.h,

      // Destination
      x,
      y,
      frame.w * w_scale,
      frame.h * h_scale
    );

    // Prevent frame index from going out of bounds
    anim.current_frame += speed * 0.01;
    if (Math.floor(anim.current_frame) > anim.frames.length - 1) {
      anim.current_frame = 0;
    }
  }
};
