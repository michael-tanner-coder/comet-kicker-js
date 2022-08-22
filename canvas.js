const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function drawBitmapCenteredAtLocationWithRotation(graphic,atX,atY,withAngle,alpha) {
    if (!graphic) return;
    context.save(); // allows us to undo translate movement and rotate spin
    context.translate(atX,atY); // sets the point where our graphic will go
    context.rotate(withAngle); // sets the rotation
    if (alpha!=undefined) context.globalAlpha = alpha;
    context.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
    if (alpha!=undefined) context.globalAlpha = 1;
    context.restore(); // undo the translation movement and rotation since save()
  }
