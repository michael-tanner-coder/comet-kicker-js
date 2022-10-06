const MASTER_VOLUME_OPTION = {
  ...SELECT,
  text: "MASTER VOLUME",
};
addOptionRange(MASTER_VOLUME_OPTION, 0, 10);

const MUSIC_VOLUME_OPTION = {
  ...SELECT,
  text: "MUSIC VOLUME",
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setMusicVolume(currentOption.value);
  },
};
addOptionRange(MUSIC_VOLUME_OPTION, 0, 10);

const SFX_VOLUME_OPTION = {
  ...SELECT,
  text: "SFX VOLUME",
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setSoundEffectVolume(currentOption.value);
  },
};
addOptionRange(SFX_VOLUME_OPTION, 0, 10);

createMenu({
  id: "soundMenu",
  header: "SOUND",
  elements: [MASTER_VOLUME_OPTION, MUSIC_VOLUME_OPTION, SFX_VOLUME_OPTION],
});
