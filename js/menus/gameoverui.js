// TODO: add upgrades to local storage
// TODO: apply upgrades on startup
// TODO: delay average score animation until prompts are done
// TODO: add an unlock upgrade sound + add confirm sound
// TODO: balance unlock progression

const SCORE_SECTION = {
  //   Section
  background_color: "black",
  x: 0,
  y: 35,
  w: GAME_W,
  h: 60,
  padding: 0,
  alpha: 0.3,

  // Score
  score: 0,
  score_bar: {
    x: 0,
    y: 20,
    w: 0,
    h: 20,
    maxW: GAME_W,
    value: 0,
    score_count: 0,
    color: PINK,
    shadow: { color: VIOLET, h: 3, w: 0 },
    text: {
      color: WHITE,
      text: "SCORE: ",
      value: 0,
      x: 36,
      y: 0,
      shadow: { color: VIOLET, x: 0, y: 1 },
    },
    text_size: 16,
  },
};

const SCORE_BLOCK = {
  // block
  color: YELLOW,
  shadow_color: PINK,
  highlight_color: WHITE,
  highlight_w: 4,
  highlight_h: 0,
  x: 0,
  y: GAME_H + 4,
  w: 28,
  h: 0,
  padding: 0,
  alpha: 1,
  score: 100,
  display_score: 0,
  margin_bottom: 6,
  padding_bottom: 4,

  // text
  score_color: WHITE,
  score_shadow_color: PINK,
  text_x: 0,
  text_y: 0,
  text_size: 8,
};

const AVERAGE_SCORE_SECTION = {
  //   Section
  background_color: "black",
  x: 0,
  y: 100,
  w: GAME_W,
  h: 105,
  padding: 6,
  alpha: 0.3,

  // Scores
  scores: [
    { ...SCORE_BLOCK, score: 20 },
    { ...SCORE_BLOCK, score: 10 },
    { ...SCORE_BLOCK, score: 50 },
    { ...SCORE_BLOCK, score: 40 },
    { ...SCORE_BLOCK, score: 30 },
  ],
  spacing: 24,
  score_start_x: 47,

  // Text
  average_score_text: "average",
  text_color: WHITE,
  text_shadow_color: PINK,
  text_x: 0,
  text_y: 0,
};

const OPTIONS_SECTION = {
  //   Section
  background_color: "black",
  x: 0,
  y: 211,
  w: GAME_W,
  h: 105,
  padding_left: 7,
  padding_top: 6,
  alpha: 0.3,

  // text
  text_size: 8,
  retry_text_x: 0,
  quit_text_x: GAME_W,
};

const UNLOCK_PROMPT = {
  x: -GAME_W,
  y: 50,
  w: GAME_W,
  h: 80,
};

function animatePrompt() {
  UNLOCK_PROMPT.x = easingWithRate(UNLOCK_PROMPT.x, 0, 0.2, 0.1);
}

function resetPrompt() {
  UNLOCK_PROMPT.x = -GAME_W;
}

function drawScoreSection(section) {
  // Background
  context.globalAlpha = section.alpha;
  context.fillStyle = section.background_color;
  context.fillRect(section.x, section.y, section.w, section.h);
  context.globalAlpha = 1;

  // Bar
  const barShadow = section.score_bar.shadow;
  const scoreBar = section.score_bar;

  context.fillStyle = barShadow.color;
  context.fillRect(
    scoreBar.x,
    scoreBar.y,
    scoreBar.w,
    scoreBar.h + barShadow.h
  );

  context.fillStyle = scoreBar.color;
  context.fillRect(scoreBar.x, scoreBar.y, scoreBar.w, scoreBar.h);

  const scoreText = scoreBar.text;
  const scoreTextY = scoreBar.y - 1;
  setFontSize(16);

  context.fillStyle = scoreText.shadow.color;
  drawCenteredText(scoreText.text, Math.floor(scoreTextY + scoreText.shadow.y));

  context.fillStyle = scoreText.color;
  drawCenteredText(scoreText.text, Math.floor(scoreTextY));

  // Unlockables
  UNLOCKABLES?.forEach((unlock) => {
    if (UNLOCKED.includes(unlock)) {
      return;
    }
    let x = Math.floor(GAME_W * (unlock.points / points_to_enter_final_boss));
    let y = scoreBar.y - 4;
    context.drawImage(IMAGES["collectible"], x, y);
  });
}

function updateScoreSection(section) {
  // Bar
  const scoreBar = section.score_bar;
  scoreBar.x = section.x;
  scoreBar.y = section.y + section.h / 2 - scoreBar.h / 2;
  let anim_rate = 0.01;
  let tolerance = 0.3;

  let maxValue = points_to_enter_final_boss;
  scoreBar.value = easingWithRate(
    scoreBar.value,
    Math.round(score),
    anim_rate,
    tolerance
  );
  // let remainder = scoreBar.value % maxValue;
  let percentage = scoreBar.value / maxValue;
  percentage = clamp(percentage, 0, 1);
  scoreBar.w = scoreBar.maxW * percentage;

  scoreBar.text.value = easingWithRate(
    scoreBar.text.value,
    Math.round(score),
    anim_rate,
    tolerance
  );
  scoreBar.text.text = "SCORE: " + Math.round(scoreBar.text.value);

  // Unlockables
  UNLOCKABLES?.forEach((unlock, i) => {
    if (UNLOCKED.includes(unlock)) {
      return;
    }
    let x = Math.floor(GAME_W * (unlock.points / points_to_enter_final_boss));
    if (scoreBar.w > x) {
      if (!RECENT_UNLOCKS.includes(unlock)) {
        RECENT_UNLOCKS.push(unlock);
      }
    }
  });
}

function updateAverageScoreSection(section) {
  var text_width = context.measureText(
    getText(section.average_score_text) + ": " + Math.ceil(score)
  ).width;
  section.text_x = section.x + section.w / 2 - text_width / 2;
  section.text_y = 188;

  section.scores.forEach((score_block, i) => {
    // score block
    score_block.x =
      section.x + section.score_start_x + i * (section.spacing + score_block.w);

    // score text
    var score_text_width = context.measureText(String(score_block.score)).width;
    score_block.text_x = score_block.x;
    score_block.text_y =
      score_block.y +
      score_block.h +
      score_block.text_size +
      score_block.margin_bottom;

    // highlight
    score_block.highlight_h = score_block.h - score_block.padding_bottom;
  });

  // animate each score bar in a sequence
  for (let i = 0; i < section.scores.length; i++) {
    if (!animateBar(section.scores[i], section)) {
      break;
    }
  }
}

function animateBar(bar, section) {
  let max_score = Math.max(...section.scores.map((block) => block.score));
  let max_h = 50;
  let percentage = bar.score / max_score;
  let target_h = percentage * max_h;
  let target_y = section.y + section.padding + max_h - target_h;

  bar.h = easingWithRate(bar.h, target_h, 0.3);
  bar.y = easingWithRate(bar.y, target_y, 0.3);
  bar.display_score = easingWithRate(bar.display_score, bar.score, 0.3);

  return Math.ceil(bar.h) == Math.ceil(target_h);
}

function drawAverageScoreSection(section) {
  // Background
  context.globalAlpha = section.alpha;
  context.fillStyle = section.background_color;
  context.fillRect(section.x, section.y, section.w, section.h);
  context.globalAlpha = 1;

  // Draw score blocks
  section.scores.forEach((score_block) => {
    // base
    context.fillStyle = score_block.color;
    context.fillRect(
      section.x + score_block.x,
      score_block.y,
      score_block.w,
      score_block.h
    );

    // highlight
    context.fillStyle = score_block.highlight_color;
    context.fillRect(
      section.x + score_block.x + 2,
      score_block.y + 2,
      score_block.highlight_w,
      score_block.highlight_h
    );

    // shadow
    context.fillStyle = score_block.shadow_color;
    context.fillRect(
      section.x + score_block.x,
      score_block.y + score_block.h,
      score_block.w,
      2
    );

    // text
    context.font = `${score_block.text_size}px PressStart2P`;
    context.fillStyle = score_block.score_color;
    context.fillText(
      Math.floor(score_block.display_score),
      score_block.text_x,
      score_block.text_y
    );
  });

  // Draw main text
  let scores = section.scores.map((block) => block.score);
  let average = getAverageScore(scores);
  context.font = "16px PressStart2P";
  context.fillStyle = section.text_shadow_color;
  context.fillText(
    getText(section.average_score_text) + ": " + Math.ceil(average),
    section.text_x,
    section.text_y + 9
  );
  context.fillStyle = section.text_color;
  context.fillText(
    getText(section.average_score_text) + ": " + Math.ceil(average),
    section.text_x,
    section.text_y + 8
  );
}

function drawOptionsSection(section) {
  // Background
  context.globalAlpha = section.alpha;
  context.fillStyle = section.background_color;
  context.fillRect(section.x, section.y, section.w, section.h);
  context.globalAlpha = 1;

  // Text
  context.font = `${section.text_size} PressStart2P`;
  context.fillStyle = WHITE;
  context.fillText(
    getText("retry") + ":",
    section.retry_text_x + section.padding_left,
    section.y + section.text_size * 2 + section.padding_top
  );
  playAnimation(
    getInputAnimation(CONTROLS.accept),
    0,
    section.retry_text_x +
      section.padding_left +
      context.measureText(getText("retry")).width +
      16,
    section.y + section.padding_top
  );

  var text_width = context.measureText(getText("quit") + ":").width;
  var icon_width = getInputAnimation(CONTROLS.decline).frames[0].w;
  section.quit_text_x = GAME_W - section.padding_left - text_width - icon_width;
  context.fillText(
    getText("quit") + ":",
    section.quit_text_x,
    section.y + section.text_size * 2 + section.padding_top
  );
  playAnimation(
    getInputAnimation(CONTROLS.decline),
    0,
    section.quit_text_x + text_width,
    section.y + section.padding_top
  );
}

function drawUnlockPrompt(unlock) {
  let border_width = 2;

  // OVERLAY
  context.fillStyle = DARK_OVERLAY;
  context.fillRect(0, 0, GAME_W, GAME_H);

  // BORDER
  // border shadow
  context.fillStyle = PINK;
  context.fillRect(
    UNLOCK_PROMPT.x - border_width,
    UNLOCK_PROMPT.y - border_width,
    UNLOCK_PROMPT.w + border_width * 2,
    UNLOCK_PROMPT.h + border_width * 2 + 1
  );

  // yellow border
  context.fillStyle = YELLOW;
  context.fillRect(
    UNLOCK_PROMPT.x - border_width,
    UNLOCK_PROMPT.y - border_width,
    UNLOCK_PROMPT.w + border_width * 2,
    UNLOCK_PROMPT.h + border_width * 2
  );

  // border highlight
  context.fillStyle = WHITE;
  context.fillRect(
    UNLOCK_PROMPT.x - border_width,
    UNLOCK_PROMPT.y - border_width,
    UNLOCK_PROMPT.w / 2,
    UNLOCK_PROMPT.h / 2
  );
  context.fillRect(
    UNLOCK_PROMPT.x + UNLOCK_PROMPT.w / 2 + border_width,
    UNLOCK_PROMPT.y + UNLOCK_PROMPT.h / 2 + border_width,
    UNLOCK_PROMPT.w / 2,
    UNLOCK_PROMPT.h / 2
  );

  // BG
  context.fillStyle = VIOLET;
  context.fillRect(
    UNLOCK_PROMPT.x + border_width,
    UNLOCK_PROMPT.y,
    UNLOCK_PROMPT.w - border_width * 2,
    UNLOCK_PROMPT.h
  );

  // HEADER
  context.fillStyle = DARK_OVERLAY;
  context.fillText(
    unlock.name,
    GAME_W / 2 - getTextWidth(unlock.name) / 2 + UNLOCK_PROMPT.x,
    UNLOCK_PROMPT.y + 34
  );

  context.fillStyle = PINK;
  context.fillText(
    unlock.name,
    GAME_W / 2 - getTextWidth(unlock.name) / 2 + UNLOCK_PROMPT.x,
    UNLOCK_PROMPT.y + 33
  );

  context.fillStyle = WHITE;
  context.fillText(
    unlock.name,
    GAME_W / 2 - getTextWidth(unlock.name) / 2 + UNLOCK_PROMPT.x,
    UNLOCK_PROMPT.y + 32
  );

  // DESCRIPTION
  if (unlock.description) {
    context.font = `8px PressStart2P`;
    context.fillStyle = WHITE;
    context.fillText(
      unlock.description,
      GAME_W / 2 - getTextWidth(unlock.description) / 2 + UNLOCK_PROMPT.x,
      UNLOCK_PROMPT.y + 64
    );
  }
}
