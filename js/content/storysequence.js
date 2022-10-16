class StorySequence {
  constructor(props) {
    this.script = props?.script || [];
    this.image = {};
    this.text_speed = 2;
    this.line_finished = false;
    this.current_text = "";
    this.current_line = "";
    this.font_size = 8;
    this.text_padding = 4;
    this.current_char_index = 0;
    this.current_line_index = 0;
    this.text_timer = 10;
  }

  init() {
    this.setNextLine();
  }

  setNextLine() {
    if (this.script[this.current_line_index]) {
      this.current_line =
        this.script[this.current_line_index].line[current_language];
      this.current_text = "";
      this.line_finished = false;
      this.current_char_index = 0;
    }
  }

  TEXT_SECTION = { x: 0, y: 165, w: GAME_W, h: 45 };
  TEXT_BOX = { x: 37, y: 0, w: 243, h: 66 };

  update() {
    this.text_timer -= this.text_speed;
    if (this.text_timer <= 0 && !this.line_finished) {
      this.current_text += this.current_line[this.current_char_index];
      this.current_char_index += 1;
      this.text_timer = 10;
      if (this.current_text === this.current_line) {
        this.line_finished = true;
      }
    }

    if (this.line_finished && onPress(CONTROLS.accept)) {
      this.current_line_index++;
      this.setNextLine();
    } else if (onPress(CONTROLS.accept)) {
      this.current_text = this.current_line;
      this.line_finished = true;
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
    context.fillStyle = "#00000088";
    context.fillRect(0, 42, GAME_W, 114);
    context.fillRect(64, 42, 197, 114);

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
    setFont(this.font_size);
    context.fillText(
      this.current_text,
      this.TEXT_BOX.x,
      this.TEXT_SECTION.y + this.font_size + this.text_padding
    );

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

const INTRO_SEQUENCE = new StorySequence({ script: INTRO_SCRIPT });
INTRO_SEQUENCE.init();
