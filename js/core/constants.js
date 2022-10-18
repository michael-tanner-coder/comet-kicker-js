const GAME_SPEED = 60;
const GAME_W = canvas.width;
const GAME_H = canvas.height;
const UNIT_SIZE = 16;
const GRAVITY = 3;
const MAX_SHOT_TIMER = 14;
const MAX_SPAWN_TIMER = 160;
const MAX_COLLECT_SPAWN_TIMER = 120;
const MAX_PLATFORM_SPAWN_TIMER = 240;
const SPAWN_LIMIT = 10;
const GAME_OBJECTS = [];
const PLAYER_HIT_SCREENSHAKES = 16; // frames
const SCREENSHAKE_MAX_SIZE = 1; // pixels
const ACCEPTED_LANGUAGES = ["en", "es", "fr", "zh"];
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
  shield: "Shield",
  hp: "HP",
};
const TITLE = "COMET KICKER";
const PLAYER_STATES = {
  IDLE: "Idle",
  RUNNING: "Running",
  KICKING: "Kicking",
  DEAD: "Lose",
  JUMPING: "Jumping",
};

const PLAYER_STATE_TO_ANIMATION = {
  [PLAYER_STATES.IDLE]: "playerIdle",
  [PLAYER_STATES.RUNNING]: "playerRun",
  [PLAYER_STATES.KICKING]: "playerKick",
  [PLAYER_STATES.DEAD]: "playerLose",
};
