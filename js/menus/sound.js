const MASTER_VOLUME_OPTION = new Select({
  key: "master_volume",
  text: "MASTER VOLUME",
  currentOption: master_volume,
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setMasterVolume(currentOption.value);
  },
});
addOptionRange(MASTER_VOLUME_OPTION, 0, 10);

const MUSIC_VOLUME_OPTION = new Select({
  key: "music_volume",
  text: "MUSIC VOLUME",
  currentOption: music_volume,
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setMusicVolume(currentOption.value);
  },
});
addOptionRange(MUSIC_VOLUME_OPTION, 0, 10);

const SFX_VOLUME_OPTION = new Select({
  key: "sound_volume",
  text: "SFX VOLUME",
  currentOption: sound_effect_volume,
  onChange: (input) => {
    var currentOption = input.options[input.currentOption];
    setSoundEffectVolume(currentOption.value);
  },
});
addOptionRange(SFX_VOLUME_OPTION, 0, 10);

createMenu({
  id: "soundMenu",
  key: "sound",
  header: "SOUND",
  elements: [MASTER_VOLUME_OPTION, MUSIC_VOLUME_OPTION, SFX_VOLUME_OPTION],
});
