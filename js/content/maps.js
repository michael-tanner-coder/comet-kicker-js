const BLOCK_MAP = [
  // TOP LEFT PLATFORM
  { x: 0, y: 5 },
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },

  // TOP RIGHT PLATFORM
  { x: GAME_W / UNIT_SIZE - 1, y: 5 },
  { x: GAME_W / UNIT_SIZE - 2, y: 5 },
  { x: GAME_W / UNIT_SIZE - 3, y: 5 },
  { x: GAME_W / UNIT_SIZE - 4, y: 5 },

  // BOTTOM LEFT PLATFORM
  { x: 0, y: 12 },
  { x: 1, y: 12 },
  { x: 2, y: 12 },
  { x: 3, y: 12 },

  // BOTTOM RIGHT PLATFORM
  { x: GAME_W / UNIT_SIZE - 1, y: 12 },
  { x: GAME_W / UNIT_SIZE - 2, y: 12 },
  { x: GAME_W / UNIT_SIZE - 3, y: 12 },
  { x: GAME_W / UNIT_SIZE - 4, y: 12 },

  // MIDDLE PLATFORM
  { x: GAME_W / UNIT_SIZE / 2 - 1 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 2 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 3 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 4 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 5 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 6 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 7 + 4, y: 9 },
  { x: GAME_W / UNIT_SIZE / 2 - 8 + 4, y: 9 },
];

const SPAWN_LOCATIONS = [
  { x: 0, y: 3 },
  { x: GAME_W / UNIT_SIZE, y: 3 },
  { x: 0, y: 11 },
];

const COLLECTIBLE_LOCATIONS = [
  // top left
  { x: 2, y: 2 },
  // top right
  { x: GAME_W / UNIT_SIZE - 3, y: 2 },
  // middle
  { x: GAME_W / UNIT_SIZE / 2, y: 6 },
  // bottom left
  { x: 2, y: 10 },
  // bottom right
  { x: GAME_W / UNIT_SIZE - 3, y: 10 },
];
