// higher level abstractions for all of the core logic that runs in the game loop
// UPDATE LOGIC
// sound
function updateMusic() {
  if (!song_playing) {
    current_song = playMusic(current_song_name);
  }

  if (current_song) {
    current_song.volume.gain.value = music_volume / 10;
  }
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
    playSound(SOUNDS["game_over"]);
  }
}

// powerups
function rotateShield(shield) {
  shield.x = PLAYER.x + PLAYER.w / 2 + Math.sin(shield_timer) * 18;
  shield.y = PLAYER.y + PLAYER.h / 2 + Math.cos(shield_timer) * 16;
  shield_timer += 0.1;
  shield.x = Math.floor(shield.x);
  shield.y = Math.floor(shield.y);
}

function despawnShield(shield) {
  shield_timer = 0;
  PLAYER.powerup = PLAYER_DEFAULT.powerup;
  shield_spawned = false;
  removeObj(shield);
  playSound(SOUNDS["shield_hit"]);
}

// score
function updateScore() {
  score -= 0.1;
  if (score <= 0) {
    score = 0;
  }
}

// DRAW LOGIC
