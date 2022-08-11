const IMAGES = {}; // GLOBAL IMAGE MAP: DON'T EDIT

const image_list = [
  { file: "player.png", name: "player_sprite" },
  { file: "platform.png", name: "platform" },
  { file: "platform-end.png", name: "platform-end" },
  { file: "space-background.png", name: "background" },
  { file: "space-background-1.png", name: "background_1" },
  { file: "space-background-2.png", name: "background_2" },
  { file: "space-background-3.png", name: "background_3" },
  // <-- Add your sprite in here
];

var image_loading_error = false;
var images_to_load = image_list.length;

// Just to ensure we don't give two images the same name
function checkForNamingCollisions(name) {
  let collision = false;
  let name_count = 0;

  image_list.forEach((image) => {
    if (image.name === name) {
      name_count++;
    }
  });

  if (name_count > 1) {
    collision = true;
    image_loading_error = true;
    console.log("Naming collision detected! Some sprites have the same name.");
    console.log("At least two sprites are named " + name);
  }

  return collision;
}

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
    if (image_list[i].name && !checkForNamingCollisions(image_list[i].name)) {
      IMAGES[image_list[i].name] = document.createElement("img");
      beginLoadingImage(IMAGES[image_list[i].name], image_list[i].file);
    } else {
      break;
    }
  }
}

loadImages();
