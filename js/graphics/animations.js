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
  playerIdle: {
    sprite: "player_sheet",
    frames: [
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 32, y: 0, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  playerRun: {
    sprite: "player_sheet",
    frames: [
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 16, y: 16, w: 16, h: 16 },
      { x: 32, y: 16, w: 16, h: 16 },
      { x: 48, y: 16, w: 16, h: 16 },
      { x: 16, y: 32, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  playerKick: {
    sprite: "player_sheet",
    frames: [{ x: 0, y: 32, w: 16, h: 16 }],
    current_frame: 0,
  },
  playerLose: {
    sprite: "player_sheet",
    frames: [{ x: 0, y: 48, w: 16, h: 16 }],
    current_frame: 0,
  },

  // SHOOTING ANIMATIONS
  shoot: {
    sprite: "shot",
    frames: [{ x: 0, y: 0, w: 22, h: 17 }],
    current_frame: 0,
  },
  wideShoot: {
    sprite: "wide_shot",
    frames: [{ x: 0, y: 0, w: 32, h: 32 }],
    current_frame: 0,
  },

  // ENEMY ANIMATIONS
  enemyMoveRight: {
    sprite: "enemy_sheet",
    frames: [
      // start
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },
      { x: 0, y: 0, w: 16, h: 16 },

      // middle
      { x: 16, y: 0, w: 16, h: 16 },
      { x: 32, y: 0, w: 16, h: 16 },

      // end
      { x: 48, y: 0, w: 16, h: 16 },
      { x: 48, y: 0, w: 16, h: 16 },
      { x: 48, y: 0, w: 16, h: 16 },
      { x: 48, y: 0, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  enemyMoveLeft: {
    sprite: "enemy_sheet",
    frames: [
      // start
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },
      { x: 0, y: 16, w: 16, h: 16 },

      // middle
      { x: 16, y: 16, w: 16, h: 16 },
      { x: 32, y: 16, w: 16, h: 16 },

      // end
      { x: 48, y: 16, w: 16, h: 16 },
      { x: 48, y: 16, w: 16, h: 16 },
      { x: 48, y: 16, w: 16, h: 16 },
      { x: 48, y: 16, w: 16, h: 16 },
    ],
    current_frame: 0,
  },
  rollingEnemyMoveRight: {},
  rollingEnemyMoveLeft: {},
  bouncingEnemyMoveLeft: {},
  bouncingEnemyMoveLeft: {},
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
