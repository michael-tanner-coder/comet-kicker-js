this.creditsShowHack = false;
class Menu {
  constructor(props) {
    this.id = props?.id || "";
    this.header = props?.header || "";
    this.elements = props?.elements || [];
    this.boundary = props?.boundary || {
      x: GAME_W / 4,
      y: GAME_H / 4,
      width: 160,
      height: 128,
    };
    this.padding = props?.padding || 12;
    this.verticalSpacing = props?.verticalSpacing || 12;
    this.cursor = 0;
    this.key = props?.key || "";
    this.no_options_text = props?.no_options_text || "";
    this.image = props?.image || null;
    this.refreshMenuCallback = props?.refreshMenu || function () {};
  }

  refreshMenu() {
    this.refreshMenuCallback(this);
  }

  update() {
    if(this.key) {
      this.header = getText(this.key);
    } else {
      this.header = "";
    }
    this.elements.forEach((element) => element.update());
  }

  draw() {
    // Header
    context.fillStyle = WHITE;
    if (!this.image) {
      drawCenteredText(this.header, this.boundary.y - 32);
    }

    if (this.image) {
      context.fillStyle = "#00000088";
      context.fillRect(0, 10, GAME_W, 95);
      context.drawImage(IMAGES[this.image], GAME_W / 2 - 123, 0);
    }

    // Elements
    this.elements.forEach((element, i) => {
      //  Coordinates
      element.x = this.boundary.x + this.padding;
      element.y =
        this.boundary.y +
        this.padding +
        element.height * i +
        this.verticalSpacing * i;

      //   Dimensions
      let measureText = context.measureText(element.text);
      element.width = measureText.width + element.padding;

      //   Cursor selection
      if (this.cursor === i) {
        // Pointer
        POINTER.x = element.x - POINTER.w * 2;
        POINTER.y = element.y;
        context.fillStyle = PINK;
        if (element.type !== INPUT_TYPES.select) {
          // element.fontSize = easingWithRate(element.fontSize, 16, 0.4);
          element.fontSize = 16;
          context.font = element.fontSize + "px PressStart2P";
        }
        context.fillText(
          element.text,
          element.x + element.padding / 2,
          element.y + element.height / 2 + element.padding + 1
        );
      } else {
        // element.fontSize = easing(element.fontSize, 8);
        element.fontSize = 8;
      }

      //   Render input
      element.draw();
    });

    // POINTER
    if (this.elements.length > 0) {
      assignId(POINTER);
      POINTER.y = POINTER.y + Math.sin(POINTER.time * 0.15) * 6;
      POINTER.time += 1;
      POINTER.y = Math.floor(POINTER.y);
      drawTrail(POINTER);
      context.drawImage(IMAGES[POINTER.sprite], POINTER.x - 1, POINTER.y);
      storePreviousPosition(POINTER);
    }

    // No options available
    if (this.elements.length === 0) {
      context.fillStyle = WHITE;
      drawCenteredText(this.no_options_text, GAME_H / 2);
    }

    // Footer
    if (this.id !== "mainMenu") {
      context.fillStyle = WHITE;
      context.fillText("Space = go back", 16, 16);
    }
  }
}
