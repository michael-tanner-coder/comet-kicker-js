const IMAGES = {}; // GLOBAL IMAGE MAP: DON'T EDIT
var images_loaded = false;

const image_list = [
  { file: "player.png", name: "player_sprite" },
  { file: "platform.png", name: "platform" },
  { file: "platform-end.png", name: "platform_end" },
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
  { file: "collectible.png", name: "collectible" },
  { file: "hp-up.png", name: "hp_up" },
  { file: "particle.png", name: "particle" },
  { file: "cometShiledsVersions/CometShieldv1.png", name: "shield" },
  { file: "missilev3.png", name: "missile" },
  { file: "control-icons.png", name: "controls" },
  { file: "heart.png", name: "heart" },
  { file: "intro-1.png", name: "intro_1" },
  { file: "intro-2.png", name: "intro_2" },
  // <-- Add your sprite in here
];

var images_to_load = image_list.length;

function countLoadedImagesAndLaunchIfReady() {
  images_to_load--;
  if (images_to_load == 0) {
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
