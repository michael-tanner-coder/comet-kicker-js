class Control {
  constructor(props) {
    this.x = props?.x || 0;
    this.y = props?.y || 0;
    this.h = props?.h || 25;
    this.w = props?.w || 26;
    this.input = props?.input || "";
    this.image = props?.image || "";
    this.spacing = 9;
    this.color = PURPLE;
    this.border_color = WHITE;
    this.border_width = 1;
    this.active = false;
    this.highlight_x = 0;
    this.highlight_y = 0;
  }

  draw() {
    // border shadow
    if (this.active) {
      context.fillStyle = PINK;
      context.fillRect(
        this.x - this.border_width,
        this.y - this.border_width,
        this.w + this.border_width * 2,
        this.h + this.border_width * 2 + 1
      );
    }
    // yellow border
    context.fillStyle = this.border_color;
    context.fillRect(
      this.x - this.border_width,
      this.y - this.border_width,
      this.w + this.border_width * 2,
      this.h + this.border_width * 2
    );

    // border highlight
    if (this.active) {
      context.fillStyle = WHITE;
      context.fillRect(
        this.x - this.border_width + this.highlight_x,
        this.y - this.border_width + this.highlight_y,
        this.w / 2,
        this.h / 2
      );
      context.fillRect(
        this.x + this.w / 2 + this.border_width,
        this.y + this.h / 2 + this.border_width,
        this.w / 2,
        this.h / 2
      );
    }

    // background
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    let animation = ANIMATIONS[this.input];
    if (animation) {
      playAnimation(
        animation,
        1,
        Math.floor(this.x + this.w / 2 - animation.frames[0].w / 2),
        Math.floor(this.y + this.h / 2 - animation.frames[0].h / 2)
      );
    }
  }

  update() {
    this.border_width = easing(this.border_width, this.active ? 2 : 1);
    if (this.border_width < 1) {
      this.border_width = 1;
    }
  }
}

class ControlRow extends Input {
  constructor(props) {
    super(props);
    this.x = props?.x || 0;
    this.y = props?.y || 0;
    this.h = props?.h || 30;
    this.w = props?.w || 0;
    this.label = props?.label || "SHOOT:";
    this.options = props?.options || [];
    this.column_space = props?.column_space || 194;
    this.control_space = props?.control_space || 9;
    this.currentOption = 0;
    this.active = false;
    this.font_size = 8;
    this.type = "select";
    this.waiting_for_input = false;
    this.input = props?.input || null;
  }

  handler() {}

  update() {
    this.options.forEach((control, i) => {
      control.x = this.column_space + (this.control_space + control.w) * i;
      control.y = this.y;
      if (i === this.currentOption && this.active) {
        control.border_color = YELLOW;
        control.active = true;
      } else {
        control.border_color = WHITE;
        control.active = false;
      }
      control.update();
    });

    if (this.waiting_for_input) {
      // wait for the user to enter a new valid input to remap
      let input_keys = Object.keys(INPUTS);
      for (let i = 0; i < input_keys.length; i++) {
        let key = input_keys[i];
        if (INPUTS[key]) {
          // if valid, map the user's chosen input to the current control
          let input_to_remap = this.input.name;
          this.options[this.currentOption].input = key;
          remapInput(input_to_remap, key, this.currentOption);

          // stop listening for new input and return back to normal menu navigation
          this.waiting_for_input = false;
          stop_menu_nav = false;
          INPUTS[key] = false;
          break;
        }
      }
    }

    if (this.active && onPress(CONTROLS.accept)) {
      setTimeout(() => {
        this.waiting_for_input = true;
      }, 200);
      stop_menu_nav = true;
    }
  }

  draw() {
    let rendered_label = this.label;
    context.fillStyle = WHITE;
    setFontSize(this.font_size);
    context.fillText(
      rendered_label.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toUpperCase(),
      this.x,
      this.y + this.h / 2
    );
    this.options.forEach((control) => {
      control.draw();
    });
  }
}

class ControlsMenu extends Menu {
  constructor(props) {
    super(props);
    this.id = "controlsMenu";
    this.key = "controls";
    this.header = "CONTROLS";
    this.elements = [];
    this.verticalSpacing = 15;
    this.padding = -20;
  }

  CONTROLS_SECTION = { x: 47, y: 50, w: 245, h: 190, rows: [] };
  row_spacing = 10;

  addControlsToMenu(list) {
    this.elements.length = 0;
    list.forEach((item) => {
      const new_controls = item.inputs.map((control) => {
        return new Control({ input: control, image: control });
      });
      const new_row = new ControlRow({
        options: [...new_controls],
        label: item.name,
        input: item,
      });
      this.elements.push(new_row);
    });
  }

  update() {
    super.update();
    this.elements.forEach((row, i) => {
      row.update();
      row.x = this.CONTROLS_SECTION.x;
      row.y = this.CONTROLS_SECTION.y + (this.row_spacing + row.h) * i;
    });

    let active_row = this.elements.find((row) => row.active);
    if (active_row) {
      this.elements.forEach(
        (row) => (row.currentOption = active_row.currentOption)
      );
    }
  }

  draw() {
    super.draw();
    this.elements.forEach((row, i) => {
      row.active = this.cursor === i;
      row.draw();
    });

    let waiting_row = this.elements.find(
      (row) => row.active && row.waiting_for_input
    );
    if (waiting_row) {
      context.fillStyle = "#00000088";
      context.fillRect(0, 0, GAME_W, GAME_H);
      waiting_row.options[waiting_row.currentOption].draw();
    }
  }
}

const CONTROLS_MENU = new ControlsMenu();
CONTROLS_MENU.addControlsToMenu([
  CONTROLS.shoot,
  CONTROLS.jump,
  CONTROLS.moveUp,
  CONTROLS.moveDown,
  CONTROLS.moveLeft,
  CONTROLS.moveRight,
]);
MENUS.push(CONTROLS_MENU);
