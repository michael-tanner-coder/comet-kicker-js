const BLOCK_MAP = [
  // LEFT PLATFORM
  { x: 0, y: 4 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },

  // RIGHT PLATFORM
  { x: GAME_W / UNIT_SIZE - 1, y: 6 },
  { x: GAME_W / UNIT_SIZE - 2, y: 6 },
  { x: GAME_W / UNIT_SIZE - 3, y: 6 },
  { x: GAME_W / UNIT_SIZE - 4, y: 6 },

  // MIDDLE PLATFORM
  { x: GAME_W / UNIT_SIZE / 2 - 1, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 2, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 3, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 4, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 5, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 6, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 7, y: 12 },
  { x: GAME_W / UNIT_SIZE / 2 - 8, y: 12 },
];

const SPAWN_LOCATIONS = [
  { x: 0, y: 3 },
  { x: GAME_W / UNIT_SIZE, y: 3 },
  { x: 0, y: 11 },
];

const COLLECTIBLE_LOCATIONS = [
  { x: 2, y: 2 },
  { x: 10, y: 5 },
  { x: 5, y: 10 },
];
