// LOOP FUNCTIONS
function update(dt) {
  if (image_loading_error || sound_loading_error) {
    return;
  }

  if (!images_loaded || !sounds_loaded) {
    return;
  }

  particles.update();

  // MUSIC
  updateMusic();

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

  // SCREEN WRAP FOR PARALLAX BACKGROUNDS
  updateBackground();

  // PLAYER MOVEMENT
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

  // OBJECT COLLECTIONS
  var enemies = GAME_OBJECTS.filter((obj) => obj.type === "enemy");
  var collectibles = GAME_OBJECTS.filter((obj) => obj.type === "collect");
  var blocks = GAME_OBJECTS.filter((obj) => obj.type === "floor");
  var bullets = GAME_OBJECTS.filter((obj) => obj.type === "bullet");
  var text = GAME_OBJECTS.filter((obj) => obj.type === "text");

  // SHIELD
  var shield = GAME_OBJECTS.find((obj) => obj.type === "shield");
  if (shield) {
    rotateShield(shield); // updates shield timer
  }

  if (shield && shield_timer > 80) {
    despawnShield(shield);
  }

  // SCORE
  updateScore();

  // COLLECTIBLE SPAWNS
  if (collectibles.length <= 0) {
    collect_spawn_timer--;
  }

  if (collect_spawn_timer <= 0) {
    spawnCollectible();
    playSoundEffect("collect_spawn");
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

  // UPDATE OBJECT COLLECTIONS
  bullets.forEach((bullet) => moveInOwnDirection(bullet));
  enemies.forEach((enemy) => {
    screenwrap(enemy);
    moveInOwnDirection(enemy);
    enemy.x = Math.floor(enemy.x);
    enemy.y = Math.floor(enemy.y);
  });
  text.forEach((txt) => {
    txt.y -= txt.speed;
    if (txt.alpha <= 0) {
      removeObj(txt);
    }
  });

  // JUMPING
  // coyote time
  if (PLAYER.hit_ground_last_frame) {
    PLAYER.coyote_time_counter = PLAYER.coyote_time;
  } else {
    PLAYER.coyote_time_counter -= 0.1;
  }

  if (
    onHold(CONTROLS.jump) &&
    (PLAYER.coyote_time_counter > 0 || PLAYER.jumping)
  ) {
    if (PLAYER.hit_ground) {
      PLAYER.jumping = true;
      fall_fx(PLAYER.x, PLAYER.y);
      // uncomment this function to see where the player jumped (if on ground)
      // spawnObject(
      //   {
      //     x: PLAYER.x,
      //     y: PLAYER.y,
      //     h: PLAYER.h,
      //     w: PLAYER.w,
      //     color: "red",
      //     render_hitbox: true,
      //   },
      //   PLAYER.x,
      //   PLAYER.y
      // );
    }
    jump(PLAYER);
  }

  if (onRelease(CONTROLS.jump)) {
    PLAYER.jumping = false;
    PLAYER.coyote_time_counter = 0;
  }

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
  PLAYER.hit_ground = false;
  blocks.forEach((block) => {
    if (collisionDetected(block, PLAYER)) {
      PLAYER.hit_ground = true;
      PLAYER.jumping = false;
      PLAYER.hang_time = PLAYER_DEFAULT.hang_time;
      PLAYER.jump_height = PLAYER_DEFAULT.jump_height;
      PLAYER.jump_rate = PLAYER_DEFAULT.jump_rate;
      if (!PLAYER.hit_ground_last_frame) fall_fx(PLAYER.x, PLAYER.y);
      PLAYER.y = PLAYER.prev_y;
    }

    const leftBox = getHitbox(PLAYER, "left");
    const rightBox = getHitbox(PLAYER, "right");

    if (
      collisionDetected(block, leftBox) ||
      collisionDetected(block, rightBox)
    ) {
      PLAYER.hit_wall = true;
      PLAYER.x = PLAYER.prev_x;
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

      playSoundEffect("collect");

      let new_text_obj = spawnObject(TEXT_OBJECT, PLAYER.x, PLAYER.y);
      new_text_obj.text = PICKUP_TEXT[coll.pickup].toUpperCase();
      if (new_text_obj.text === PICKUPS.POINTS.toUpperCase()) {
        new_text_obj.text = "+" + coll.points;
      }

      if (coll.pickup !== PICKUPS.HP || coll.pickup !== PICKUPS.POINTS) {
        PLAYER.powerup = coll.pickup;
      }
    }

    // floating animation
    coll.y = coll.y + Math.sin(coll.life_timer * 0.1) * 0.5;
  });

  // bullet to enemy
  bullets.forEach((bullet) => {
    enemies.forEach((enemy) => {
      if (collisionDetected(enemy, bullet)) {
        removeObj(enemy);
        if (start_combo) {
          multiplier += 1;
          multiplier_timer = 200;
        }
        score += enemy_point_value * multiplier;
        let text_object = spawnObject(TEXT_OBJECT, enemy.x, enemy.y);
        text_object.text = "+" + enemy_point_value + " x " + multiplier;
        explosion(enemy.x, enemy.y);
        start_combo = true;
      }
    });
  });

  if (start_combo) {
    multiplier_timer -= 1;
  }

  if (multiplier_timer <= 0) {
    start_combo = false;
    multiplier = 1;
    multiplier_timer = 200;
  }

  // enemies
  enemies.forEach((enemy) => {
    // enemy to player
    if (collisionDetected(enemy, PLAYER)) {
      if (!PLAYER.hit) {
        PLAYER.hp -= 1;
        removeObj(enemy);
        playSoundEffect("lose_hp");
      }
      PLAYER.hit = true;
      PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
      explosion(PLAYER.x, PLAYER.y);
    }

    // enemy to shield
    if (shield && collisionDetected(enemy, shield)) {
      removeObj(enemy);
      PLAYER.screenshakesRemaining = PLAYER_HIT_SCREENSHAKES;
      explosion(shield.x, shield.y);
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
  screenwrap(PLAYER);

  // HITBOXES
  updateHitboxes(PLAYER);

  // TRACKING
  // track all game objects and their previous positions
  GAME_OBJECTS.forEach((obj) => {
    assignId(obj);
    storePreviousPosition(obj);
  });

  // END OF FRAME CLEANUP
  // round player's y movement to prevent blurriness when jumping/falling
  PLAYER.y = Math.floor(PLAYER.y);

  // store whether or not the player hit the ground in this frame,
  // use on next frame to determine if we render a dust effect
  PLAYER.hit_ground_last_frame = PLAYER.hit_ground;
  PLAYER.hit_wall = false;

  checkForGameOver();
}

function draw(offset) {
  context.globalAlpha = 1;
  context.fillStyle = PURPLE;
  context.fillRect(0, 0, GAME_W, GAME_H);

  // ERROR MESSAGES
  if (image_loading_error) {
    drawErrorMessage(ERROR_MESSAGES.IMAGE_LOADING_ERROR);
    return;
  }

  if (sound_loading_error) {
    drawErrorMessage(ERROR_MESSAGES.SOUND_LOADING_ERROR);
    return;
  }

  // LOADING SCREEN
  if (!images_loaded || !sounds_loaded) {
    context.fillStyle = WHITE;
    context.fillText("Loading assets...", GAME_W / 2 - 50, 10);
    return;
  }

  // SCREENSHAKE
  updateScreenshake();

  // PARTICLES
  particles.draw();

  // GAME/PAUSE
  if (game_state === STATES.GAME || game_state === STATES.PAUSE) {
    // BACKGROUND
    if (images_loaded) {
      context.drawImage(IMAGES["background_1"], BACKGROUND_1.x, BACKGROUND_1.y);
      context.drawImage(IMAGES["background_2"], BACKGROUND_2.x, BACKGROUND_2.y);
      context.drawImage(IMAGES["background_3"], BACKGROUND_3.x, BACKGROUND_3.y);
    }

    // DRAW OBJECTS
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

    // DRAW SCORE
    context.fillStyle = WHITE;
    context.fillText(
      `${getText("score")}: ${Math.round(score * 100) / 100}`,
      GAME_W / 2,
      10
    );

    // DRAW PLAYER HP
    for (i = 0; i < PLAYER.hp; i++) {
      context.fillStyle = WHITE;
      context.fillRect(GAME_W / 2 + 16 * i, 20, 8, 16);
    }
  }

  // DRAW PAUSE SCREEN
  if (game_state === STATES.PAUSE) {
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

  // DRAW GAME OVER SCREEN
  if (game_state === STATES.GAME_OVER) {
    context.fillStyle = WHITE;

    drawCenteredText(
      `${getText("score")}: ${Math.round(score * 100) / 100}`,
      50
    );

    drawCenteredText(
      `${getText("average_score")}: ${
        Math.round(getAverageScore() * 100) / 100
      }`,
      75
    );

    drawCenteredText(`${getText("retry")}: ${getText("press_enter")}`, 100);

    drawCenteredText(`${getText("quit")}: PRESS ESC`, 125);
  }

  // DRAW CURRENT MENU
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
