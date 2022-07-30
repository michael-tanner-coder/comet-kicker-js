const PLAYER_DEFAULT = {
  x: 100,
  y: 25,
  color: "white",
  w: 16,
  h: 16,
  speed: 3,
  direction: 0,
  has_gravity: true,
  type: "player",
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "red" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "red" },
  ],
  hp: MAX_HP,
};

const PLAYER = { ...PLAYER_DEFAULT };

const BLOCK = {
  x: 0,
  y: 0,
  color: "blue",
  w: UNIT_SIZE,
  h: UNIT_SIZE,
  type: "floor",
};

const BULLET = {
  type: "bullet",
  w: 8,
  h: 8,
  x: 0,
  y: 0,
  color: "yellow",
  direction: 0,
  speed: 4,
};

const ENEMY = {
  type: "enemy",
  w: 16,
  h: 16,
  x: 0,
  y: 0,
  color: "red",
  direction: 0,
  speed: 3.5,
  has_gravity: true,
  hitboxes: [
    { name: "left", x: 0, y: 0, w: 4, h: 14, color: "blue" },
    { name: "right", x: 0, y: 0, w: 4, h: 14, color: "blue" },
  ],
  hit_ground: false,
  hit_wall: false,
};

const COLLECT = {
  type: "collect",
  w: 32,
  h: 32,
  x: 0,
  y: 0,
  color: "yellow",
  life_timer: 360,
};
