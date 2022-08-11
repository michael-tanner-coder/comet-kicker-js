var fontFace = new FontFace(
  "PressStart2P",
  "url(fonts/PressStart2P-Regular.ttf)"
);

fontFace.load().then((font) => {
  document.fonts.add(font);
  console.log("Font loaded");
});

context.font = "8px PressStart2P";
