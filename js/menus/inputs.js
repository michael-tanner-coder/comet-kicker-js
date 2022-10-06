// MENU INPUTS
const INPUT_TYPES = {
  button: "button",
  select: "select",
  label: "label",
  text: "text",
};

class Input {
  constructor(props) {
    this.x = props?.x || 0;
    this.y = props?.y || 0;
    this.width = props?.width || 64;
    this.height = props?.height || 16;
    this.fontColor = props?.fontColor || WHITE;
    this.fontSize = props?.fontSize || 8;
    this.backgroundColor = props?.backgroundColor || PURPLE;
    this.padding = props?.padding || 4;
    this.text = props?.text || "";
    this.key = props?.key || "";
  }

  update() {
    this.text = getText(this.key);
  }

  draw() {
    context.fillStyle = this.fontColor;
    context.fillText(
      this.text,
      this.x + this.padding / 2,
      this.y + this.height / 2 + this.padding
    );
    context.font = "8px PressStart2P";
  }
}
class Button extends Input {
  constructor(props) {
    super(props);
    this.text = props?.text || "Test button";
    this.type = props?.type || INPUT_TYPES.button;
    this.onSelect =
      props?.onSelect ||
      function () {
        console.log("selected button");
      };
  }

  handler() {
    this.onSelect(this);
  }
}

class Select extends Input {
  constructor(props) {
    super(props);
    this.text = props?.text || "Test select";
    this.type = props?.type || INPUT_TYPES.select;
    this.currentOption = 0;
    this.options = props?.options || [];
    this.onChange =
      props?.onChange ||
      function () {
        console.log("changed select option");
      };
  }

  handler() {
    this.onChange(this);
  }

  draw() {
    super.draw();
    // Render options for the select input
    context.fillStyle = this.fontColor;
    context.fillText(
      `< ${this.options[this.currentOption]?.label} >`,
      this.x + this.width + this.padding / 2,
      this.y + this.height / 2 + this.padding
    );
  }
}

class Text extends Input {
  constructor(props) {
    super(props);
    this.text = props?.text || "Test text";
    this.type = props?.type || INPUT_TYPES.text;
  }
}
