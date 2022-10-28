const GAME_SPEED = 60;
const TRY_TO_MAKE_FONTS_MORE_CRISP = true; 
const GAME_W = canvas.width;
const GAME_H = canvas.height;
const UNIT_SIZE = 16;
const GRAVITY = 3;
const MAX_SPAWN_TIMER = 100;
const MAX_COLLECT_SPAWN_TIMER = 120;
const MAX_PLATFORM_SPAWN_TIMER = 240;
const MAX_SPAWN_PACING_TIMER = 3600;
const SPAWN_LIMIT = 5;
const GAME_OBJECTS = [];
const PLAYER_HIT_SCREENSHAKES = 16; // frames
const SCREENSHAKE_MAX_SIZE = 1; // pixels
const ACCEPTED_LANGUAGES = ["en", "es", "fr", "zh"];
const DEFAULT_FONT_SIZE = 8;
const PICKUPS = {
  POINTS: "points",
  SHOT: "shot",
  WIDE_SHOT: "wide_shot",
  RAPID_FIRE: "rapid_fire",
  MISSILE: "missile",
  SHIELD: "shield",
  HP: "hp",
};
const PICKUP_TEXT = {
  points: "points",
  shot: "shot",
  rapid_fire: "rapid fire",
  wide_shot: "Wide Shot",
  missile: "Missile Shot",
  shield: "Buddy!",
  hp: "HP",
};
const TITLE = "COMET KICKER";
const PLAYER_STATES = {
  IDLE: "Idle",
  RUNNING: "Running",
  KICKING: "Kicking",
  LOSE: "Lose",
  JUMPING: "Jumping",
  HIT: "Hit",
};

const PLAYER_STATE_TO_ANIMATION = {
  [PLAYER_STATES.IDLE]: "playerIdle",
  [PLAYER_STATES.RUNNING]: "playerRun",
  [PLAYER_STATES.KICKING]: "playerKick",
  [PLAYER_STATES.LOSE]: "playerLose",
  [PLAYER_STATES.HIT]: "playerHit",
};

const DIRECTIONS = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
};
