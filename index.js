// LOOP FUNCTIONS
function update() {
  if (image_loading_error) {
    return;
  }

  if (!images_loaded || !sounds_loaded) {
    return;
  }

  if (game_state === STATES.MENU) {
    if (INPUT_MAP["Enter"]) {
      game_state = STATES.GAME;
    }

    return;
  }

  if (game_state === STATES.GAME_OVER) {
    if (INPUT_MAP["Enter"]) {
      game_state = STATES.GAME;
      score = 0;
    }

    if (INPUT_MAP["Escape"]) {
      game_state = STATES.MENU;
    }

    return;
  }

  if (PLAYER.hp <= 0) {
    resetGame();
  }

  // SCREEN WRAP FOR PARALLAX BACKGROUNDS
  BACKGROUNDS.forEach((bg) => {
    bg.x += bg.speed;
    if (bg.x > GAME_W) {
      bg.x = -1 * GAME_W;
    }
  });

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

  if (image_loading_error) {
    context.fillStyle = "white";
    context.fillText(
      "Error loading assets. Check console for errrors.",
      GAME_W / 2 - 100,
      10
    );
    return;
  }

  if (!images_loaded || !sounds_loaded) {
    context.fillStyle = "white";
    context.fillText("Loading assets...", GAME_W / 2 - 50, 10);
    return;
  }

  if (game_state === STATES.GAME) {
    if (images_loaded) {
      context.drawImage(IMAGES["background_1"], BACKGROUND_1.x, BACKGROUND_1.y);
      context.drawImage(IMAGES["background_2"], BACKGROUND_2.x, BACKGROUND_2.y);
      context.drawImage(IMAGES["background_3"], BACKGROUND_3.x, BACKGROUND_3.y);
    }

    GAME_OBJECTS.forEach((obj) => {
      context.fillStyle = obj.color;
      context.fillRect(obj.x, obj.y, obj.w, obj.h);
      if (images_loaded && obj.sprite) {
        context.drawImage(IMAGES[obj.sprite], obj.x, obj.y);
      }
    });

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

  if (game_state === STATES.GAME_OVER) {
    context.fillStyle = "white";
    context.fillText(
      "SCORE: " + Math.round(score * 100) / 100,
      GAME_W / 2,
      100
    );
    context.fillText(
      "SCORE: " + Math.round(score * 100) / 100,
      GAME_W / 2,
      100
    );
    context.fillText("RETRY: PRESS ENTER", GAME_W / 2, 150);
    context.fillText("QUIT: PRESS ESC", GAME_W / 2, 200);
  }

  if (game_state === STATES.MENU) {
    context.fillStyle = "white";
    context.fillText("COMET KICKER", GAME_W / 2, 100);
    context.fillText("COMET KICKER", GAME_W / 2, 100);
    context.fillText("PRESS ENTER", GAME_W / 2, 200);
  }
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
startGame();
window.setInterval(loop, 1000 / GAME_SPEED);
