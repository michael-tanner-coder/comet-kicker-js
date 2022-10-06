// MENU INPUTS
const INPUT_TYPES = {
  button: "button",
  select: "select",
  label: "label",
  text: "text",
};
const INPUT = {
  x: 0,
  y: 0,
  width: 64,
  height: 16,
  fontColor: WHITE,
  fontSize: 8,
  backgroundColor: PURPLE,
  padding: 4,
  handler: () => {},
};
const BUTTON = {
  ...INPUT,
  text: "Test button",
  type: INPUT_TYPES.button,
  onSelect: () => {
    console.log("selected button");
  },
};
const SELECT = {
  ...INPUT,
  text: "Test select",
  type: INPUT_TYPES.select,
  currentOption: 0,
  options: [
    { label: "test option 1", value: 1 },
    { label: "test option 2", value: 2 },
    { label: "test option 3", value: 2 },
    { label: "test option 4", value: 2 },
    { label: "test option 5", value: 2 },
  ],
  onChange: () => {
    console.log("changed option");
  },
};
const TEXT = {
  ...INPUT,
  text: "Test text",
  type: INPUT_TYPES.text,
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
    this.handler = props?.handler || function () {};
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
}

class Select extends Input {
  constructor(props) {
    super(props);
    this.text = props?.text || "Test select";
    this.type = props?.type || INPUT_TYPES.select;
    this.currentOption = 0;
    this.onChange =
      props?.onSelect ||
      function () {
        console.log("changed select option");
      };
  }
}

class Text extends Input {
  constructor(props) {
    super(props);
    this.text = props?.text || "Test text";
    this.type = props?.type || INPUT_TYPES.text;
  }
}
