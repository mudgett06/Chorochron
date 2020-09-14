// Add zero in front of numbers < 10
function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function xor(acc, cur) {
  return acc ^ cur;
}

//bool rgb extremity array to hex string ([0,1,0]=>"#00FF00")
export function boolArrayToHex(boolArray) {
  return "#" + boolArray.map((x) => ["00", "FF"][x]).join("");
}

//decimal color number to bool rgb extremity array (65280=>[0,1,0])
export function decToBoolArray(num) {
  return num
    .toString(16)
    .match(/ff|00/g)
    .slice(0, 3)
    .map((x) => (x === "00" ? 0 : 1));
}

export function formatDisplay(now, pref) {
  let hours = now.getHours();
  const mins = zeroPad(now.getMinutes());
  const day = zeroPad(now.getDate());
  const month = zeroPad(now.getMonth() + 1);
  const d = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][d.getDay()];
  if (pref === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  return {
    weekday,
    date: `${month}/${day}`,
    time: `${hours}:${mins}`,
  };
}
