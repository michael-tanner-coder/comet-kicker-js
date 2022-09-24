// PLAYER
const PLAYER_DEFAULT = {
  type: "player",

  // position/dimensions
  x: 0,
  y: 0,
  prev_x: 0,
  prev_y: 0,
  w: 16,
  h: 16,

  // colors
  color: WHITE,

  // movement
  speed: 0,
  max_speed: 5,
  direction: 0,
  has_gravity: true,

  // collision
  hit_ground: false,
  hit_ground_last_frame: false,
  hit_wall: false,
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "red" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "red" },
  ],
  render_hitbox: false,

  // physics
  x_velocity: 0,
  y_velocity: 0,
  max_x_velocity: 8,
  max_y_velocity: 8,

  // health/take damage
  i_frames: 30,
  hit: false,
  hp: MAX_HP,

  // powerups
  powerup: "",
  bullet_type: "",

  // animation/vfx
  animation: ANIMATIONS.playerIdle,
  animation_speed: 6,
  state: PLAYER_STATES.IDLE,
  has_trail: false,

  // jump
  jump_height: 0,
  max_jump_height: 128,
  hang_time: 30,
  jumping: false,
  coyote_time: 1,
  coyote_time_counter: 0,

  // shooting/kicking
  shot_timer: 0,
  shot_fired: false,
  kicking: false,
  kick_time: 15,
};

const PLAYER = { ...PLAYER_DEFAULT };

// PLATFORM BLOCKS
const BLOCK = {
  x: 0,
  y: 0,
  color: "blue",
  w: UNIT_SIZE,
  h: UNIT_SIZE,
  type: "floor",
  sprite: "platform",
};

// PROJECTILES
const BULLET = {
  type: "bullet",
  w: 8,
  h: 8,
  x: 0,
  y: 0,
  color: "yellow",
  direction: 0,
  speed: 6,
  animation: ANIMATIONS.shoot,
  has_trail: true,
  render_hitbox: false,
  recoil: 5,
};

const WIDE_BULLET = {
  ...BULLET,
  h: 24,
  recoil: 8,
  animation: ANIMATIONS.wideShoot,
};

const MISSILE_SHOT = {
  ...BULLET,
  x: 0,
  y: 0,
  h: 26,
  w: 16,
  type: "bullet",
  sprite: "missile",
  speed: 2,
  color: YELLOW,
  render_hitbox: true,
  has_trail: true,
  animatiion: undefined,
  recoil: 10,
};

// ENEMIES
const ENEMY = {
  type: "enemy",
  w: 16,
  h: 16,
  x: 0,
  y: 0,
  color: VIOLET,
  direction: 0,
  speed: 2,
  has_gravity: true,
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "blue" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "blue" },
  ],
  hit_ground: false,
  hit_wall: false,
  has_trail: true,
  animation: ANIMATIONS.enemyMove,
  animation_speed: 12,
  movement_direction: "diagnoal",
  spawn_points: [
    { x: 0, y: 3 },
    { x: GAME_W / UNIT_SIZE, y: 3 },
    { x: 0, y: 11 },
  ],
};

const EXPLODING_ENEMY = {
  ...ENEMY,
  animation: undefined,
  sprite: "exploding_enemy",
  movement_direction: "vertical",
  speed: 0.5,
  direction: 90,
  spawn_points: [
    { x: 2, y: 1 },
    { x: 4, y: 1 },
    { x: 6, y: 1 },
    { x: 8, y: 1 },
    { x: 10, y: 1 },
  ],
  exploding: true,
};

// POWERUPS and POINT COLLECTIBLES
const COLLECT = {
  type: "collect",
  w: 32,
  h: 32,
  x: 0,
  y: 0,
  color: "yellow",
  life_timer: 360,
  points: 100,
  pickup: PICKUPS.POINTS,
  render_hitbox: false,
  sprite: "collectible",
};

const ROTATING_SHIELD = {
  x: 0,
  y: 0,
  h: 10,
  w: 10,
  type: "shield",
  sprite: "shield",
  speed: 1,
  color: YELLOW,
  render_hitbox: false,
  has_trail: true,
};

const WIDE_SHOT = { ...COLLECT, pickup: PICKUPS.WIDE_SHOT };
const RAPID_FIRE = { ...COLLECT, pickup: PICKUPS.RAPID_FIRE };
const MISSILE = { ...COLLECT, pickup: PICKUPS.MISSILE };
const SHIELD = { ...COLLECT, pickup: PICKUPS.SHIELD };
const HP = { ...COLLECT, pickup: PICKUPS.HP, sprite: "hp_up" };
const COLLECTIBLES = [COLLECT, HP, SHIELD, MISSILE];

// BACKGROUNDS FOR PARALLAX
const BACKGROUND_1 = {
  x: 0,
  y: 0,
  speed: 1,
};
const BACKGROUND_2 = {
  x: 0,
  y: 0,
  speed: 2,
};
const BACKGROUND_3 = {
  x: 0,
  y: 0,
  speed: 3,
};

const BACKGROUNDS = [BACKGROUND_1, BACKGROUND_2, BACKGROUND_3];

// TEXT
const TEXT_OBJECT = {
  x: 0,
  y: 0,
  h: 8,
  w: 32,
  color: WHITE,
  text: "test",
  type: "text",
  speed: 1,
  alpha: 1,
};
