// LOOP FUNCTIONS
function update(deltaTime) {
  game_timer += 1;
  dt = deltaTime;

  // ERROR MESSAGES
  if (image_loading_error || sound_loading_error) {
    return;
  }

  if (!images_loaded || !sounds_loaded) {
    return;
  }

  // PARTICLE SYSTEM
  particles.update();

  // MUSIC
  updateMusic();

  // PARALLAX BACKGROUNDS
  updateBackground();

  // MENU NAVIGATION/INTERACTION
  if (game_state === STATES.MENU) {
    updateMenuNavigation();
    getCurrentMenu().update();
    return;
  }

  if (game_state === STATES.INTRO) {
    INTRO_SEQUENCE.update();
    return;
  }

  if (game_state === STATES.GAME_OVER) {
    updateGameOverScreen();
    return;
  }

  // PAUSING
  if (game_state === STATES.GAME) {
    pauseGame();
  }

  // ==============
  // --- DEBUG ---
  // ==============
  if (onPress(CONTROLS.autoKill) && debug_mode) {
    resetGame();
  }

  // ==============
  // --- PLAYER ---
  // ==============
  // PLAYER MOVEMENT
  playerMove();

  // SHOOTING
  playerShoot();

  // JUMPING
  playerJump();

  // ANIMATIONS
  PLAYER.animation = getAnimationDirection(PLAYER);

  // POWERUPS
  checkPlayerPowerup();

  // IFRAME COUNTER
  updateIFrameCounter();

  // SCREEN WRAPPING
  screenwrap(PLAYER);

  // HITBOXES
  updateHitboxes(PLAYER);

  // SHIELD
  var shield = GAME_OBJECTS.find((obj) => obj.type === "shield");
  if (shield) {
    rotateShield(shield); // updates shield timer
  }

  if (shield && shield_timer > 80) {
    despawnShield(shield);
  }

  // ====================
  // --- GAME OBJECTS ---
  // ====================
  // OBJECT COLLECTIONS
  var enemies = GAME_OBJECTS.filter((obj) => obj.type === "enemy");
  var collectibles = GAME_OBJECTS.filter((obj) => obj.type === "collect");
  var blocks = GAME_OBJECTS.filter((obj) => obj.type === "floor");
  var bullets = GAME_OBJECTS.filter((obj) => obj.type === "bullet");
  var text = GAME_OBJECTS.filter((obj) => obj.type === "text");
  var explosions = GAME_OBJECTS.filter((obj) => obj.type === "explosion");

  // UPDATE OBJECT COLLECTIONS
  updateShots(bullets);
  updateEnemies(enemies);
  updateText(text);
  updateExplosions(explosions);
  updatePlatforms(blocks);

  // COLLECTIBLE SPAWNS
  updateCollectibleSpawnTimer(collectibles);

  // ENEMY SPAWNS
  updateEnemySpawnTimer(enemies);

  // ==============
  // --- PHYSICS ---
  // ==============
  // PHYSICS
  applyGravityToObjects();

  PLAYER.y -= PLAYER.y_velocity;

  // COLLISION CHECKS
  // player to block
  PLAYER.hit_ground = false;
  blocks.forEach((block) => {
    if (block.destroyed) return;
    if (collisionDetected(block, PLAYER)) {
      PLAYER.hit_ground = true;
      PLAYER.jumping = false;
      PLAYER.hang_time = PLAYER_DEFAULT.hang_time;
      PLAYER.jump_height = PLAYER_DEFAULT.jump_height;
      PLAYER.y_velocity = PLAYER_DEFAULT.y_velocity;
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
        if (enemy.hp) {
          enemy.hp -= 1;
          explosion(bullet.x, bullet.y);
          removeObj(bullet);
          enemy.hit = true;
          enemy.i_frames = 4;
        }

        if (!enemy.hp || enemy.hp <= 0) {
          removeObj(enemy);
          if (start_combo) {
            multiplier += 1;
            multiplier_timer = 200;
          }
          score += enemy_point_value * multiplier;
          let text_object = spawnObject(TEXT_OBJECT, enemy.x, enemy.y);
          text_object.text = "+" + enemy_point_value + " x " + multiplier;
          explosion(enemy.x, enemy.y);
        }

        if (bullet.exploding) {
          spawnObject(EXPLOSION, enemy.x, enemy.y);
        }

        start_combo = true;
      }
    });

    blocks.forEach((block) => {
      if (block.destroyed) return;
      if (collisionDetected(block, bullet) && bullet.exploding) {
        explosion(block.x, block.y);
        spawnObject(EXPLOSION, bullet.x, bullet.y);
        removeObj(bullet);
        block.destroyed = true;
      }
    });
  });

  // enemies
  enemies.forEach((enemy) => {
    // check if enemy is close to player
    let player_center = {
      x: PLAYER.x + PLAYER.w / 2,
      y: PLAYER.y + PLAYER.h / 2,
    };
    const ENEMY_TYPE = ENEMIES.find((e) => e.name === enemy.name);
    if (getDistance(enemy, player_center) <= PLAYER.enemy_detection_range) {
      enemy.speed = easing(enemy.speed, ENEMY_TYPE.speed * 0.5);
      enemy.fall_rate = easing(enemy.fall_rate, ENEMY_TYPE.fall_rate * 0.5);
    } else {
      enemy.speed = easing(enemy.speed, ENEMY_TYPE.speed);
      enemy.fall_rate = easing(enemy.fall_rate, ENEMY_TYPE.fall_rate);
    }

    // enemy to player
    if (collisionDetected(enemy, PLAYER)) {
      if (!PLAYER.hit && !invincible_mode) {
        PLAYER.hp -= 1;
        playSoundEffect("lose_hp");
      }
      removeObj(enemy);
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

    // enemy to block
    blocks.forEach((block) => {
      if (block.destroyed) return;
      if (collisionDetected(block, enemy)) {
        if (enemy.exploding) {
          // destroy platform and add a copy to the missing platforms array
          removeObj(enemy);
          explosion(enemy.x, enemy.y);
          block.destroyed = true;
        }

        if (enemy.solid) {
          // stop vertical movement
          // FIXME: hitboxes need smoother cornering
          // block.hitboxes.forEach((box) => {
          //   let block_box = {
          //     x: block.x + box.x,
          //     y: block.y + box.y,
          //     h: box.h,
          //     w: box.w,
          //   };

          //   if (
          //     (box.name === "left" || box.name === "right") &&
          //     collisionDetected(block_box, enemy)
          //   ) {
          //     console.log("HIT SIDE");
          //     enemy.x = enemy.prev_x;
          //   }

          //   if (box.name === "top" && collisionDetected(block_box, enemy)) {
          //     console.log("HIT TOP");
          //   }
          // });
          enemy.y = enemy.prev_y;
        }
      }
    });
  });

  explosions.forEach((exp) => {
    enemies.forEach((enemy) => {
      if (collisionWithCircleDetected(exp, enemy)) {
        explosion(enemy.x, enemy.y);
        removeObj(enemy);
      }
    });
    blocks.forEach((block) => {
      if (block.destroyed) return;
      if (collisionWithCircleDetected(exp, block)) {
        explosion(block.x, block.y);
        block.destroyed = true;
        start_platform_spawn_timer = true;
      }
    });
  });

  // ===============
  // --- SCORING ---
  // ===============
  // SCORE
  updateScore();

  // COMBOS
  updateComboTimer();

  // ============================
  // --- END OF FRAME CLEANUP ---
  // ============================
  // TRACKING
  // track all game objects and their previous positions
  trackPositionsOfObjects();

  // store whether or not the player hit the ground in this frame,
  // use on next frame to determine if we render a dust effect
  PLAYER.hit_ground_last_frame = PLAYER.hit_ground;
  PLAYER.hit_wall = false;
  updateTimeScale();
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
  drawBackground();

  // GAME INTRO
  if (game_state === STATES.INTRO) {
    INTRO_SEQUENCE.draw();
    return;
  }

  // GAME/PAUSE
  if (game_state === STATES.GAME || game_state === STATES.PAUSE) {
    drawObjects();

    drawScore();

    drawHP();
  }

  // DRAW PAUSE SCREEN
  if (game_state === STATES.PAUSE) {
    drawPauseScreen();
  }

  // DRAW GAME OVER SCREEN
  if (game_state === STATES.GAME_OVER) {
    drawGameOverScreen();
  }

  // DRAW CURRENT MENU
  if (game_state === STATES.MENU) {
    context.fillStyle = WHITE;
    getCurrentMenu().draw();
  }
}

// CORE GAME LOOP
// fixed time-step loop with variable rendering
function loop() {
  current_time = Date.now();
  let elapsed = current_time - start_time;
  start_time = current_time;
  lag += elapsed;

  inputListener();

  if (game_state === STATES.PAUSE) {
    if (onPress(CONTROLS.start)) {
      game_state = STATES.GAME;
    }
  } else {
    var processedOnce = false; // Makes sure we can't skip inputs if the framerate is very high
    while (lag > frame_duration || !processedOnce) {
      processedOnce = true;
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
MENU_STACK.push(getMenu("mainMenu"));
startGame();

loop();
