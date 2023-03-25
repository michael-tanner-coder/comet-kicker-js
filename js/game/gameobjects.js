// PLAYER
const PLAYER_DEFAULT = {
  type: "player",
  name: "player",

  // position/dimensions
  x: GAME_W / 2,
  y: 0,
  prev_x: 0,
  prev_y: 0,
  w: 16,
  h: 16,
  angle: 0,

  // colors
  color: PINK,

  // movement
  speed: 0,
  max_speed: 5,
  direction: 0,
  has_gravity: false,

  // collision
  hit_ground: false,
  hit_ground_last_frame: false,
  hit_wall: false,
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "red" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "red" },
    { name: "damage_detection", x: 0, y: 0, w: 8, h: 8, color: "blue" },
  ],
  render_hitbox: false,
  enemy_detection_range: 64,
  range_color: PINK,
  render_radius: false,

  // physics
  x_velocity: 0,
  y_velocity: 0,
  max_x_velocity: 8,
  max_y_velocity: 8,
  min_y_velocity: -8,
  fall_rate: GRAVITY,

  // health/take damage
  i_frames: 30,
  hit: false,
  hp: MAX_HP,
  hitstop_time: 30,
  game_over: false,

  // powerups
  powerup: "",
  bullet_type: "",
  powerup_timer: 0,
  powerup_timer_max: 300,

  // animation/vfx
  animation: ANIMATIONS.playerIdle,
  animation_speed: 6,
  state: PLAYER_STATES.IDLE,
  has_trail: true,

  // jump
  jump_height: 0,
  max_jump_height: 128,
  hang_time: 30,
  jumping: false,
  coyote_time: 1,
  coyote_time_counter: 0,
  can_jump: true,
  can_wall_jump: false,

  //test jump 2
  maxJumpHeight: 1.3,
  standard_gravity: 25,
  jump_release_gravity_multiplier: 10,

  // shooting/kicking
  shot_timer: 0,
  shot_fired: false,
  kicking: false,
  kick_time: 15,

  slow_mo_transition: false,
};

const PLAYER = { ...PLAYER_DEFAULT };

// PLATFORM BLOCKS
const BLOCK = {
  x: 0,
  y: 0,
  block_id: 0,
  angle: 0,
  color: "blue",
  w: UNIT_SIZE,
  h: UNIT_SIZE,
  type: "floor",
  sprite: "platform",
  render_hitbox: false,
  spawn_timer: MAX_PLATFORM_SPAWN_TIMER,
  hitboxes: [
    { name: "top", x: 0, y: 0, w: 16, h: 8, color: "yellow" },
    { name: "left", x: 0, y: 2, w: 2, h: 14, color: "red" },
    { name: "right", x: UNIT_SIZE - 2, y: 2, w: 2, h: 14, color: "red" },
  ],
};

// PROJECTILES
const BULLET = {
  type: "bullet",
  name: "normalShot",
  state: "Move",
  w: 8,
  h: 8,
  x: 0,
  y: 0,
  hitboxes: [{ name: "damage_detection", x: 0, y: 0, w: 16, h: 16 }],
  color: YELLOW,
  life_timer: 30,
  direction: 0,
  speed: 6,
  animation: ANIMATIONS.normalShotMoveLeft,
  has_trail: true,
  render_hitbox: false,
  recoil: 5,
  angle: 0,
  shot_delay: 14,
  alpha: 1,
};

const RAPID_BULLET = {
  ...BULLET,
  recoil: 10,
  life_timer: 15,
  shot_delay: 14,
};

const WIDE_BULLET = {
  ...BULLET,
  name: "wideShot",
  state: "Move",
  h: 32,
  w: 32,
  recoil: 8,
  animation: ANIMATIONS.wideShotMoveLeft,
  shot_delay: 24,
};

const MISSILE_SHOT = {
  ...BULLET,
  x: 0,
  y: 0,
  h: 16,
  w: 16,
  type: "bullet",
  name: "missile",
  state: "Move",
  speed: 4,
  color: YELLOW,
  animation: ANIMATIONS.missileMoveLeft,
  render_hitbox: false,
  has_trail: true,
  recoil: 10,
  has_rotation: true,
  angle: 0,
  exploding: true,
  shot_delay: 28,
  life_timer: 60,
};

const EXPLOSION = {
  type: "explosion",
  x: 0,
  y: 0,
  radius: 1,
  expansion_rate: 0,
  max_radius: 64,
  color: WHITE,
};

// ENEMIES
const ENEMY = {
  type: "enemy",
  name: "enemy",
  w: 16,
  h: 16,
  x: 0,
  y: 0,
  prev_y: 0,
  prev_x: 0,
  color: PINK,
  direction: 0,
  speed: 1,
  fall_rate: GRAVITY / 2,
  has_gravity: true,
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "blue" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "blue" },
  ],
  hit_ground: false,
  hit_wall: false,
  has_trail: true,
  animation: ANIMATIONS.enemyMoveRight,
  animation_speed: 12,
  movement_direction: "diagnoal",
  spawn_points: [
    { x: 0, y: 3, direction: DIRECTIONS.right },
    { x: GAME_W / UNIT_SIZE, y: 3, direction: DIRECTIONS.left },
    { x: 0, y: 11, direction: DIRECTIONS.right },
  ],
  angle: 0,
  state: "Move",
  points_to_spawn: 0,
  points: 100,
  screenwrap_timer: 20,
  can_screenwrap: true,
  can_damage: false,
  can_teleport: false,
  fade_out: false,
  alpha: 1,
  can_damage_timer: 35,
  can_damage_timer_max: 35,
  boss: false,
};

const EXPLODING_ENEMY = {
  ...ENEMY,
  name: "explodingEnemy",
  color: VIOLET,
  animation: ANIMATIONS.explodingEnemyMoveDown,
  movement_direction: "vertical",
  speed: 0,
  direction: 90,
  spawn_points: [
    { x: 4, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 5, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 6, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 7, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 8, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 10, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 11, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 12, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 13, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 14, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 15, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 16, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
    { x: 17, y: 1, direction: DIRECTIONS.down, spawn_count: 4 },
  ],
  exploding: true,
  points_to_spawn: 500,
  points: 15,
};

const ROLLING_ENEMY = {
  ...ENEMY,
  solid: true,
  name: "rollingEnemy",
  w: 32,
  h: 32,
  color: VIOLET,
  animation: ANIMATIONS.rollingEnemyMoveLeft,
  hp: 3,
  render_hitbox: false,
  points_to_spawn: 3000,
  points: 25,
  screenwrap_timer: 60,
};

const BOUNCING_ENEMY = {
  ...ENEMY,
  solid: true,
  name: "bouncingEnemy",
  color: VIOLET,
  animation: ANIMATIONS.bouncingEnemyMoveLeft,
  speed: 3,
  spawn_points: [
    { x: 2, y: 1, direction: DIRECTIONS.right },
    { x: 4, y: 1, direction: DIRECTIONS.right },
    { x: 6, y: 1, direction: DIRECTIONS.right },
    { x: 8, y: 1, direction: DIRECTIONS.left },
    { x: 10, y: 1, direction: DIRECTIONS.left },
  ],
  points_to_spawn: 5000,
  points: 20,
};

const BIG_COMET = {
  ...ENEMY,
  name: "bigComet",
  h: 128,
  w: 128,
  fall_rate: 0,
  movement_direction: "follow",
  has_gravity: false,
  animation: ANIMATIONS.bigCometMoveLeft,
  points_to_spawn: 10000,
  points: 5000,
  hp: 100,
  can_screenwrap: false,
  can_teleport: true,
  fade_out: false,
  no_damage: false,
  spawn_points: [
    { x: -6, y: -6, direction: DIRECTIONS.right },
    {
      x: GAME_W / UNIT_SIZE + 6,
      y: -6,
      direction: DIRECTIONS.left,
    },
    { x: -6, y: GAME_H / UNIT_SIZE + 6, direction: DIRECTIONS.right },
    {
      x: GAME_W / UNIT_SIZE + 6,
      y: GAME_H / UNIT_SIZE - 6,
      direction: DIRECTIONS.left,
    },
  ],
  boss: true,
  can_damage_timer: 0,
  can_damage: true,
};

const ENEMIES = [ENEMY, EXPLODING_ENEMY, ROLLING_ENEMY, BOUNCING_ENEMY];
const ENEMY_TYPES = [
  ENEMY,
  EXPLODING_ENEMY,
  ROLLING_ENEMY,
  BOUNCING_ENEMY,
  BIG_COMET,
];

// POWERUPS and POINT COLLECTIBLES
const COLLECT = {
  type: "collect",
  w: 32,
  h: 32,
  x: 0,
  y: 0,
  color: "yellow",
  life_timer: 360,
  points: 10,
  pickup: PICKUPS.POINTS,
  render_hitbox: false,
  sprite: "collectible",
  angle: 0,
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
// const COLLECTIBLES = [MISSILE, WIDE_SHOT, RAPID_FIRE, SHIELD, HP, COLLECT];
const COLLECTIBLES = [COLLECT];

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

const HEART = {
  x: 0,
  y: 20,
  w: 10,
  h: 10,
  animation_timer: 0,
  alpha: 1,
};
const LOST_HEARTS = [];

// pause menu
const PAUSE_BAR_BACK = {
  x: -224,
  y: 21,
  target_x: 8,
  w: 224,
  h: 39,
  color: YELLOW,
};
const PAUSE_BAR_FRONT = {
  x: -224,
  y: 12,
  target_x: 0,
  w: 224,
  h: 39,
  color: PINK,
};
const PAUSE_TEXT = {
  x: 0,
  target_x: 28,
  y: 0,
  text: getText("game_paused"),
  size: 24,
};

const QUIT_PROMPT = {
  x: 48,
  y: 0,
  font_size: 8,
};

const RESUME_PROMPT = {
  x: 244,
  y: 0,
  font_size: 8,
};
