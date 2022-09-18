// higher level abstractions for all of the core logic that runs in the game loop

// UPDATE LOGIC
// general update
function updateShots(bullets) {
  bullets.forEach((bullet) => moveInOwnDirection(bullet));
}

function updateEnemies(enemies) {
  enemies.forEach((enemy) => {
    screenwrap(enemy);
    moveInOwnDirection(enemy);
  });
}

function updateText(text) {
  text.forEach((txt) => {
    txt.y -= txt.speed;
    if (txt.alpha <= 0) {
      removeObj(txt);
    }
  });
}
// sound
function updateMusic() {
  if (!song_playing) {
    current_song = playMusic(current_song_name);
  }

  if (current_song) {
    current_song.volume.gain.value = music_volume / 10;
  }
}

// physics
function updateCollisions() {}

function applyGravityToObjects() {
  GAME_OBJECTS.forEach((obj) => {
    if (obj.has_gravity) {
      obj.y += GRAVITY * time_scale;
    }
  });
}

// vfx/animation
function updateBackground() {
  BACKGROUNDS.forEach((bg) => {
    bg.x += bg.speed;
    if (bg.x > GAME_W) {
      bg.x = -1 * GAME_W;
    }
  });
}

// character actions
function checkForGameOver() {
  if (PLAYER.hp <= 0) {
    resetGame();
    playSoundEffect("game_over");
  }
}

function updateIFrameCounter() {
  if (PLAYER.hit) {
    PLAYER.i_frames--;
  }

  if (PLAYER.i_frames <= 0) {
    PLAYER.i_frames = PLAYER_DEFAULT.i_frames;
    PLAYER.hit = false;
  }
}

function playerShoot() {
  if (!PLAYER.shot_fired) {
    PLAYER.shot_timer--;
  }

  if (PLAYER.shot_fired) {
    PLAYER.shot_timer = MAX_SHOT_TIMER;
    PLAYER.shot_fired = false;
  }

  if (PLAYER.shot_timer <= 0 && onPress(CONTROLS.shoot)) {
    let shot = spawnBullet(PLAYER, PLAYER.direction, PLAYER.bullet_type);
    spark_fx(shot.x, shot.y);
    recoil(PLAYER, shot, shot.recoil);
    playSoundEffect("shoot");
    PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
    PLAYER.shot_fired = true;
    PLAYER.kicking = true;
  }

  if (PLAYER.kicking) {
    PLAYER.state = PLAYER_STATES.KICKING;
    PLAYER.kick_time -= 1;
  }

  if (PLAYER.kick_time <= 0) {
    PLAYER.kicking = false;
    PLAYER.kick_time = PLAYER_DEFAULT.kick_time;
  }
}

function playerJump() {
  // coyote time
  if (PLAYER.hit_ground_last_frame) {
    PLAYER.coyote_time_counter = PLAYER.coyote_time;
  } else {
    PLAYER.coyote_time_counter -= 0.2;
  }

  // jump hold
  if (
    PLAYER.jump_height < PLAYER.max_jump_height &&
    onHold(CONTROLS.jump) &&
    (PLAYER.coyote_time_counter > 0 || PLAYER.jumping)
  ) {
    PLAYER.jumping = true;
    if (PLAYER.hit_ground) {
      fall_fx(PLAYER.x, PLAYER.y);
      if (debug_mode) {
        spawnObject(
          {
            x: PLAYER.x,
            y: PLAYER.y,
            h: PLAYER.h,
            w: PLAYER.w,
            color: "red",
            render_hitbox: true,
          },
          PLAYER.x,
          PLAYER.y
        );
      }
    }
    jump(PLAYER);
  } else {
    // fall faster when done jumping
    PLAYER.y_velocity = easingWithRate(PLAYER.y_velocity, -1, 0.8);
  }

  // jump release
  if (onRelease(CONTROLS.jump)) {
    PLAYER.jumping = false;
    PLAYER.coyote_time_counter = 0;
  }
}

function playerMove() {
  PLAYER.prev_x = PLAYER.x;
  PLAYER.prev_y = PLAYER.y;
  PLAYER.state = PLAYER_STATES.IDLE;

  if (onHold(CONTROLS.moveRight)) {
    easeMovement(PLAYER, 0);
  }

  if (onHold(CONTROLS.moveLeft)) {
    easeMovement(PLAYER, 180);
  }

  if (onHold(CONTROLS.moveUp)) {
    PLAYER.direction = 270;
  }

  if (onHold(CONTROLS.moveDown)) {
    PLAYER.direction = 90;
  }

  if (onRelease(CONTROLS.moveLeft) || onRelease(CONTROLS.moveRight)) {
    PLAYER.speed = PLAYER_DEFAULT.speed;
  }
}

// powerups
function rotateShield(shield) {
  shield.x = PLAYER.x + PLAYER.w / 2 + Math.sin(shield_timer) * 18;
  shield.y = PLAYER.y + PLAYER.h / 2 + Math.cos(shield_timer) * 16;
  shield_timer += 0.1;
}

function despawnShield(shield) {
  shield_timer = 0;
  PLAYER.powerup = PLAYER_DEFAULT.powerup;
  shield_spawned = false;
  removeObj(shield);
  playSoundEffect("shield_hit");
}

// score
function updateScore() {
  score -= 0.1;
  if (score <= 0) {
    score = 0;
  }
}

function updateComboTimer() {
  if (start_combo) {
    multiplier_timer -= 1;
  }

  if (multiplier_timer <= 0) {
    start_combo = false;
    multiplier = 1;
    multiplier_timer = 200;
  }
}

// spawning
function updateEnemySpawnTimer(enemies) {
  if (enemies.length < SPAWN_LIMIT) {
    spawn_timer--;
  }

  if (spawn_timer <= 0) {
    spawnEnemy();
    spawn_timer = MAX_SPAWN_TIMER;
  }
}

function updateCollectibleSpawnTimer(collectibles) {
  if (collectibles.length <= 0) {
    collect_spawn_timer--;
  }

  if (collect_spawn_timer <= 0) {
    spawnCollectible();
    playSoundEffect("collect_spawn");
    collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;
  }
}

// tracking
function trackPositionsOfObjects() {
  GAME_OBJECTS.forEach((obj) => {
    assignId(obj);
    storePreviousPosition(obj);
  });
}

// menus
function updateMenuNavigation() {
  // select buttons
  if (
    onPress(CONTROLS.accept) &&
    getCurrentMenuElement().type === INPUT_TYPES.button
  ) {
    getCurrentMenu().elements[getCurrentMenu().cursor].handler();
  }

  // navigate back
  if (onPress(CONTROLS.decline)) {
    goBack();
  }

  // navigate menu
  if (onPress(CONTROLS.moveDown)) {
    moveCursor(getCurrentMenu(), 1);
  }
  if (onPress(CONTROLS.moveUp)) {
    moveCursor(getCurrentMenu(), -1);
  }

  // switch options
  if (
    onPress(CONTROLS.moveLeft) &&
    getCurrentMenuElement().type === INPUT_TYPES.select
  ) {
    changeOptions(getCurrentMenuElement(), -1);
    getCurrentMenuElement().handler();
  }
  if (
    onPress(CONTROLS.moveRight) &&
    getCurrentMenuElement().type === INPUT_TYPES.select
  ) {
    changeOptions(getCurrentMenuElement(), 1);
    getCurrentMenuElement().handler();
  }
}

function updateGameOverScreen() {
  if (onPress(CONTROLS.start)) {
    game_state = STATES.GAME;
    score = 0;
  }

  if (onPress(CONTROLS.select)) {
    game_state = STATES.MENU;
  }
}

function pauseGame() {
  if (onPress(CONTROLS.pause)) {
    game_state = STATES.PAUSE;
  }
}

// DRAW LOGIC
function drawBackground() {
  if (images_loaded) {
    context.drawImage(IMAGES["background_1"], BACKGROUND_1.x, BACKGROUND_1.y);
    context.drawImage(IMAGES["background_2"], BACKGROUND_2.x, BACKGROUND_2.y);
    context.drawImage(IMAGES["background_3"], BACKGROUND_3.x, BACKGROUND_3.y);
  }
}

function drawObjects() {
  GAME_OBJECTS.forEach((obj) => {
    // render a trail based on the object's previous positions
    if (obj.has_trail) {
      drawTrail(obj);
    }

    // draw text object, gradually fade out
    if (obj.type === "text") {
      context.globalAlpha = obj.alpha;
      context.fontStyle = "16px PressStart2P";

      context.fillStyle = PINK;
      context.fillText(obj.text, obj.x, obj.y + 1);

      context.fillStyle = obj.color;
      context.fillText(obj.text, obj.x, obj.y);

      obj.alpha -= 0.01;
      context.globalAlpha = 1;
      context.fontStyle = "8px PressStart2P";
    }

    // render hitboxes in the object's given color
    if (obj.render_hitbox || render_hitboxes) {
      context.fillStyle = obj.color;
      context.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    // draw a static image
    if (images_loaded && obj.sprite) {
      context.drawImage(IMAGES[obj.sprite], obj.x, obj.y);
    }

    // flash white every other frame
    if (obj.hit && obj.i_frames % 2 === 0) {
      context.fillStyle = WHITE;
      context.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    // play the object's current animation
    if (images_loaded && obj.animation) {
      playAnimation(obj.animation, obj.animation_speed || 1, obj.x, obj.y);
    }
  });
}

function drawScore() {
  context.fillStyle = WHITE;
  context.fillText(
    `${getText("score")}: ${Math.round(score * 100) / 100}`,
    GAME_W / 2,
    10
  );
}

function drawHP() {
  for (i = 0; i < PLAYER.hp; i++) {
    context.fillStyle = WHITE;
    context.fillRect(GAME_W / 2 + 16 * i, 20, 8, 16);
  }
}

function drawPauseScreen() {
  context.fillStyle = WHITE;

  drawCenteredText(`${getText("score")}: ${Math.round(score * 100) / 100}`, 50);

  drawCenteredText(
    `${getText("average_score")}: ${Math.round(getAverageScore() * 100) / 100}`,
    75
  );

  drawCenteredText(`${getText("retry")}: ${getText("press_enter")}`, 100);

  drawCenteredText(`${getText("quit")}: PRESS ESC`, 125);
}
