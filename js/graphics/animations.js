const ANIMATIONS = {
  // UI ANIMATIONS
  controllerLoop: {
    sprite: "input_icons",
    frames: [
      { x: 128, y: 16, w: 32, h: 32 },
      { x: 160, y: 16, w: 32, h: 32 },
      { x: 192, y: 16, w: 32, h: 32 },
      { x: 224, y: 16, w: 32, h: 32 },
    ],
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

  // lose
  playerLose: {
    sprite: "player_sheet",
    frames: [{ x: 0, y: 48, w: 16, h: 16 }],
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
