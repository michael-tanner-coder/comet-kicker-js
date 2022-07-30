const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// TODO: make a default game state

// GLOBAL CONSTANTS
const GAME_SPEED = 60;
const GAME_W = canvas.width;
const GAME_H = canvas.height;
const UNIT_SIZE = 16;
const GRAVITY = 2.6;
const INPUT_MAP = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  [" "]: false,
  Enter: false,
};
const MAX_SHOT_TIMER = 14;
const MAX_SPAWN_TIMER = 60;
const MAX_COLLECT_SPAWN_TIMER = 120;
const SPAWN_LIMIT = 20;
const MAX_HP = 4;

// GAME OBJECTS
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

const GAME_OBJECTS = [];
GAME_OBJECTS.push(PLAYER);

// GLOBAL VARIABLES
var current_key = "";
var images_loaded = false;
var player_x = 0;
var player_y = 0;
var player_speed = 0;
var hit_ground = false;
var hit_wall = false;
var shot_timer = 0;
var shot_fired = false;
var spawn_timer = MAX_SPAWN_TIMER;
var collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;
var score = 0;
var enemy_point_value = 10;
var game_over = false;

// ASSETS
var player_sprite = new Image();
player_sprite.src = "player.png";
player_sprite.onload = () => {
  images_loaded = true;
};

// UTILS
function moveInOwnDirection(object) {
  object.x += object.speed * Math.cos((object.direction * Math.PI) / 180);
  object.y += object.speed * Math.sin((object.direction * Math.PI) / 180);
}

function updateHitboxes(object) {
  if (object.hitboxes) {
    const left = object.hitboxes.find((box) => box.name === "left");
    const right = object.hitboxes.find((box) => box.name === "right");

    if (left && right) {
      left.x = object.x;
      left.y = object.y;

      right.x = object.x + object.w - right.w;
      right.y = object.y;
    }
  }
}

function drawHitboxes(object) {
  object.hitboxes.forEach((box) => {
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.w, box.h);
  });
}

function getHitbox(object, box_name) {
  if (object.hitboxes) {
    const myBox = object.hitboxes.find((box) => box.name === box_name);

    return myBox ? myBox : null;
  }
}

function spawnBullet(direction) {
  console.log("spawn");
  var new_bullet = { ...BULLET };
  new_bullet.direction = direction;
  new_bullet.x = PLAYER.x + PLAYER.w * Math.cos((direction * Math.PI) / 180);
  new_bullet.y = PLAYER.y + PLAYER.h * Math.sin((direction * Math.PI) / 180);
  new_bullet.x += new_bullet.w / 2;
  new_bullet.y += new_bullet.h / 2;
  GAME_OBJECTS.push(new_bullet);
}

function choose(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function spawnEnemy() {
  var new_enemy = { ...ENEMY };
  var spawn_point = choose(SPAWN_LOCATIONS);
  new_enemy.x = withGrid(spawn_point.x);
  new_enemy.y = withGrid(spawn_point.y);
  new_enemy.direction = Math.random() > 0.5 ? 180 : 0;
  GAME_OBJECTS.push(new_enemy);
}

function spawnCollectible() {
  var new_collect = { ...COLLECT };
  var spawn_point = choose(COLLECTIBLE_LOCATIONS);
  new_collect.x = withGrid(spawn_point.x);
  new_collect.y = withGrid(spawn_point.y);
  GAME_OBJECTS.push(new_collect);
}

function checkIfOutOfBounds(object) {
  return (
    object.x < 0 ||
    object.x + object.width > GAME_W ||
    object.y < 0 ||
    object.y + object.height > GAME_H
  );
}

function buildMap() {
  BLOCK_MAP.forEach((block) => {
    var new_block = { ...BLOCK };
    new_block.x = withGrid(block.x);
    new_block.y = withGrid(block.y);
    GAME_OBJECTS.push(new_block);
  });
}

function withGrid(number) {
  return Math.floor(number * UNIT_SIZE);
}

function collisionDetected(obj_a, obj_b) {
  return (
    obj_a.x < obj_b.x + obj_b.w &&
    obj_a.x + obj_a.w > obj_b.x &&
    obj_a.y < obj_b.y + obj_b.h &&
    obj_a.y + obj_a.h > obj_b.y
  );
}

function removeObj(obj) {
  var index = GAME_OBJECTS.indexOf(obj);
  GAME_OBJECTS.splice(index, 1);
}

function resetGame() {
  GAME_OBJECTS.length = 0;
  GAME_OBJECTS.push(PLAYER);
  hit_ground = false;
  hit_wall = false;
  PLAYER.x = 0;
  PLAYER.y = 0;
  PLAYER.hp = MAX_HP;
  game_over = true;
  buildMap();
}

// INPUT
window.addEventListener("keydown", function (e) {
  console.log(e);
  if (Object.keys(INPUT_MAP).includes(e.key)) {
    console.log(e.key + " is held");
    INPUT_MAP[e.key] = true;
    current_key = e.key;
  }
});
window.addEventListener("keyup", function (e) {
  console.log(e);
  if (Object.keys(INPUT_MAP).includes(e.key)) {
    console.log(e.key + " is lifted");
    INPUT_MAP[e.key] = false;
    current_key = "";
  }
});

// LOOP FUNCTIONS
function update() {
  if (game_over) {
    if (INPUT_MAP["Enter"]) {
      game_over = false;
      score = 0;
    }
    return;
  }

  if (PLAYER.hp <= 0) {
    resetGame();
  }

  let prev_x = PLAYER.x;
  let prev_y = PLAYER.y;

  PLAYER.x += PLAYER.speed * (INPUT_MAP["ArrowRight"] ? 1 : 0);
  PLAYER.x -= PLAYER.speed * (INPUT_MAP["ArrowLeft"] ? 1 : 0);
  PLAYER.direction = INPUT_MAP["ArrowLeft"] ? 180 : 0;

  var enemies = GAME_OBJECTS.filter((obj) => obj.type === "enemy");
  var collectibles = GAME_OBJECTS.filter((obj) => obj.type === "collect");

  score -= 0.1;
  if (score <= 0) {
    score = 0;
  }

  if (collectibles.length <= 0) {
    collect_spawn_timer--;
  }

  if (collect_spawn_timer <= 0) {
    spawnCollectible();
    collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;
  }

  if (enemies.length < SPAWN_LIMIT) {
    spawn_timer--;
  }

  if (spawn_timer <= 0) {
    spawnEnemy();
    spawn_timer = MAX_SPAWN_TIMER;
  }

  if (!shot_fired) {
    shot_timer--;
  }

  if (shot_fired) {
    shot_timer = MAX_SHOT_TIMER;
    shot_fired = false;
  }

  if (shot_timer <= 0 && INPUT_MAP[" "]) {
    spawnBullet(PLAYER.direction);
    shot_fired = true;
  }

  var blocks = GAME_OBJECTS.filter((obj) => obj.type === "floor");
  var bullets = GAME_OBJECTS.filter((obj) => obj.type === "bullet");

  bullets.forEach((bullet) => moveInOwnDirection(bullet));
  enemies.forEach((enemy) => {
    // TODO: refactor into a util for all screen wrapping objects
    if (enemy.x + enemy.w > GAME_W) {
      enemy.x = 0;
    }

    if (enemy.x + enemy.w < 0) {
      enemy.x = GAME_W - enemy.w;
    }

    if (enemy.y + enemy.h > GAME_H) {
      enemy.y = 0;
    }

    moveInOwnDirection(enemy);
  });

  // PHYSICS LOOP
  GAME_OBJECTS.forEach((obj) => {
    if (obj.has_gravity) {
      obj.y += GRAVITY;
    }
  });

  // COLLISION CHECKS
  // player to block
  blocks.forEach((block) => {
    if (collisionDetected(block, PLAYER)) {
      hit_ground = true;
      PLAYER.y = prev_y;
    }

    const leftBox = getHitbox(PLAYER, "left");
    const rightBox = getHitbox(PLAYER, "right");

    if (
      collisionDetected(block, leftBox) ||
      collisionDetected(block, rightBox)
    ) {
      hit_wall = true;
      PLAYER.x = prev_x;
    }
  });

  // collectible to player
  collectibles.forEach((coll) => {
    coll.life_timer -= 1;

    if (coll.life_timer <= 0) {
      removeObj(coll);
      return;
    }

    if (collisionDetected(coll, PLAYER)) {
      removeObj(coll);
      score += 100;
    }
  });

  // bullet to enemy
  bullets.forEach((bullet) => {
    enemies.forEach((enemy) => {
      if (collisionDetected(enemy, bullet)) {
        removeObj(enemy);
        score += enemy_point_value;
      }
    });
  });

  // enemy to player
  enemies.forEach((enemy) => {
    if (collisionDetected(enemy, PLAYER)) {
      removeObj(enemy);
      PLAYER.hp -= 1;
    }
  });

  // SCREEN WRAPPING
  if (PLAYER.x + PLAYER.w > GAME_W) {
    PLAYER.x = 0;
  }

  if (PLAYER.x + PLAYER.w < 0) {
    PLAYER.x = GAME_W - PLAYER.w;
  }

  if (PLAYER.y + PLAYER.h > GAME_H) {
    PLAYER.y = 0;
  }

  updateHitboxes(PLAYER);

  hit_ground = false;
  hit_wall = false;
}

function draw() {
  context.fillStyle = "black";
  context.fillRect(0, 0, GAME_W, GAME_H);

  if (!game_over) {
    GAME_OBJECTS.forEach((obj) => {
      context.fillStyle = obj.color;
      context.fillRect(obj.x, obj.y, obj.w, obj.h);
    });

    if (images_loaded) {
      context.drawImage(player_sprite, PLAYER.x, PLAYER.y);
    }

    // drawHitboxes(PLAYER);
    context.fillStyle = "white";
    context.fillText("SCORE: " + Math.round(score * 100) / 100, GAME_W / 2, 10);
    context.fillText("SCORE: " + Math.round(score * 100) / 100, GAME_W / 2, 10);

    for (i = 0; i < PLAYER.hp; i++) {
      context.fillStyle = "white";
      context.fillRect(GAME_W / 2 + 16 * i, 20, 8, 16);
    }

    return;
  }

  context.fillStyle = "white";
  context.fillText("SCORE: " + Math.round(score * 100) / 100, GAME_W / 2, 100);
  context.fillText("SCORE: " + Math.round(score * 100) / 100, GAME_W / 2, 100);
}

// CORE GAME LOOP
last_time = new Date().getTime();

function loop() {
  let current_time = new Date().getTime();
  let elapsed = current_time - last_time;

  update(elapsed);
  draw();

  last_time = current_time;
}

// INIT
buildMap();
window.setInterval(loop, 1000 / GAME_SPEED);
