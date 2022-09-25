// CONSTANTS
const ERROR_MESSAGES = {
  IMAGE_LOADING_ERROR: "Error loading images.",
  SOUND_LOADING_ERROR: "Error loading sounds.",
  FONT_LOADING_ERROR: "Error loading font",
  MISSING_ASSET_ERROR: "Error: referenced asset does not exist",
  SPRITE_NAMING_COLLISION:
    "Naming collision detected! Some sprites have the same name.",
  SOUND_NAMING_COLLISION:
    "Naming collision detected! Some sounds have the same name.",
  CHECK_CONSOLE: "Check console for errors",
};

const ASSET_TYPES = {
  IMAGE: "image",
  SOUND: "sound",
};

// GLOBAL VARIABLES
var image_loading_error = false;
var sound_loading_error = false;

// Update the global error state for the rest of the game
function setErrorState(asset_type) {
  switch (asset_type) {
    case ASSET_TYPES.IMAGE:
      image_loading_error = true;
      break;

    case ASSET_TYPES.SOUND:
      sound_loading_error = true;
      break;
  }
}

// Just to ensure we don't give two assets the same name
function checkForNamingCollisions(asset_list, name, asset_type) {
  let collision = false;
  let name_count = 0;

  // Check for duplicate names over the asset list
  asset_list.forEach((asset) => {
    if (asset.name === name) {
      name_count++;
    }
  });

  if (name_count > 1) {
    collision = true;

    // Update the global error state
    setErrorState(asset_type);

    // Log error to console
    switch (asset_type) {
      case ASSET_TYPES.IMAGE:
        console.log(ERROR_MESSAGES.SPRITE_NAMING_COLLISION);
        break;

      case ASSET_TYPES.SOUND:
        console.log(ERROR_MESSAGES.SOUND_NAMING_COLLISION);
        break;
    }

    console.log("At least two assets are named " + name);
  }

  return collision;
}

// Ensure asset exists in the file structure
async function checkIfAssetExists(path, asset_name, asset_type) {
  const response = await fetch(`${path}/${asset_name}`);

  if (response.status === 404) {
    console.log(ERROR_MESSAGES.MISSING_ASSET_ERROR);
    console.log("MISSING ASSET: " + asset_name);
    setErrorState(asset_type);
  }

  return response.status === 200;
}
