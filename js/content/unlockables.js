const UNLOCK_EFFECTS = {
  HP: "hp",
  POWERUP: "powerup",
  POWERUP_TIME: "powerup_time",
  MULTIPLIER: "multiplier",
  POINT_BOXES: "point_boxes",
  MODE: "mode",
};

const UNLOCKABLE = {
  points: 0,
  name: "",
  is_unlocked: false,
  powerup: null,
  effect: "",
};

// weapon unlocks
const UNLOCK_RAPID_FIRE = {
  ...UNLOCKABLE,
  name: "Wide Shot",
  powerup: RAPID_BULLET,
  points: 1000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const UNLOCK_WIDE_SHOT = {
  ...UNLOCKABLE,
  name: "Wide Shot",
  powerup: WIDE_BULLET,
  points: 2000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const UNLOCK_MISSILE = {
  ...UNLOCKABLE,
  name: "Missile",
  powerup: MISSILE_SHOT,
  points: 3000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const UNLOCK_BUDDY = {
  ...UNLOCKABLE,
  name: "Buddy",
  powerup: SHIELD,
  points: 6000,
  effect: UNLOCK_EFFECTS.POWERUP,
};

// health unlocks
const UPGRADE_HP_2 = {
  ...UNLOCKABLE,
  name: "2 HP",
  effect: UNLOCK_EFFECTS.HP,
  points: 200,
};
const UPGRADE_HP_3 = {
  ...UNLOCKABLE,
  name: "3 HP",
  effect: UNLOCK_EFFECTS.HP,
  points: 1200,
};
const UPGRADE_HP_4 = {
  ...UNLOCKABLE,
  name: "4 HP",
  effect: UNLOCK_EFFECTS.HP,
  points: 3000,
};
const UPGRADE_HP_5 = {
  ...UNLOCKABLE,
  name: "5 HP",
  effect: UNLOCK_EFFECTS.HP,
  points: 4500,
};
const UPGRADE_HP_6 = {
  ...UNLOCKABLE,
  name: "6 HP",
  effect: UNLOCK_EFFECTS.HP,
  points: 7500,
};

// point box unlocks
const UPGRADE_POINT_BOXES_1 = {
  ...UNLOCKABLE,
  name: "Points from Boxes: 100",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 500,
  value: 100,
};
const UPGRADE_POINT_BOXES_2 = {
  ...UNLOCKABLE,
  name: "Points from Boxes: 200",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 4500,
  value: 200,
};
const UPGRADE_POINT_BOXES_3 = {
  ...UNLOCKABLE,
  name: "Points from Boxes: 500",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 7000,
  value: 500,
};

// powerup time unlocks
const UPGRADE_POWERUP_TIME = {
  ...UNLOCKABLE,
  name: "Increased powerup time",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 5000,
};

// score multiplier unlocks
const UPGRADE_MAX_MULTIPLIER_3 = {
  ...UNLOCKABLE,
  name: "Max Combo: 3",
  effect: UNLOCK_EFFECTS.MULTIPLIER,
  points: 800,
};
const UPGRADE_MAX_MULTIPLIER_4 = {
  ...UNLOCKABLE,
  name: "Max Combo: 4",
  points: 2500,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
};
const UPGRADE_MAX_MULTIPLIER_5 = {
  ...UNLOCKABLE,
  name: "Max Combo: 5",
  points: 5500,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
};
const UPGRADE_MAX_MULTIPLIER_6 = {
  ...UNLOCKABLE,
  name: "Max Combo: 6",
  effect: UNLOCK_EFFECTS.MULTIPLIER,
  points: 8000,
};
const UPGRADE_MAX_MULTIPLIER_7 = {
  ...UNLOCKABLE,
  name: "Max Combo: 7",
  effect: UNLOCK_EFFECTS.MULTIPLIER,
  points: 15000,
};

const UNLOCK_ENDLESS_MODE = {
  ...UNLOCKABLE,
  name: "Endless Mode",
  points: 15000,
};

// track which upgrades have been unlocked
const UNLOCKED = [];
