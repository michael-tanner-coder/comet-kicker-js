// PLAYER
const PLAYER_DEFAULT = {
  x: 100,
  y: 25,
  color: WHITE,
  w: 16,
  h: 16,
  speed: 0,
  direction: 0,
  has_gravity: true,
  type: "player",
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "red" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "red" },
  ],
  hp: MAX_HP,
  // sprite: "player_sprite",
  i_frames: 30,
  hit: false,
  powerup: "",
  bullet_type: "",
  animation: ANIMATIONS.playerIdle,
  animation_speed: 6,
  state: PLAYER_STATES.IDLE,
  has_trail: false,

  // jump properties
  jump_height: 0,
  max_jump_height: 96,
  jump_rate: 8,
  hang_time: 30,
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
  recoil: 5,
};

const WIDE_BULLET = {
  ...BULLET,
  h: 24,
  recoil: 8,
  animation: ANIMATIONS.wideShoot,
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
  // sprite: "basic_enemy",
  has_trail: true,
  animation: ANIMATIONS.enemyMove,
  animation_speed: 12,
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
const WIDE_SHOT = { ...COLLECT, pickup: PICKUPS.WIDE_SHOT };
const RAPID_FIRE = { ...COLLECT, pickup: PICKUPS.RAPID_FIRE };
const MISSILE = { ...COLLECT, pickup: PICKUPS.MISSILE };
const SHIELD = { ...COLLECT, pickup: PICKUPS.SHIELD };
const HP = { ...COLLECT, pickup: PICKUPS.HP, sprite: "hp_up" };
const COLLECTIBLES = [COLLECT, HP, SHIELD];

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

// SHIELD
const ROTATING_SHIELD = {
  x: 0,
  y: 0,
  h: 10,
  w: 10,
  type: "shield",
  speed: 1,
  color: YELLOW,
  render_hitbox: true,
  has_trail: true,
};

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
