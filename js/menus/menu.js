var globalCreditsShowHack = false;
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
    if (this.key) {
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
      drawCenteredText(this.header, this.boundary.y - 16);
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
      POINTER.y = POINTER.y + Math.sin(game_speed * time_scale * POINTER.time * 0.15) * 6;
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

    if (globalCreditsShowHack) {
      context.fillStyle = WHITE;
      var wasFont = context.font;
      context.font = "5px Arial";
      for (var i = 0; i < creditsList.length; i++) {
        context.fillText(creditsList[i], 13, 7 + i * 8);
      }
      context.font = wasFont;
    } else if (this.id !== "mainMenu") {
      // Footer
      context.fillStyle = WHITE;

      // Controls
      let button_padding = 4;
      let section_margin = 16;

      // background
      context.fillStyle = "#00000088";
      context.fillRect(0, 0, GAME_W, 22);
      context.fillStyle = WHITE;

      // select button
      let select_text = "SELECT";
      let select_text_width = context.measureText(select_text).width;
      let select_button_width = getInputAnimation(CONTROLS.accept).frames[0].w;
      playAnimation(
        getInputAnimation(CONTROLS.accept),
        1,
        GAME_W -
          select_text_width -
          select_button_width -
          button_padding -
          section_margin,
        2
      );
      context.fillText(
        select_text,
        GAME_W - select_text_width - section_margin,
        14
      );

      // back button
      let back_text = "BACK";
      let back_text_width = context.measureText(back_text).width;
      let back_button_width = getInputAnimation(CONTROLS.decline).frames[0].w;
      playAnimation(getInputAnimation(CONTROLS.decline), 1, section_margin, 2);
      context.fillText(
        back_text,
        section_margin + back_button_width + button_padding,
        14
      );
    }
  }
}

var creditsList = [
  "Michael Monty: Project lead, core gameplay, player control, main sprites and related animations (platform, player, enemy, shots), title and intro music, Spanish and French translations, powerups, invulnerability frames, score tracking, parallax backgrounds, UI, intro sequence including images, audio and animation code, sounds (explosion, shot), menu system, tuning, color trails, logo, control remapping",
  "Patrick Moffett: New jump physics, wall sticking, drop through platform (firing up), save/restore of input and sound settings, assorted fixes (sound menu, high refresh rate input, audio during pause or game over, missiles bug), game over to reset, low pass filter, util functions",
  "mike dg: Color selection, various fixes (high score freeze, device detection, high refresh rate physics, spawn timers, collectible duration, move consistency, spawn frequency)",
  "Rodrigo Bonzerr Lopez: Future music, missile art, collection sound, lose hp sound, rotating shield sprites",
  'Christer "McFunkypants" Kaitila: Gamepad, screenshake, particles (dust, smoke, fire, sparkle, glow, explosion), title screen decoration, score initialization bug correction, collision fix, blurry font fix',
  "Jared Rigby: Chinese translation, shield hit noise, pause system",
  "Playtesters: Klaim (A. Joël Lamotte), Cassidy Noble, Patrick J Thompson, mike dg, Patrick McKeown, Rodrigo Bonzerr Lopez, Rohit Narwal Kumar, Tor Andreas Johnsen",
  "=== PRESS SPACEBAR to GO BACK ===",
];

function lineWrapCredits() {
  // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 57;
  var findEnd;

  for (let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for (let j = 0; j < currentLine.length; j++) {
      /*const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }
        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else*/ if (j === currentLine.length - 1) {
        if (i === 0 || i >= creditsList.length - 2) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(0, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for (var i = 0; i < newCut.length; i++) {
    while (newCut[i].length > 0) {
      findEnd = maxLineChar;
      if (newCut[i].length > maxLineChar) {
        for (var ii = findEnd; ii > 0; ii--) {
          if (newCut[i].charAt(ii) == " ") {
            findEnd = ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function
