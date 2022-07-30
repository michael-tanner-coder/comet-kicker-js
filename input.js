const INPUT_MAP = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  [" "]: false,
  Enter: false,
};

window.addEventListener("keydown", function (e) {
  console.log(e);
  if (Object.keys(INPUT_MAP).includes(e.key)) {
    console.log(e.key + " is held");
    INPUT_MAP[e.key] = true;
    current_key = e.key;
  }
});

window.addEventListener("keyup", function (e) {
  console.log(e);
  if (Object.keys(INPUT_MAP).includes(e.key)) {
    console.log(e.key + " is lifted");
    INPUT_MAP[e.key] = false;
    current_key = "";
  }
});
