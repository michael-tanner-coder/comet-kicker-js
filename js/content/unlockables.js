// max name length: 18 characters

const RECENT_UNLOCKS = [];

const UNLOCK_EFFECTS = {
  HP: "hp",
  POWERUP: "powerup",
  POWERUP_TIME: "powerup_time",
  MULTIPLIER: "multiplier",
  POINT_BOXES: "point_boxes",
  MODE: "mode",
};

const UNLOCK_LABELS = {
  combo: "Max Combo +1",
  hp: "Max HP +1",
  box: "Box Points: ",
  powerup_time: "More Powerup Time",
  endless_mode: "Endless Mode",
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
  name: "Rapid Fire",
  powerup: RAPID_FIRE,
  points: 1000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const UNLOCK_WIDE_SHOT = {
  ...UNLOCKABLE,
  name: "Wide Shot",
  powerup: WIDE_SHOT,
  points: 2000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const UNLOCK_MISSILE = {
  ...UNLOCKABLE,
  name: "Missile",
  powerup: MISSILE,
  points: 3000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const UNLOCK_BUDDY = {
  ...UNLOCKABLE,
  name: "Buddy!",
  powerup: SHIELD,
  points: 6000,
  effect: UNLOCK_EFFECTS.POWERUP,
};
const WEAPON_UNLOCKS = [
  UNLOCK_RAPID_FIRE,
  UNLOCK_WIDE_SHOT,
  UNLOCK_MISSILE,
  UNLOCK_BUDDY,
];

// health unlocks
const UPGRADE_HP_2 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.hp,
  effect: UNLOCK_EFFECTS.HP,
  points: 200,
};
const UPGRADE_HP_3 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.hp,
  effect: UNLOCK_EFFECTS.HP,
  points: 1200,
};
const UPGRADE_HP_4 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.hp,
  effect: UNLOCK_EFFECTS.HP,
  points: 3000,
};
const UPGRADE_HP_5 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.hp,
  effect: UNLOCK_EFFECTS.HP,
  points: 4500,
};
const UPGRADE_HP_6 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.hp,
  effect: UNLOCK_EFFECTS.HP,
  points: 7500,
};
const HEALTH_UNLOCKS = [
  UPGRADE_HP_2,
  UPGRADE_HP_3,
  UPGRADE_HP_4,
  UPGRADE_HP_5,
  UPGRADE_HP_6,
];

// point box unlocks
const UPGRADE_POINT_BOXES_1 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.box + "100",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 500,
  value: 100,
};
const UPGRADE_POINT_BOXES_2 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.box + "200",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 4500,
  value: 200,
};
const UPGRADE_POINT_BOXES_3 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.box + "500",
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 7000,
  value: 500,
};
const POINT_BOXES = [
  UPGRADE_POINT_BOXES_1,
  UPGRADE_POINT_BOXES_2,
  UPGRADE_POINT_BOXES_3,
];

// powerup time unlocks
const UPGRADE_POWERUP_TIME = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.powerup_time,
  effect: UNLOCK_EFFECTS.POWERUP_TIME,
  points: 5000,
};

// score multiplier unlocks
const UPGRADE_MAX_MULTIPLIER_3 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.combo,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
  points: 800,
};
const UPGRADE_MAX_MULTIPLIER_4 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.combo,
  points: 2500,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
};
const UPGRADE_MAX_MULTIPLIER_5 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.combo,
  points: 5500,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
};
const UPGRADE_MAX_MULTIPLIER_6 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.combo,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
  points: 8000,
};
const UPGRADE_MAX_MULTIPLIER_7 = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.combo,
  effect: UNLOCK_EFFECTS.MULTIPLIER,
  points: 15000,
};
const MULTIPLIER_UNLOCKS = [
  UPGRADE_MAX_MULTIPLIER_3,
  UPGRADE_MAX_MULTIPLIER_4,
  UPGRADE_MAX_MULTIPLIER_5,
  UPGRADE_MAX_MULTIPLIER_6,
  UPGRADE_MAX_MULTIPLIER_7,
];

const UNLOCK_ENDLESS_MODE = {
  ...UNLOCKABLE,
  name: UNLOCK_LABELS.endless_mode,
  points: 15000,
};

// track which upgrades have been unlocked
const UNLOCKED = [];

// collection for all unlockables
const UNLOCKABLES = [
  ...WEAPON_UNLOCKS,
  ...HEALTH_UNLOCKS,
  ...MULTIPLIER_UNLOCKS,
  ...POINT_BOXES,
  UPGRADE_POWERUP_TIME,
  UNLOCK_ENDLESS_MODE,
];
