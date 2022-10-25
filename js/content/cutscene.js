function getWrappedText(text, x, y, line_height, fit_width) {
  fit_width = fit_width || 0;
  const lines = [];

  if (fit_width <= 0) {
    let new_text_data = {
      text,
      line: 0,
      x,
      y,
    };
    lines.push(new_text_data);
    return lines;
  }

  var words = text.split(" ");
  var current_line = 0;
  var index = 1;

  while (words.length > 0 && index <= words.length) {
    var str = words.slice(0, index).join(" ");
    var w = context.measureText(str).width;

    if (w > fit_width) {
      if (index == 1) {
        index = 2;
      }

      let new_text_data = {
        text: words.slice(0, index - 1).join(" "),
        line: current_line,
        x,
        y: y + line_height * current_line,
      };

      current_line++;
      words = words.splice(index - 1);
      index = 1;
      lines.push(new_text_data);
    } else {
      index++;
    }
  }

  if (index > 0) {
    context.fillText(words.join(" "), x, y + line_height * current_line);
    let new_text_data = {
      text: words.join(" "),
      line: current_line,
      x,
      y: y + line_height * current_line,
    };
    lines.push(new_text_data);
  }

  return lines;
}

class Cutscene {
  constructor(props) {
    // script
    this.script = props?.script || [];
    this.script_lines = [];
    this.script_index = 0;

    // visuals
    this.image = undefined;

    // text progression
    this.text_speed = 2;
    this.text_timer = 10;

    // lines
    this.current_line = "";
    this.line_finished = false;
    this.current_line_index = 0;

    // story beats
    this.current_beat = null;
    this.beat_finished = false;

    //rendered text
    this.current_text = "";
    this.current_char_index = 0;
    this.rendered_lines = [];

    // spacing/size
    this.font_size = 8;
    this.text_padding = 4;
  }

  init() {
    this.progressScript();
  }

  skipIntro() {
    playSound(SOUNDS["collect_spawn"]);
    game_state = STATES.MENU;
  }

  resetState() {
    this.line_finished = false;
    this.beat_finished = false;
    this.rendered_lines = [];
    this.current_char_index = 0;
    this.current_line_index = 0;
    this.current_text = "";
  }

  progressScript() {
    if (this.script[this.script_index]) {
      this.current_beat = this.script[this.script_index];
      playSound(SOUNDS["collect_spawn"]);
      this.resetState();
    }

    if (this.script_index > this.script.length - 1) {
      this.skipIntro();
    }
  }

  TEXT_SECTION = { x: 0, y: 165, w: GAME_W, h: 45 };
  TEXT_BOX = { x: 37, y: 0, w: 243, h: 66 };

  update() {
    this.text_speed = this.current_beat.speed;
    if (this.current_beat.image) {
      this.image = this.current_beat.image;
    }
    // look ahead at the full story beat to see how the text should wrap when rendered
    this.script_lines = getWrappedText(
      this.current_beat.text[current_language],
      this.TEXT_BOX.x,
      this.TEXT_SECTION.y + this.font_size + this.text_padding,
      10,
      this.TEXT_BOX.w
    );

    // update text
    this.text_timer -= this.text_speed;
    if (this.text_timer <= 0 && !this.beat_finished) {
      // set text of current line
      this.current_line = this.script_lines[this.current_line_index].text;
      this.current_text += this.current_line[this.current_char_index];

      // if the current character is a space, jump to the next available character
      if (this.current_line[this.current_char_index] === " ") {
        this.current_char_index += 1;
        if (this.current_line[this.current_char_index]) {
          this.current_text += this.current_line[this.current_char_index];
        }
      }

      // if there is no rendered line for this point in the script, create one
      if (!this.rendered_lines[this.current_line_index]) {
        // copy current script line for rendering
        this.rendered_lines.push({
          ...this.script_lines[this.current_line_index],
        });

        // set text value back to empty
        this.rendered_lines[this.current_line_index].text = "";
      }

      // set text value of our rendered line to match the revealed portion in this.current_text
      this.rendered_lines[this.current_line_index].text = this.current_text;

      // move to next line
      this.current_char_index += 1;
      if (this.current_char_index > this.current_line.length - 1) {
        this.line_finished = true;
        this.current_char_index = 0;
        this.current_line_index += 1;
        this.current_text = "";
      }

      // finish current story beat
      if (
        this.current_line_index > this.script_lines.length - 1 &&
        this.line_finished
      ) {
        this.current_char_index = 0;
        this.current_line_index = 0;
        this.current_text = "";
        this.beat_finished = true;
      }

      // reset timer and play sound
      this.text_timer = 10;
      playSound(SOUNDS["text"]);
    }

    // progress sequence
    if (this.beat_finished && onPress(CONTROLS.accept)) {
      this.script_index++;
      this.progressScript();
    } else if (onPress(CONTROLS.accept)) {
      this.current_text = this.current_line;
      this.rendered_lines = this.script_lines;
      this.beat_finished = true;
      playSound(SOUNDS["text"]);
    }

    // skip sequence
    if (onPress(CONTROLS.decline)) {
      this.skipIntro();
    }
  }

  draw() {
    //   skip button
    playAnimation(ANIMATIONS.buttonB, 1, GAME_W - 64, 2);
    context.fillStyle = WHITE;
    context.measureText("SKIP").width;
    context.fillText(
      "SKIP",
      GAME_W - context.measureText("SKIP").width - 8,
      14
    );

    //   image section
    context.fillStyle = WHITE;
    context.fillRect(0, 41, GAME_W, 1);
    context.fillRect(0, 41 + 115, GAME_W, 1);
    context.fillStyle = "#00000088";
    context.fillRect(0, 42, GAME_W, 114);
    context.fillRect(64, 42, 197, 114);
    if (this.image && IMAGES[this.image]) {
      context.drawImage(IMAGES[this.image], 64, 42);
    }

    //   text section
    context.fillStyle = "#00000088";
    context.fillRect(
      this.TEXT_SECTION.x,
      this.TEXT_SECTION.y,
      this.TEXT_SECTION.w,
      this.TEXT_SECTION.h
    );

    //   text rendering
    context.fillStyle = WHITE;
    setFontSize(this.font_size);
    this.rendered_lines.forEach((line) => {
      context.fillText(line.text, line.x, line.y);
    });

    //   continue button
    playAnimation(ANIMATIONS.buttonA, 1, 127, 218);
    context.fillStyle = WHITE;
    context.measureText("NEXT").width;
    context.fillText(
      "NEXT",
      127 + context.measureText("NEXT").width / 2 + 8,
      218 + 12
    );
  }
}

const INTRO_SEQUENCE = new Cutscene({ script: INTRO_SCRIPT });
const OUTRO_SEQUENCE = new Cutscene({ script: OUTRO_SCRIPT });

INTRO_SEQUENCE.init();
OUTRO_SEQUENCE.init();

const CUTSCENES = [INTRO_SEQUENCE, OUTRO_SEQUENCE];
var cutscene_index = 0;
