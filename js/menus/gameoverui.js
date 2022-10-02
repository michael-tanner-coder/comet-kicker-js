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

const AVERAGE_SCORE_SECTION = {
  //   Section
  background_color: PURPLE,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  padding: 0,
};

const OPTIONS_SECTION = {
  //   Section
  background_color: PURPLE,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  padding: 0,
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

  let maxValue = 1000;
  scoreBar.value = easingWithRate(scoreBar.value, score, 0.01);
  let remainder = scoreBar.value % maxValue;
  let percentage = remainder / maxValue;
  scoreBar.w = scoreBar.maxW * percentage;

  scoreBar.text.value = easingWithRate(
    parseInt(scoreBar.text.value),
    Math.round(score * 100) / 100,
    0.01
  );
  scoreBar.text.text = "SCORE: " + scoreBar.text.value;

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

function drawAverageScoreSection() {}

function drawOptionsSection() {}
