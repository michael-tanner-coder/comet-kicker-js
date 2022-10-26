const scores = JSON.parse(localStorage.getItem("high_scores"));
const score_list = [];
if (scores) {
  scores.forEach((score, i) => {
    let score_text = i + 1 + ". " + Math.floor(score);
    let new_text = new Text();
    new_text.update = () => {};
    new_text.text = score_text;
    score_list.push(new_text);
  });
}
createMenu({
  id: "highScoreMenu",
  key: "high_scores",
  header: "HIGH SCORES",
  elements: [...score_list],
  no_options_text: "No scores yet!",
});
