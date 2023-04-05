let IMAGES = {}; // GLOBAL IMAGE MAP: DON'T EDIT
let playerSpritesBackup; // For our palette swapping
var images_loaded = false;

const image_list = [
  { file: "player.png", name: "player_sprite" },
  { file: "platform.png", name: "platform" },
  { file: "platform-end.png", name: "platform_end_right" },
  { file: "platform-end-left.png", name: "platform_end_left" },
  { file: "space-background.png", name: "background" },
  { file: "space-background-1.png", name: "background_1" },
  { file: "space-background-2.png", name: "background_2" },
  { file: "space-background-3.png", name: "background_3" },
  { file: "control-icons.png", name: "input_icons" },
  { file: "shot.png", name: "shot" },
  { file: "wide-shot.png", name: "wide_shot" },
  { file: "basic-enemy.png", name: "basic_enemy" },
  { file: "downward-enemy.png", name: "exploding_enemy" },
  { file: "rolling-enemy.png", name: "rolling_enemy" },
  { file: "bouncing-enemy.png", name: "bouncing_enemy" },
  { file: "dust.png", name: "dust" },
  { file: "smoke.png", name: "smoke" },
  { file: "fire.png", name: "fire" },
  { file: "sparkle.png", name: "sparkle" },
  { file: "glow.png", name: "glow" },
  { file: "player-spritesheet.png", name: "player_sheet" },
  { file: "basic-enemy-sheet.png", name: "enemy_sheet" },
  { file: "big-comet.png", name: "big_comet" },
  { file: "big-comet-icon.png", name: "big_comet_icon" },
  { file: "collectible.png", name: "collectible" },
  { file: "hp-up.png", name: "hp_up" },
  { file: "particle.png", name: "particle" },
  { file: "cometShiledsVersions/CometShieldv1.png", name: "shield" },
  { file: "missilev3.png", name: "missile" },
  { file: "control-icons.png", name: "controls" },
  { file: "heart.png", name: "heart" },
  { file: "rapid-fire-icon.png", name: "rapid_fire_icon" },
  { file: "wide-shot-icon.png", name: "wide_shot_icon" },
  { file: "missile-icon.png", name: "missile_icon" },
  { file: "buddy-icon.png", name: "buddy_icon" },
  { file: "intro-1.png", name: "intro_1" },
  { file: "intro-2.png", name: "intro_2" },
  { file: "intro-3.png", name: "intro_3" },
  { file: "intro-4.png", name: "intro_4" },
  { file: "intro-5.png", name: "intro_5" },
  { file: "intro-6.png", name: "intro_6" },
  { file: "intro-7.png", name: "intro_7" },
  { file: "intro-8.png", name: "intro_8" },
  { file: "intro-9.png", name: "intro_9" },
  { file: "outro-1.png", name: "outro_1" },
  { file: "outro-2.png", name: "outro_2" },
  { file: "outro-3.png", name: "outro_3" },
  { file: "logo.png", name: "logo" },
  // <-- Add your sprite in here
];

var images_to_load = image_list.length;

function setColorFromUrlParam() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Replace with url param if it exists
  const colorUrlParam = urlParams.get("playerColor");
  if (colorUrlParam) {
    playerColorKey = colorUrlParam;
  }
}

/**
 * Backups if necessary, then returns copy so we don't edit the original
 * and can have a palette swap based on original colors
 */
function getPlayerSpriteToChange() {
  if (!playerSpritesBackup) {
    playerSpritesBackup = IMAGES["player_sheet"];
  }

  return playerSpritesBackup.cloneNode(true);
}

function swapPlayerColors() {
  setColorFromUrlParam();
  let lightReplacementColor = colorPalettes[playerColorKey].light;
  let darkReplacementColor = colorPalettes[playerColorKey].dark;

  const imageToChange = getPlayerSpriteToChange();

  let width = imageToChange.width;
  let height = imageToChange.height;

  // Create a new canvas so we can modify just this image
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");

  // a temp canvas used to make fonts crisp
  let fontcanvas = document.createElement("canvas");
  fontcanvas.width = width * 4;
  fontcanvas.height = height * 4;
  let fontctx = fontcanvas.getContext("2d");

  // Draw original image to new context
  ctx.drawImage(imageToChange, 0, 0);
  // Now get the new imageData
  let newImageData = ctx.getImageData(0, 0, width, height);

  // Now go through every pixel and replace the values
  // This is an array of 8 bit values in RGBA sequence
  // So every 4 values is a pixel
  for (let i = 0; i < newImageData.data.length; i += 4) {
    // Original values for each set of RGBA, ignoring alpha since we won't change
    let r = newImageData.data[i];
    let g = newImageData.data[i + 1];
    let b = newImageData.data[i + 2];

    if (
      r === colorsToRemap.lightBandanna.r &&
      g === colorsToRemap.lightBandanna.g &&
      b === colorsToRemap.lightBandanna.b
    ) {
      newImageData.data[i] = lightReplacementColor.r;
      newImageData.data[i + 1] = lightReplacementColor.g;
      newImageData.data[i + 2] = lightReplacementColor.b;
    }
    if (
      r === colorsToRemap.darkBandanna.r &&
      g === colorsToRemap.darkBandanna.g &&
      b === colorsToRemap.darkBandanna.b
    ) {
      newImageData.data[i] = darkReplacementColor.r;
      newImageData.data[i + 1] = darkReplacementColor.g;
      newImageData.data[i + 2] = darkReplacementColor.b;
    }
  }

  let ib = createImageBitmap(newImageData);

  ib.then((bit) => {
    // Set the player image to this new one
    IMAGES["player_sheet"] = bit;
  });
}

function countLoadedImagesAndLaunchIfReady() {
  images_to_load--;
  if (images_to_load === 0) {
    swapPlayerColors();

    images_loaded = true;
    console.log("images_loaded: " + images_loaded);
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
}

function loadImages() {
  for (var i = 0; i < image_list.length; i++) {
    if (
      !image_list[i] ||
      checkForNamingCollisions(
        image_list,
        image_list[i].name,
        ASSET_TYPES.IMAGE
      )
    ) {
      break;
    }

    IMAGES[image_list[i].name] = document.createElement("img");
    beginLoadingImage(IMAGES[image_list[i].name], image_list[i].file);
  }
}

loadImages();
