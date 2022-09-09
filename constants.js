// TODO: make a default game state
const GAME_SPEED = 60;
const GAME_W = canvas.width;
const GAME_H = canvas.height;
const UNIT_SIZE = 16;
const GRAVITY = 2.6;
const MAX_SHOT_TIMER = 14;
const MAX_SPAWN_TIMER = 120;
const MAX_COLLECT_SPAWN_TIMER = 120;
const SPAWN_LIMIT = 10;
const MAX_HP = 4;
const GAME_OBJECTS = [];
const PLAYER_HIT_SCREENSHAKES = 16; // frames
const SCREENSHAKE_MAX_SIZE = 1; // pixels
const PICKUPS = {
  POINTS: "points",
  SHOT: "shot",
  WIDE_SHOT: "wide_shot",
  RAPID_FIRE: "rapid_fire",
  MISSILE: "missile",
  SHIELD: "shield",
  HP: "hp",
};
const TITLE = "COMET KICKER";
const PLAYER_STATES = {
  IDLE: "idle",
  RUNNING: "running",
  KICKING: "kicking",
  DEAD: "dead",
};

const PLAYER_STATE_TO_ANIMATION = {
  [PLAYER_STATES.IDLE]: "playerIdle",
  [PLAYER_STATES.RUNNING]: "playerRun",
  [PLAYER_STATES.KICKING]: "playerKick",
  [PLAYER_STATES.DEAD]: "playerLose",
};
