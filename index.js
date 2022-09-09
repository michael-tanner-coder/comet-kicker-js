// LOOP FUNCTIONS
function update(dt) {
  if (image_loading_error || sound_loading_error) {
    return;
  }

  if (!images_loaded || !sounds_loaded) {
    return;
  }

  particles.update();

  // if (!song_playing) {
  //   current_song = playMusic(current_song_name);
  // }

  // if (current_song) {
  //   console.log("current_song:");
  //   console.log(current_song.sound);
  //   console.log(current_song.volume);
  //   current_song.sound.volume = music_volume / 10;
  // }

  // MENU NAVIGATION/INTERACTION
  if (game_state === STATES.MENU) {
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

    return;
  }

  if (game_state === STATES.GAME_OVER) {
    if (onPress(CONTROLS.start)) {
      game_state = STATES.GAME;
      score = 0;
    }

    if (onPress(CONTROLS.select)) {
      game_state = STATES.MENU;
    }

    return;
  }

  if (game_state === STATES.GAME) {
    if (onPress(CONTROLS.pause)) {
      game_state = STATES.PAUSE;
    }
  }

  if (PLAYER.hp <= 0) {
    resetGame();
    playSound(SOUNDS["game_over"]);
  }

  PLAYER.state = PLAYER_STATES.IDLE;

  // SCREEN WRAP FOR PARALLAX BACKGROUNDS
  BACKGROUNDS.forEach((bg) => {
    bg.x += bg.speed;
    if (bg.x > GAME_W) {
      bg.x = -1 * GAME_W;
    }
  });

  let prev_x = PLAYER.x;
  let prev_y = PLAYER.y;

  let max_speed = 5;

  if (onHold(CONTROLS.moveRight)) {
    PLAYER.speed = easing(PLAYER.speed, max_speed);
    PLAYER.x += PLAYER.speed * time_scale;
    PLAYER.direction = 0;
    PLAYER.state = PLAYER_STATES.RUNNING;
  }

  if (onHold(CONTROLS.moveLeft)) {
    PLAYER.speed = easing(PLAYER.speed, max_speed);
    PLAYER.x -= PLAYER.speed * time_scale;
    PLAYER.direction = 180;
    PLAYER.state = PLAYER_STATES.RUNNING;
  }

  if (onRelease(CONTROLS.moveLeft) || onRelease(CONTROLS.moveRight)) {
    PLAYER.speed = PLAYER_DEFAULT.speed;
  }

  var enemies = GAME_OBJECTS.filter((obj) => obj.type === "enemy");
  var collectibles = GAME_OBJECTS.filter((obj) => obj.type === "collect");

  // SHIELD
  var shield = GAME_OBJECTS.find((obj) => obj.type === "shield");
  if (shield) {
    shield.x = PLAYER.x + PLAYER.w / 2 + Math.sin(shield_timer) * 18;
    shield.y = PLAYER.y + PLAYER.h / 2 + Math.cos(shield_timer) * 16;
    shield_timer += 0.1;
  }

  if (shield && shield_timer > 80) {
    shield_timer = 0;
    PLAYER.powerup = "";
    removeObj(shield);
    playSound(SOUNDS["shield_hit"]);
  }

  // SCORE DECREMENT
  score -= 0.1;
  if (score <= 0) {
    score = 0;
  }

  // COLLECTIBLE SPAWNS
  if (collectibles.length <= 0) {
    collect_spawn_timer--;
  }

  if (collect_spawn_timer <= 0) {
    spawnCollectible();
    playSound(SOUNDS["collect_spawn"]);
    collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;
  }

  // ENEMY SPAWNS
  if (enemies.length < SPAWN_LIMIT) {
    spawn_timer--;
  }

  if (spawn_timer <= 0) {
    spawnEnemy();
    spawn_timer = MAX_SPAWN_TIMER;
  }

  // SHOOTING
  if (!shot_fired) {
    shot_timer--;
  }

  if (shot_fired) {
    shot_timer = MAX_SHOT_TIMER;
    shot_fired = false;
  }

  if (shot_timer <= 0 && onPress(CONTROLS.shoot)) {
    spawnBullet(PLAYER, PLAYER.direction, PLAYER.bullet_type);
    playSound(SOUNDS["shoot"]);
    PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
    shot_fired = true;
  }

  var blocks = GAME_OBJECTS.filter((obj) => obj.type === "floor");
  var bullets = GAME_OBJECTS.filter((obj) => obj.type === "bullet");
  var text = GAME_OBJECTS.filter((obj) => obj.type === "text");

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
  text.forEach((txt) => {
    txt.y -= txt.speed;
    if (txt.alpha <= 0) {
      removeObj(txt);
    }
  });

  // ANIMATIONS
  PLAYER.animation = getPlayerAnimation();

  // POWERUPS
  checkPlayerPowerup();

  // PHYSICS LOOP
  GAME_OBJECTS.forEach((obj) => {
    if (obj.has_gravity) {
      obj.y += GRAVITY * time_scale;
    }
  });

  // COLLISION CHECKS

  // player to block
  blocks.forEach((block) => {
    if (collisionDetected(block, PLAYER)) {
      hit_ground = true;
      if (!hit_ground_last_frame) fall_fx(PLAYER.x, PLAYER.y);
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
      checkPickupType(coll);
      removeObj(coll);
      playSound(SOUNDS["collect"]);
      let new_text_obj = spawnObject(TEXT_OBJECT, PLAYER.x, PLAYER.y);
      new_text_obj.text = PICKUP_TEXT[coll.pickup].toUpperCase();
      if (new_text_obj.text === PICKUPS.POINTS.toUpperCase()) {
        new_text_obj.text = "+" + coll.points;
      }
    }
  });

  // bullet to enemy
  bullets.forEach((bullet) => {
    enemies.forEach((enemy) => {
      if (collisionDetected(enemy, bullet)) {
        removeObj(enemy);
        score += enemy_point_value;
        sparkle_fx(enemy.x, enemy.y);
        smoke_fx(enemy.x, enemy.y);
        fire_fx(enemy.x, enemy.y);
        playSound(SOUNDS["explode"]);
      }
    });
  });

  // enemies
  enemies.forEach((enemy) => {
    // enemy to player
    if (collisionDetected(enemy, PLAYER)) {
      if (!PLAYER.hit) {
        removeObj(enemy);
        PLAYER.hp -= 1;
      }
      PLAYER.hit = true;
      PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
      sparkle_fx(PLAYER.x, PLAYER.y);
      smoke_fx(PLAYER.x, PLAYER.y);
      fire_fx(PLAYER.x, PLAYER.y);
      playSound(SOUNDS["explode"]);
    }

    // enemy to shield
    if (shield && collisionDetected(enemy, shield)) {
      removeObj(enemy);
      PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
      sparkle_fx(PLAYER.x, PLAYER.y);
      smoke_fx(PLAYER.x, PLAYER.y);
      fire_fx(PLAYER.x, PLAYER.y);
      playSound(SOUNDS["explode"]);
    }
  });

  // IFRAME COUNTER
  if (PLAYER.hit) {
    PLAYER.i_frames--;
  }

  if (PLAYER.i_frames <= 0) {
    PLAYER.i_frames = PLAYER_DEFAULT.i_frames;
    PLAYER.hit = false;
  }

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

  hit_ground_last_frame = hit_ground;
  hit_ground = false;
  hit_wall = false;

  GAME_OBJECTS.forEach((obj) => {
    assignId(obj);
    storePreviousPosition(obj);
  });
}

function updateScreenshake() {
  if (PLAYER.screenshakesRemaining) {
    // starts max size and gets smaller
    let wobble = Math.round(
      (PLAYER.screenshakesRemaining / PLAYER_HIT_SCREENSHAKES) *
        SCREENSHAKE_MAX_SIZE
    );
    if (PLAYER.screenshakesRemaining % 4 < 2) wobble *= -1; // alternate left/right every 2 frames
    context.setTransform(1, 0, 0, 1, wobble, 0);
    PLAYER.screenshakesRemaining--;
  } else {
    context.setTransform(1, 0, 0, 1, 0, 0); // reset
  }
}

function draw(offset) {
  context.globalAlpha = 1;
  context.fillStyle = PURPLE;
  context.fillRect(0, 0, GAME_W, GAME_H);

  if (image_loading_error) {
    context.fillStyle = WHITE;
    context.fillText(ERROR_MESSAGES.IMAGE_LOADING_ERROR, GAME_W / 2 - 100, 10);
    context.fillText(ERROR_MESSAGES.CHECK_CONSOLE, GAME_W / 2 - 100, 25);
    return;
  }

  if (sound_loading_error) {
    context.fillStyle = WHITE;
    context.fillText(ERROR_MESSAGES.SOUND_LOADING_ERROR, GAME_W / 2 - 100, 10);
    context.fillText(ERROR_MESSAGES.CHECK_CONSOLE, GAME_W / 2 - 100, 25);
    return;
  }

  if (!images_loaded || !sounds_loaded) {
    context.fillStyle = WHITE;
    context.fillText("Loading assets...", GAME_W / 2 - 50, 10);
    return;
  }

  updateScreenshake();
  particles.draw();

  if (game_state === STATES.GAME || game_state === STATES.PAUSE) {
    if (images_loaded) {
      context.drawImage(IMAGES["background_1"], BACKGROUND_1.x, BACKGROUND_1.y);
      context.drawImage(IMAGES["background_2"], BACKGROUND_2.x, BACKGROUND_2.y);
      context.drawImage(IMAGES["background_3"], BACKGROUND_3.x, BACKGROUND_3.y);
    }

    GAME_OBJECTS.forEach((obj) => {
      if (obj.has_trail) {
        drawTrail(obj);
      }

      if (obj.type === "text") {
        context.fillStyle = obj.color;
        context.globalAlpha = obj.alpha;
        context.fillText(obj.text, obj.x, obj.y);
        obj.alpha -= 0.02;
        context.globalAlpha = 1;
      }

      if (obj.render_hitbox || render_hitboxes) {
        context.fillStyle = obj.color;
        context.fillRect(obj.x, obj.y, obj.w, obj.h);
      }

      if (images_loaded && obj.sprite) {
        context.drawImage(IMAGES[obj.sprite], obj.x, obj.y);
      }

      if (obj.hit && obj.i_frames % 2 === 0) {
        context.fillStyle = WHITE;
        context.fillRect(obj.x, obj.y, obj.w, obj.h);
      }

      if (images_loaded && obj.animation) {
        playAnimation(obj.animation, obj.animation_speed || 1, obj.x, obj.y);
      }
    });

    context.fillStyle = WHITE;
    context.fillText(
      `${getText("score")}: ${Math.round(score * 100) / 100}`,
      GAME_W / 2,
      10
    );

    for (i = 0; i < PLAYER.hp; i++) {
      context.fillStyle = WHITE;
      context.fillRect(GAME_W / 2 + 16 * i, 20, 8, 16);
    }
  }

  if (game_state === STATES.PAUSE) {
    context.globalAlpha = 0.5;
    context.fillStyle = "black";
    context.fillRect(0, 0, GAME_W, GAME_H);

    context.globalAlpha = 1;
    context.fillStyle = WHITE;
    context.fillText(getText("game_paused"), GAME_W / 2 - 90, 100);
    context.fillText(getText("press_enter_to_continue"), GAME_W / 2 - 90, 150);
  }

  if (game_state === STATES.GAME_OVER) {
    context.fillStyle = WHITE;
    drawCenteredText(
      `${getText("score")}: ${Math.round(score * 100) / 100}`,
      50
    );
    drawCenteredText(`${getText("retry")}: ${getText("press_enter")}`, 100);
    drawCenteredText(`${getText("quit")}: PRESS ESC`, 150);
  }

  if (game_state === STATES.MENU) {
    titlescreenFX();
    context.fillStyle = WHITE;
    renderMenu(getCurrentMenu());
  }
}

// CORE GAME LOOP
// fixed time-step loop with variable rendering
function loop() {
  let current_time = Date.now();
  let elapsed = current_time - start_time;
  start_time = current_time;
  lag += elapsed;

  gamepadListener();
  inputListener();

  if (game_state === STATES.PAUSE) {
    if (onPress(CONTROLS.start)) {
      game_state = STATES.GAME;
    }
  } else {
    while (lag > frame_duration) {
      update(elapsed);
      lag -= 1000 / fps;
      if (lag < 0) lag = 0;
    }
  }

  var lag_offset = lag / frame_duration;
  draw(lag_offset);

  window.requestAnimationFrame(loop);
}

// INIT
startGame();

loop();
