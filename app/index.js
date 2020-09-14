import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { display } from "display";
import {
  xor,
  decToBoolArray,
  boolArrayToHex,
  formatDisplay,
} from "../common/utils";

// Update the clock every second
clock.granularity = "seconds";

// cache gui
const timeLabel = document.getElementById("timeLabel");
const dateLabel = document.getElementById("dateLabel");
const dowLabel = document.getElementById("dowLabel");
const shiftingGradient = document.getElementById("shifting-gradient");
const animators = [1, 2, 3, 4].map((num) =>
  shiftingGradient.getElementById(`c${num}Animator`)
);

const loopDuration = Number(animators[0].dur);

function changeColors() {
  let boolArray = animators[2].to
    ? decToBoolArray(Number(animators[2].to))
    : [0, 1, 0];

  //get indeces of mode binary value (0 or 1)
  let boolMode = boolArray.reduce(xor) ? 0 : 1;

  let modeIndeces = [];
  for (let i = 0; i < 3; i++) {
    if (boolArray[i] == boolMode) {
      modeIndeces.push(i);
    }
  }

  //randomly flip one of the two mode binary values
  boolArray[modeIndeces[Math.floor(Math.random() * 2)]] = boolMode ? 0 : 1;

  let newColor = boolArrayToHex(boolArray);
  animators.forEach((animator, i) => {
    switch (i) {
      case 0:
      case 3:
        setTimeout(function () {
          animator.to = newColor;
          animator.animate("enable");
        }, loopDuration * 1000);
        return;
      case 1:
        setTimeout(function () {
          animator.to = newColor;
          animator.animate("enable");
        }, loopDuration * 500);
        return;
      case 2:
        animator.to = newColor;
        animator.animate("enable");
        return;
    }
  });
}

//update display
clock.ontick = (evt) => {
  const formatted = formatDisplay(evt.date, preferences.clockDisplay);
  dateLabel.text = formatted.date;
  dowLabel.text = formatted.weekday;
  timeLabel.text = formatted.time;
  if (evt.date.getSeconds() % 2 && display.on) {
    changeColors();
  }
};
