// example: if (gamepad.left()) { //

var gamepad = {
    deadzone:0.1, // to prevent drift on old gamepads
    axis:function(num) {
        if (!navigator.getGamepads) return 0;
        let joy = navigator.getGamepads()[0];
        return joy?joy.axes[num]:0;
    },
    butt:function(num) {
        if (!navigator.getGamepads) return 0;
        let joy = navigator.getGamepads()[0];
        return joy?joy.buttons[num].value:0;
    },
   
    // simple on/off booleans for keyboard-like constrols
    left:function() { return this.axis(0)<-this.deadzone; },
    right:function() { return this.axis(0)>this.deadzone; },
    down:function() { return this.axis(1)>this.deadzone; },
    up:function() { return this.axis(1)<-this.deadzone; },
    lookleft:function() { return this.axis(2)<-this.deadzone; },
    lookright:function() { return this.axis(2)>this.deadzone; },

    // float -1..0..1 values for analog control
    leftStick_xAxis:function() { return this.axis(0); },
    leftStick_yAxis:function() { return this.axis(1); },
    rightStick_xAxis:function() { return this.axis(2); },
    rightStick_yAxis:function() { return this.axis(3); },

    buttonA:function() { return this.butt(0); },
    buttonB:function() { return this.butt(1); },
    buttonX:function() { return this.butt(2); },
    buttonY:function() { return this.butt(3); },
    leftShoulder:function() { return this.butt(4); },
    rightShoulder:function() { return this.butt(5); },
    leftTrigger:function() { return this.butt(6); },
    rightTrigger:function() { return this.butt(7); },
    select:function() { return this.butt(8); },
    start:function() { return this.butt(9); },
    dpadUp:function() { return this.butt(12); },
    dpadDown:function() { return this.butt(13); },
    dpadLeft:function() { return this.butt(14); },
    dpadRight:function() { return this.butt(15); },
};