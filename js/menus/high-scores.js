const scores = JSON.parse(localStorage.getItem("high_scores"));
console.log("HIGH SCORE LIST");
console.log(scores);
const score_list = [];
scores.forEach((score, i) => {
  let score_text = i + 1 + ". " + Math.floor(score);
  let new_text = { ...TEXT };
  new_text.text = score_text;
  score_list.push(new_text);
});
createMenu({
  id: "highScoreMenu",
  header: "HIGH SCORES",
  elements: [...score_list],
});