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
    if (enemy.hit && enemy.i_frames) {
      enemy.i_frames--;
      if (enemy.i_frames <= 0) {
        enemy.i_frames = 0;
        enemy.hit = false;
      }
    }
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

function updateExplosions(explosions) {
  explosions.forEach((exp) => {
    exp.expansion_rate = easingWithRate(exp.expansion_rate, 4, 0.05);
    exp.radius += exp.expansion_rate;
    if (exp.radius >= exp.max_radius) {
      removeObj(exp);
    }
  });
}

function updatePlatforms(platforms) {
  platforms.forEach((plat) => {
    if (plat.destroyed) {
      plat.spawn_timer--;
    }

    if (plat.spawn_timer <= 0) {
      plat.x = 0 - UNIT_SIZE;
      plat.destroyed = false;
      plat.spawn_timer = MAX_PLATFORM_SPAWN_TIMER;
    }

    var target_platform = BLOCK_MAP[plat.block_id];
    plat.x = easing(plat.x, withGrid(target_platform.x));
    plat.x = Math.ceil(plat.x);
  });
}
// sound
function updateMusic() {
  if (!song_playing) {
    current_song = playMusic(current_song_name);
  }

  if (current_song) {
    current_song.volume.gain.value =
      (music_volume / 100) * (master_volume / 10);
  }
}

function changeMusic(song) {
  if (song_playing) {
    current_song.sound.stop();
    // current_song.sound.time = 0;
    current_song_name = song;
    current_song = playMusic(song);
  }
}

// physics
function updateCollisions() {}

function applyGravityToObjects() {
  GAME_OBJECTS.forEach((obj) => {
    if (obj.has_gravity) {
      obj.y += obj.fall_rate * time_scale * game_speed;
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
let t_rate = 1;
let t_target = 1;
function updateTimeScale() {
  time_scale = easingWithRate(time_scale, t_target, t_rate);
}

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
    // lower shot timer for rapid fire powerup
    PLAYER.shot_timer =
      PLAYER.powerup === PICKUPS.RAPID_FIRE ? 7 : MAX_SHOT_TIMER;
    PLAYER.shot_fired = false;
  }

  if (
    PLAYER.shot_timer <= 0 &&
    (onPress(CONTROLS.shoot) ||
      (PLAYER.powerup === PICKUPS.RAPID_FIRE && onHold(CONTROLS.shoot)))
  ) {
    let shot = spawnBullet(PLAYER, PLAYER.direction, PLAYER.bullet_type);
    spark_fx(shot.x, shot.y);
    recoil(PLAYER, shot, shot.recoil);

    if (PLAYER.bullet_type === MISSILE_SHOT) {
      playSoundEffect("missile");
    } else {
      playSoundEffect("shoot");
    }

    PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
    PLAYER.shot_fired = true;
    PLAYER.kicking = true;
  }

  if (PLAYER.kicking) {
    PLAYER.state = PLAYER_STATES.KICKING;
    PLAYER.kick_time -= 1;
    time_scale = easingWithRate(time_scale, 0.1, 0.5);
  } else {
    time_scale = easingWithRate(time_scale, 1, 0.5);
  }

  if (PLAYER.kick_time <= 0) {
    PLAYER.kicking = false;
    if (PLAYER.direction === 270 || PLAYER.direction === 90) {
      PLAYER.direction = 0;
    }
    PLAYER.state = PLAYER_STATES.IDLE;
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

  if (onPress(CONTROLS.jump)) {
    PLAYER.can_jump = true;
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
    if (PLAYER.can_jump) {
      jump(PLAYER);
    }
  } else {
    // fall faster when done jumping
    if (PLAYER.jumping) {
      PLAYER.can_jump = false;
    }
    PLAYER.y_velocity =
      easingWithRate(PLAYER.y_velocity, -1, 0.8) * game_speed * time_scale;
  }

  // jump release
  if (onRelease(CONTROLS.jump)) {
    PLAYER.jumping = false;
    PLAYER.coyote_time_counter = 0;
  }
}

function testPlayerJump() {}

function playerMove(dt) {
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
    let type = choose(ENEMIES);
    if (type.points_to_spawn <= score) {
      spawnEnemy(type);
      spawn_timer = MAX_SPAWN_TIMER;
    }
  }
}

function updateCollectibleSpawnTimer(collectibles) {
  if (collectibles.length <= 0) {
    collect_spawn_timer--;
  }

  if (collect_spawn_timer <= 0) {
    spawnCollectible();
    playSoundEffect("collect_spawn");
    collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER * (1 / game_speed); // Not using time_scale since this is a single moment in time
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
  if (stop_menu_nav) return;

  // select buttons
  if (
    onPress(CONTROLS.accept) &&
    getCurrentMenuElement().type === INPUT_TYPES.button
  ) {
    getCurrentMenu().elements[getCurrentMenu().cursor].handler();
    playSoundEffect("heal_hp");
  }

  // navigate back
  if (onPress(CONTROLS.decline)) {
    goBack();
    playSoundEffect("lose_hp");
  }

  // navigate menu
  if (onPress(CONTROLS.moveDown)) {
    moveCursor(getCurrentMenu(), 1);
    playSoundEffect("shield_hit");
  }
  if (onPress(CONTROLS.moveUp)) {
    moveCursor(getCurrentMenu(), -1);
    playSoundEffect("shield_hit");
  }

  // switch options
  if (
    onPress(CONTROLS.moveLeft) &&
    getCurrentMenuElement().type === INPUT_TYPES.select
  ) {
    changeOptions(getCurrentMenuElement(), -1);
    getCurrentMenuElement().handler();
    playSoundEffect("shield_hit");
  }
  if (
    onPress(CONTROLS.moveRight) &&
    getCurrentMenuElement().type === INPUT_TYPES.select
  ) {
    changeOptions(getCurrentMenuElement(), 1);
    getCurrentMenuElement().handler();
    playSoundEffect("shield_hit");
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

  updateScoreSection(SCORE_SECTION);
  updateAverageScoreSection(AVERAGE_SCORE_SECTION);
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
    if (obj.destroyed) return;
    // render a trail based on the object's previous positions
    if (obj.has_trail) {
      drawCircleTrail(obj);
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

    if (obj.radius) {
      context.fillStyle = obj.color;
      context.beginPath();
      context.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
      context.fill();
    }

    // render hitboxes in the object's given color
    if (obj.render_hitbox || render_hitboxes) {
      context.fillStyle = obj.color;
      context.fillRect(obj.x, obj.y, obj.w, obj.h);

      obj?.hitboxes?.forEach((box) => {
        context.fillStyle = box.color;
        context.fillRect(obj.x + box.x, obj.y + box.y, box.w, box.h);
      });
    }

    // draw a static image
    if (images_loaded && obj.sprite) {
      drawBitmapCenteredAtLocationWithRotation(
        // Sprite
        IMAGES[obj.sprite],
        // Position
        Math.floor(obj.x) + obj.w / 2,
        Math.floor(obj.y) + obj.h / 2,
        // Angle
        obj.angle,
        // Alpha
        1
      );
    }

    // flash white every other frame
    if (obj.hit && obj.i_frames % 2 === 0) {
      context.fillStyle = WHITE;
      context.fillRect(obj.x, obj.y, obj.w, obj.h);
    }

    // play the object's current animation
    if (images_loaded && obj.animation) {
      obj.animation = getAnimationDirection(obj);
      playAnimation(
        obj.animation,
        obj.animation_speed || 1,
        // This helps reduce blurriness by not using fractional locations
        Math.floor(obj.x),
        Math.floor(obj.y)
      );
    }

    if (obj.type === "collect") {
      context.fillStyle = PURPLE;
      context.globalAlpha = 0.5;
      let time_left_difference = COLLECT.life_timer - obj.life_timer;
      let time_left_percent = time_left_difference / COLLECT.life_timer;
      let h = time_left_percent * 17;
      let w = 19;
      context.fillRect(obj.x + 6, obj.y + 6, w, h);
      context.globalAlpha = 1;
    }
  });
}

function drawScore() {
  context.fillStyle = WHITE;
  context.fillText(`${getText("score")}: ${Math.round(score)}`, GAME_W / 2, 10);
}

function drawHP() {
  for (i = 0; i < PLAYER.hp; i++) {
    context.fillStyle = WHITE;
    context.drawImage(IMAGES["heart"], GAME_W / 2 + 16 * i, 20);
  }
}

function drawGameOverScreen() {
  context.fillStyle = PINK;
  drawCenteredText(`${getText("game_over")}`, 21);
  context.fillStyle = WHITE;
  drawCenteredText(`${getText("game_over")}`, 20);

  context.fillStyle = WHITE;
  drawScoreSection(SCORE_SECTION);
  drawAverageScoreSection(AVERAGE_SCORE_SECTION);
  drawOptionsSection(OPTIONS_SECTION);
}

function drawPauseScreen() {
  // overlay
  context.globalAlpha = 0.5;
  context.fillStyle = "black";
  context.fillRect(0, 0, GAME_W, GAME_H);
  context.globalAlpha = 1;

  // pause text
  context.fillStyle = WHITE;
  context.fillText(getText("game_paused"), GAME_W / 2 - 90, 100);
  context.fillText(getText("press_enter_to_continue"), GAME_W / 2 - 90, 150);
}
