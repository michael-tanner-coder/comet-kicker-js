class ControlRow {
  constructor(props) {
    this.x = props?.x || 0;
    this.y = props?.y || 0;
    this.h = props?.h || 30;
    this.w = props?.w || 0;
    this.label = props?.label || "SHOOT:";
    this.controls = props?.controls || [];
    this.column_space = props?.column_space || 194;
    this.control_space = props?.control_space || 9;
  }

  update() {
    this.controls.forEach((control, i) => {
      control.x = this.column_space + (this.control_space + control.w) * i;
      control.y = this.y;
    });
  }

  draw() {
    context.fillText(this.label, this.x, this.y + this.h / 2);
    this.controls.forEach((control) => {
      control.draw();
    });
  }
}

class Control {
  constructor(props) {
    this.x = props?.x || 0;
    this.y = props?.y || 0;
    this.h = props?.h || 30;
    this.w = props?.w || 26;
    this.input = props?.input || "";
    this.image = props?.image || "";
    this.spacing = 9;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
  }
}

class ControlsMenu extends Menu {
  constructor(props) {
    super(props);
    this.id = "controlsMenu";
    this.key = "controls";
    this.header = "CONTROLS";
    this.elements = [];
  }

  // row cursor
  BOX_CURSOR = { x: 0, y: 0, w: 0, h: 0, color: YELLOW };

  // main section
  CONTROLS_SECTION = { x: 47, y: 50, w: 245, h: 190, rows: [] };
  ROWS = [];

  // header
  DYNAMIC_HEADER = { x: 0, y: 0, w: 0, h: 0, render: false };

  // vars
  current_row = {};
  current_box = {};
  selected_input = "";
  row_spacing = 10;

  addControlsToMenu(list) {
    this.ROWS.length = 0;
    list.forEach((item) => {
      console.log(item);
      const new_controls = item.inputs.map((control) => {
        return new Control({ input: control, image: control });
      });
      const new_row = new ControlRow({
        controls: [...new_controls],
        label: item.name,
      });
      this.ROWS.push(new_row);
    });
  }

  update() {
    super.update();
    this.ROWS.forEach((row, i) => {
      row.update();
      row.x = this.CONTROLS_SECTION.x;
      row.y = this.CONTROLS_SECTION.y + (this.row_spacing + row.h) * i;
    });
  }

  draw() {
    super.draw();
    context.fillStyle = WHITE;
    context.globalAlpha = 0.5;
    context.fillRect(
      this.CONTROLS_SECTION.x,
      this.CONTROLS_SECTION.y,
      this.CONTROLS_SECTION.w,
      this.CONTROLS_SECTION.h
    );
    context.globalAlpha = 1;

    this.ROWS.forEach((row) => {
      row.draw();
    });
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
