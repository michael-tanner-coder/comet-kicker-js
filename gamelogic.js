// GLOBAL VARIABLES
var images_loaded = false;
var player_x = 0;
var player_y = 0;
var hit_ground = false;
var hit_wall = false;
var shot_timer = 0;
var shot_fired = false;
var spawn_timer = MAX_SPAWN_TIMER;
var collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;
var score = 0;
var enemy_point_value = 10;
var game_over = false;
var game_state = STATES.MENU;
var render_hitboxes = true;
var fullscreen = false;

// GLOBAL UTILS
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

function easing(x, target) {
  return (x += (target - x) * 0.1);
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
  game_state = STATES.GAME_OVER;
  buildMap();
}

function startGame() {
  GAME_OBJECTS.push(PLAYER);
  buildMap();
}

function toggleFullscreen() {
  fullscreen = !fullscreen;
  if (fullscreen) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
