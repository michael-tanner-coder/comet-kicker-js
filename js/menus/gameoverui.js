const GOAL = {
  points: 0,
  x: 0,
  y: 0,
  h: 28,
  w: 2,
  color: WHITE,
  shadow: { x: 0, y: 0, w: 0, h: 0, color: "black" },
  underside: { color: YELLOW, size: 0 },
  text: {
    x: 0,
    y: 0,
    default_text: "goal",
    reached_text: "reached goal!",
    text: "goal",
    color: WHITE,
    shadow: { x: 0, y: 0, w: 0, h: 0, color: "black" },
    outline: { size: 0, color: VIOLET },
    text_size: 6,
  },
};

function newGoal(goal = {}) {
  return JSON.parse(JSON.stringify(goal));
}

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
    text_size: 12,
  },

  //   Goals
  goals: [
    newGoal({ ...GOAL, y: 47, points: 250 }),
    newGoal({ ...GOAL, y: 47, points: 500 }),
    newGoal({ ...GOAL, y: 47, points: 750 }),
  ],
};

const SCORE_BLOCK = {
  // block
  color: YELLOW,
  shadow_color: PINK,
  highlight_color: WHITE,
  highlight_w: 4,
  highlight_h: 0,
  x: 0,
  y: GAME_H,
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
  const scoreTextX = scoreText.x;
  const scoreTextY =
    scoreBar.y + scoreText.y + scoreBar.h / 2 + scoreBar.text_size / 2;
  setFont(scoreBar.text_size);

  context.fillStyle = scoreText.shadow.color;
  context.fillText(
    scoreText.text,
    scoreTextX + scoreText.shadow.x,
    scoreTextY + scoreText.shadow.y
  );

  context.fillStyle = scoreText.color;
  context.fillText(scoreText.text, scoreTextX, scoreTextY);

  // Goals
  const goals = section.goals;
  goals.forEach((goal) => {
    //  goal bar
    context.globalAlpha = 0.5;
    const goalShadow = goal.shadow;
    context.fillStyle = goalShadow.color;
    context.fillRect(
      goal.x + goalShadow.x,
      goal.y + goalShadow.y,
      goal.w,
      goal.h
    );
    context.globalAlpha = 1;
    context.fillStyle = goal.underside.color;
    context.fillRect(goal.x, goal.y, goal.w, goal.h + goal.underside.size);
    context.fillStyle = goal.color;
    context.fillRect(goal.x, goal.y, goal.w, goal.h);

    //  text outline
    const goalText = goal.text;
    setFont(goalText.text_size);
    context.strokeStyle = goalText.outline.color;
    context.lineWidth = goalText.outline.size;
    context.strokeText(goalText.text, goal.x, goalText.y);
    context.lineWidth = 0;

    //  text
    setFont(goalText.text_size);
    context.fillStyle = goalText.color;
    context.fillText(goalText.text, goal.x, goalText.y);
  });
}

function updateScoreSection(section) {
  // Bar
  const scoreBar = section.score_bar;
  scoreBar.x = section.x;
  scoreBar.y = section.y + section.h / 2 - scoreBar.h / 2;
  let anim_rate = 0.01;
  let tolerance = 0.3;

  let maxValue = 1000;
  scoreBar.value = easingWithRate(
    scoreBar.value,
    Math.round(score),
    anim_rate,
    tolerance
  );
  let remainder = scoreBar.value % maxValue;
  let percentage = remainder / maxValue;
  scoreBar.w = scoreBar.maxW * percentage;

  scoreBar.text.value = easingWithRate(
    scoreBar.text.value,
    Math.round(score),
    anim_rate,
    tolerance
  );
  scoreBar.text.text = "SCORE: " + Math.round(scoreBar.text.value);

  // Goals
  const goals = section.goals;
  goals.forEach((goal, i) => {
    const goalText = goal.text;
    goal.y = scoreBar.y + scoreBar.h / 2 - goal.h / 2;

    // alternate y position of goal text
    if (i % 2 === 0) {
      goalText.y = goal.y - 8;
    } else {
      goalText.y = goal.y + goal.h + 8;
    }

    let remainder = goal.points % 1000 === 0 ? 900 : goal.points % 1000;
    let percentage = remainder / 1000;
    let position = scoreBar.maxW * percentage;
    goal.x = Math.floor(position);

    if (scoreBar.text.value >= goal.points) {
      goal.text.text = goalText.reached_text;

      goal.w = easing(goal.w, 4);
      goal.h = easing(goal.h, 29);
      goal.y -= 2;

      goal.shadow.x = easing(goal.shadow.x, 2);
      goal.shadow.y = easing(goal.shadow.y, 4);

      goal.underside.size = easing(goal.underside.size, 3);
      goal.text.outline.size = easing(goal.text.outline.size, 3);

      //   goal.text.color = lerpColor(goal.text.color, YELLOW, 0.1);
    }

    goal.w = Math.ceil(goal.w);
    goal.h = Math.ceil(goal.h);
    goal.underside.size = Math.ceil(goal.underside.size);
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
    score_block.text_x =
      score_block.x + score_block.w / 2 - score_text_width / 2;
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
      Math.ceil(score_block.display_score),
      score_block.text_x,
      score_block.text_y
    );
  });

  // Draw main text
  let scores = section.scores.map((block) => block.score);
  let average = getAverageScore(scores);
  context.font = "12px PressStart2P";
  context.fillStyle = section.text_shadow_color;
  context.fillText(
    getText(section.average_score_text) + ": " + Math.ceil(average),
    section.text_x,
    section.text_y + 1
  );
  context.fillStyle = section.text_color;
  context.fillText(
    getText(section.average_score_text) + ": " + Math.ceil(average),
    section.text_x,
    section.text_y
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
    getText("retry") + ": ENTER",
    section.retry_text_x + section.padding_left,
    section.y + section.text_size * 2 + section.padding_top
  );

  var text_width = context.measureText(getText("quit") + ": ESC").width;
  section.quit_text_x = GAME_W - section.padding_left - text_width;
  context.fillText(
    getText("quit") + ": ESC",
    section.quit_text_x,
    section.y + section.text_size * 2 + section.padding_top
  );
}
