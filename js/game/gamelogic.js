// higher level abstractions for all of the core logic that runs in the game loop

// UPDATE LOGIC
// general update
function updateShots(bullets) {
  bullets.forEach((bullet) => {
    moveInOwnDirection(bullet);
    screenwrap(bullet);
    bullet.life_timer -= game_speed * time_scale;
    updateHitboxes(bullet);
    if (bullet.life_timer <= 0) {
      bullet.life_timer = BULLET.life_timer;
      spark_fx(bullet.x, bullet.y);
      removeObj(bullet);
    }
  });
}

function updateEnemyDamageTimer(enemy) {
  if (!enemy.boss) {
    enemy.can_damage = false;
    enemy.can_damage_timer -= game_speed * time_scale;
    enemy.can_damage_timer = clamp(
      enemy.can_damage_timer,
      0,
      enemy.can_damage_timer_max
    );
  }

  if (enemy.can_damage_timer <= 0 && !enemy.boss) {
    enemy.can_damage = true;
  }
}

function updateEnemies(enemies) {
  enemies.forEach((enemy) => {
    if (enemy.screenwrap_timer < 0 && enemy.can_screenwrap) {
      screenwrap(enemy);
      enemy.screenwrap_timer = 0;
    }

    updateEnemyDamageTimer(enemy);

    enemy.screenwrap_timer -= game_speed * time_scale;

    if (enemy.movement_direction === "follow") {
      enemy.x = easingWithRate(enemy.x, PLAYER.x, 0.01);
      enemy.y = easingWithRate(enemy.y, PLAYER.y, 0.01);
    } else {
      moveInOwnDirection(enemy);
    }
    if (enemy.hit && enemy.i_frames) {
      enemy.i_frames--;
      if (enemy.i_frames <= 0) {
        enemy.i_frames = 0;
        enemy.hit = false;
      }
    }

    if (enemy.fade_out) {
      enemy.alpha = easing(enemy.alpha, 0);
    }

    if (enemy.can_teleport && enemy.alpha <= 0.01) {
      let teleport_point = choose(enemy.spawn_points);
      enemy.x = withGrid(teleport_point.x);
      enemy.y = withGrid(teleport_point.y);
      enemy.fade_out = false;
      enemy.alpha = 1;
      enemy.can_damage = true;
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

    // slide platform back in if required
    let targetX = withGrid(target_platform.x);
    if (plat.x != targetX) {
      plat.x = easing(plat.x, targetX);
      plat.x = Math.ceil(plat.x);
      // note: this can get the player stuck inside a plat so push them upwards
      // however a bugfix is in place to account for it in the collisionDetected function
    }
  });
}
// sound
function updateMusic(vol = 1) {
  if (!song_playing) {
    current_song = playMusic(current_song_name, vol);
  }

  if (current_song) {
    current_song.volume.gain.value =
      (music_volume / 100) * (master_volume / 10) * vol;
  }
}

function changeMusic(song, vol = 1) {
  if (song_playing) {
    current_song.sound.stop();
    current_song_name = song;
    current_song = playMusic(song, vol);
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
    // increase speed of background along with the current spawn rate
    bg.x += bg.speed * (75 / getSpawnRate()) * game_speed * time_scale;

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
  if (PLAYER.hp <= 0 && !PLAYER.game_over) {
    game_speed /= 4;
    PLAYER.y_velocity = 0;
    PLAYER.fall_rate = 0;
    PLAYER.game_over = true;
  }

  if (PLAYER.game_over) {
    PLAYER.state = PLAYER_STATES.LOSE;
    PLAYER.hitstop_time -= game_speed * time_scale;
  }

  if (PLAYER.hitstop_time <= 0) {
    resetGame();
    LOST_HEARTS.length = 0;
    playSoundEffect("game_over");
  }
}

function checkForGameWon() {
  if (PLAYER.slow_mo_transition) {
    game_speed /= 8;
    PLAYER.y_velocity = 0;
    PLAYER.fall_rate = 0;
    PLAYER.won = true;
    PLAYER.slow_mo_transition = false;
    changeMusic("intro_music_1");
  }

  if (PLAYER.won) {
    PLAYER.hitstop_time -= game_speed * time_scale;
  }

  if (PLAYER.hitstop_time <= 0) {
    winGame();
    LOST_HEARTS.length = 0;
    game_state = STATES.OUTRO;
  }
}

function updateIFrameCounter() {
  if (PLAYER.hit) {
    PLAYER.i_frames--;
  }

  if (PLAYER.i_frames <= 0) {
    PLAYER.i_frames = PLAYER_DEFAULT.i_frames;
    PLAYER.hit = false;
    PLAYER.state = PLAYER_STATES.IDLE;
  }
}

function playerShoot() {
  if (!PLAYER.shot_fired) {
    PLAYER.shot_timer -= game_speed * time_scale;
  }

  if (PLAYER.shot_fired) {
    // lower shot timer for rapid fire powerup
    PLAYER.shot_timer = PLAYER.bullet_type.shot_delay;
    PLAYER.shot_fired = false;
  }

  if (
    PLAYER.shot_timer <= 0 &&
    (onPress(CONTROLS.shoot) ||
      (PLAYER.powerup === PICKUPS.RAPID_FIRE && onHold(CONTROLS.shoot)))
  ) {
    // buddy shot
    var buddy = GAME_OBJECTS.find((obj) => obj.type === "shield");
    if (buddy) {
      let buddy_shot = spawnBullet(buddy, PLAYER.direction, PLAYER.bullet_type);
      spark_fx(buddy_shot.x, buddy_shot.y);
    }

    let shot = spawnBullet(PLAYER, PLAYER.direction, PLAYER.bullet_type);
    if (PLAYER.bullet_type === WIDE_BULLET) {
      let x_offset = 0;
      let y_offset = 0;

      x_offset =
        PLAYER.direction === DIRECTIONS.right ||
        PLAYER.direction === DIRECTIONS.left
          ? 0
          : PLAYER.w;

      y_offset =
        PLAYER.direction === DIRECTIONS.right ||
        PLAYER.direction === DIRECTIONS.left
          ? PLAYER.h
          : 0;
      let upper_shot = spawnBullet(
        {
          x: PLAYER.x + x_offset,
          y: PLAYER.y - y_offset,
          w: PLAYER.w,
          h: PLAYER.h,
        },
        PLAYER.direction,
        PLAYER.bullet_type
      );
      spark_fx(upper_shot.x, upper_shot.y);

      let lower_shot = spawnBullet(
        {
          x: PLAYER.x - x_offset,
          y: PLAYER.y + y_offset,
          w: PLAYER.w,
          h: PLAYER.h,
        },
        PLAYER.direction,
        PLAYER.bullet_type
      );
      spark_fx(lower_shot.x, lower_shot.y);
    }
    spark_fx(shot.x, shot.y);
    recoil(PLAYER, shot, shot.recoil);

    if (PLAYER.bullet_type === MISSILE_SHOT) {
      playSoundEffect("missile");
    } else {
      playSoundEffect("shoot", 1.5);
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
  PLAYER.has_gravity = false;
  // coyote time
  if (PLAYER.hit_ground_last_frame) {
    PLAYER.coyote_time_counter = PLAYER.coyote_time;
  } else {
    PLAYER.coyote_time_counter -= 0.2;
  }

  if (onPress(CONTROLS.jump)) {
    PLAYER.can_jump = true;
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
  }

  if (
    (PLAYER.coyote_time_counter > 0 || PLAYER.can_wall_jump) &&
    onHold(CONTROLS.jump)
  ) {
    PLAYER.jumping = true;
    //if jump is being held and we've been on the ground recently
    PLAYER.coyote_time_counter = 0;
    //set a y velocity based on gravity and max jump height
    if (PLAYER.can_jump) {
      PLAYER.y_velocity = Math.sqrt(
        2 * PLAYER.standard_gravity * PLAYER.maxJumpHeight
      );
    }
    PLAYER.fall_rate = PLAYER.standard_gravity;
  } else if (PLAYER.y_velocity > 0 && !onHold(CONTROLS.jump)) {
    // else if we released jump, but we're still moving upwards
    //increase gravity to get us down quicker
    PLAYER.fall_rate =
      PLAYER.standard_gravity * PLAYER.jump_release_gravity_multiplier;
  } else {
    // if we're not jumping use the standard gravity
    PLAYER.fall_rate = PLAYER.standard_gravity;
    if (PLAYER.jumping) {
      PLAYER.can_jump = false;
    }
  }

  //apply the y velocity
  PLAYER.y_velocity -=
    ((PLAYER.fall_rate * dt) / 1000) * time_scale * game_speed;
  //clamp falling velocity
  if (PLAYER.y_velocity < 0) {
    PLAYER.y_velocity = Math.max(PLAYER.min_y_velocity, PLAYER.y_velocity);
  }

  // jump release
  if (onRelease(CONTROLS.jump)) {
    PLAYER.jumping = false;
    PLAYER.coyote_time_counter = 0;
  }
}

function playerMove(dt) {
  PLAYER.prev_x = PLAYER.x;
  PLAYER.prev_y = PLAYER.y;
  if (PLAYER.state === PLAYER_STATES.HIT) {
    return;
  }
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
  shield_spawned = false;
  removeObj(shield);
  playSoundEffect("shield_hit");
}

// score
function updateScore() {
  score -= game_speed * time_scale * game_speed * 0.1;
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
    multiplier_timer = max_multiplier_timer;
  }
}

// spawning

function getSpawnRate() {
  let rate = MAX_SPAWN_TIMER;
  const spawn_rates = Object.keys(spawn_pacing);
  for (var i = 0; i < spawn_rates.length; i++) {
    if (spawn_pacing_timer <= parseFloat(spawn_rates[i])) {
      rate = spawn_pacing[spawn_rates[i]];
      break;
    }
  }
  return rate;
}

function updateEnemySpawnTimer(enemies) {
  spawn_pacing_timer -= game_speed * time_scale;
  if (spawn_pacing_timer <= 0) {
    spawn_pacing_timer = MAX_SPAWN_PACING_TIMER;
  }

  if (enemies.length < SPAWN_LIMIT) {
    spawn_timer -= game_speed * time_scale;
  }

  // if at the final boss stage, spawn the boss but only allow one to be spawned
  if (final_boss_stage && !spawned_boss) {
    spawnEnemy(BIG_COMET);
    spawned_boss = true;
    changeMusic("intro_music_3", 3);
  }

  if (spawn_timer <= 0) {
    let type = choose(ENEMIES);
    if (type.points_to_spawn <= score) {
      spawnEnemy(type);

      // update the spawn rate
      spawn_timer = getSpawnRate();
      spawn_timer = clamp(spawn_timer, MAX_SPAWN_TIMER / 4, MAX_SPAWN_TIMER);
      if (final_boss_stage) {
        spawn_timer = MAX_SPAWN_TIMER * 2;
      }
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
    getCurrentMenuElement() != null &&
    getCurrentMenuElement().type === INPUT_TYPES.button // null check stops credits crash from key
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
  if (onPress(CONTROLS.accept)) {
    game_state = STATES.GAME;
    score = 0;
    turnOffAudioLowpassFilter();
  }

  if (onPress(CONTROLS.decline)) {
    game_state = STATES.MENU;
    score = 0;
    turnOffAudioLowpassFilter();
  }

  updateScoreSection(SCORE_SECTION);

  updateAverageScoreSection(AVERAGE_SCORE_SECTION);
}

function listenForGamePause() {
  if (onPress(CONTROLS.pause)) {
    if (game_state === STATES.PAUSE) {
      resumeGame();
    } else {
      pauseGame();
    }
  }

  // reset pause screen animation
  if (game_state === STATES.GAME) {
    PAUSE_BAR_BACK.x = -1 * PAUSE_BAR_BACK.w;
    PAUSE_BAR_FRONT.x = -1 * PAUSE_BAR_FRONT.w;
  }
}

// DRAW LOGIC
function drawBackground() {
  if (images_loaded) {
    context.drawImage(IMAGES["background_2"], BACKGROUND_1.x, BACKGROUND_1.y);
    context.drawImage(
      IMAGES["background_2"],
      BACKGROUND_2.x,
      BACKGROUND_2.y + 10
    );
  }
}

function drawObjects() {
  // put player at end of objects array so that they render in front of all other objects
  const PLAYER_INDEX = GAME_OBJECTS.indexOf(PLAYER);
  GAME_OBJECTS.splice(PLAYER_INDEX, 1);
  GAME_OBJECTS.push(PLAYER);

  GAME_OBJECTS.forEach((obj) => {
    if (obj.destroyed) return;

    // render a trail based on the object's previous positions
    if (obj.has_trail) {
      drawCircleTrail(obj);
    }

    // render timer bar for powerups
    if (obj.powerup_timer && obj.powerup_timer > 0) {
      let percentage = obj.powerup_timer / PLAYER_DEFAULT.powerup_timer_max;

      // frame
      context.fillStyle = WHITE;
      context.fillRect(GAME_W / 2 - 32 - 1, GAME_H - 24 - 1, 66, 18);
      context.fillStyle = PURPLE;
      context.fillRect(GAME_W / 2 - 32, GAME_H - 24, 64, 16);

      // bar
      if (percentage * 100 < 50) {
        context.fillStyle = PINK;
      } else {
        context.fillStyle = YELLOW;
      }
      context.fillRect(
        GAME_W / 2 - 32,
        GAME_H - 24,
        Math.ceil(64 * percentage),
        16
      );

      // shadow
      if (percentage * 100 < 50) {
        context.fillStyle = VIOLET;
      } else {
        context.fillStyle = "#ab9679";
      }
      context.fillRect(
        GAME_W / 2 - 32,
        GAME_H - 24 + 12,
        Math.ceil(64 * percentage),
        4
      );

      // highlight
      context.fillStyle = WHITE;
      context.fillRect(
        GAME_W / 2 - 32,
        GAME_H - 24 + 3,
        Math.ceil(64 * percentage),
        2
      );
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

    if (obj.alpha) {
      context.globalAlpha = obj.alpha;
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
        context.fillRect(box.x, box.y, box.w, box.h);
      });
    }

    // render player's detection radius for testing purposes
    if (obj.render_radius) {
      drawCircleAroundObject(obj, obj.enemy_detection_range, obj.range_color);
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
      context.globalCompositeOperation = "lighter";
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
      context.globalCompositeOperation = "source-over";
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

    context.globalAlpha = 1;
  });
}

function drawScore() {
  context.fillStyle = VIOLET;
  context.font = "8px PressStart2P";
  drawCenteredText(`${getText("score")}: ${Math.round(score)}`, 11);
  context.fillStyle = WHITE;
  context.font = "8px PressStart2P";
  drawCenteredText(`${getText("score")}: ${Math.round(score)}`, 10);
}
const HEALTH_WIDTH = 16;
function drawHP() {
  // draw one heart image for each point of HP
  for (i = 0; i < PLAYER.hp; i++) {
    context.fillStyle = WHITE;
    context.drawImage(IMAGES["heart"], GAME_W / 2 - 32 + 16 * i, 20);
  }

  // heart fall animation
  if (LOST_HEARTS.length > 0) {
    let heart = LOST_HEARTS[0];
    let target_y = 30;
    let animation_duration = 0.5;
    heart.alpha = easing(heart.alpha, 0);
    heart.y = easing(heart.y, target_y);
    context.globalAlpha = heart.alpha;
    context.drawImage(
      IMAGES["heart"],
      GAME_W / 2 -
        HEALTH_WIDTH * 2 /* 2 on left side */ +
        HEALTH_WIDTH * PLAYER.hp,
      heart.y
    );
    context.globalAlpha = 1;

    // when animation reaches its end, stop tracking this heart
    heart.animation_timer += 0.01 * game_speed * time_scale;
    if (heart.animation_timer >= animation_duration) {
      LOST_HEARTS.shift();
    }
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

  // pause section
  PAUSE_BAR_BACK.x = easing(PAUSE_BAR_BACK.x, PAUSE_BAR_BACK.target_x);
  PAUSE_BAR_FRONT.x = easing(PAUSE_BAR_FRONT.x, PAUSE_BAR_FRONT.target_x);
  PAUSE_TEXT.x = easing(PAUSE_TEXT.x, PAUSE_TEXT.target_x);
  PAUSE_TEXT.text = getText("game_paused");

  context.fillStyle = PAUSE_BAR_BACK.color;
  context.fillRect(
    PAUSE_BAR_BACK.x,
    PAUSE_BAR_BACK.y,
    PAUSE_BAR_BACK.w,
    PAUSE_BAR_BACK.h
  );

  context.fillStyle = PINK;
  context.fillRect(
    PAUSE_BAR_FRONT.x,
    PAUSE_BAR_FRONT.y,
    PAUSE_BAR_FRONT.w,
    PAUSE_BAR_FRONT.h
  );

  context.fillStyle = PURPLE;
  setFontSize(PAUSE_TEXT.size);
  context.fillText(getText("game_paused"), PAUSE_TEXT.x, 44 + 2);

  context.fillStyle = WHITE;
  setFontSize(PAUSE_TEXT.size);
  context.fillText(getText("game_paused"), PAUSE_TEXT.x, 44);

  setFontSize(DEFAULT_FONT_SIZE);

  // score section
  context.globalAlpha = 0.5;
  context.fillStyle = "black";
  context.fillRect(0, 106, GAME_W, 28);
  context.globalAlpha = 1;

  context.fillStyle = PINK;
  drawCenteredText(
    `${getText("score")}: ${Math.round(score)}`,
    Math.floor(106 + 8 + 28 / 2 - 8 / 2 + 1)
  );
  context.fillStyle = WHITE;
  drawCenteredText(
    `${getText("score")}: ${Math.round(score)}`,
    Math.floor(106 + 8 + 28 / 2 - 8 / 2)
  );

  // controls section
  context.globalAlpha = 0.5;
  context.fillStyle = "black";
  context.fillRect(0, 212, GAME_W, 28);
  context.globalAlpha = 1;

  if (getInputAnimation(CONTROLS.decline)) {
    playAnimation(
      getInputAnimation(CONTROLS.decline),
      0,
      QUIT_PROMPT.x - 32,
      212 + 6
    );
  }
  context.fillStyle = WHITE;
  context.fillText(
    getText("quit"),
    QUIT_PROMPT.x,
    Math.floor(212 + 8 + 28 / 2 - 8 / 2)
  );

  if (getInputAnimation(CONTROLS.accept)) {
    playAnimation(
      getInputAnimation(CONTROLS.accept),
      0,
      RESUME_PROMPT.x - 32,
      212 + 6
    );
  }
  context.fillStyle = WHITE;
  context.fillText(
    getText("resume"),
    RESUME_PROMPT.x,
    Math.floor(212 + 8 + 28 / 2 - 8 / 2)
  );
}
