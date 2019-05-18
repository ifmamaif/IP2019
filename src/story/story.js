// bg
const microphone = require("./bg/microphone.jpeg");
const facultate = require("./bg/facultate.jpg");

const entrance = require("./bg/entrance.jpeg");
// bgm
const take = require("./bgm/take.mp3");
// speakers
const b = "Student FMI";
// sprites
const bn = require("./sprites/block-neutral.png");
const bh = require("./sprites/block-happy.png");
const bp = require("./sprites/block-pout.png");

let story = [
  {
    bg: facultate,
    bgm: take,
    sprite: bn,
    speaker: b,
    text: "Bine ai venit la FMI",
    // spriteEffect: "shrink",
  },
  {
    text: "Acum vei afla mai multe despre povestea noastra"
  },
  {
    text: "Esti gata sa inceapa aventura?"
  },
  {
    text:
      "Aventura, strigati ura !"
  },
  {
    bgTransition: "scene-change",
    bg: microphone,
  },
  { spriteEffect: "grow", text: 'Acum e mai mare' },
  { spriteEffect: "shrink-back", text: 'Acum e ca la inceput' },
  { spriteEffect: "shrink", text: 'Acum e pitic' },
  { spriteEffect: "grow-back", text: 'Acum e pitic' },
  {
    speaker: "",
    spriteLeftTransition: "from-right-leave-left",
    spriteLeft: bn,
  },

];

// The code below is to set undefined properties to the last defined property.
// It is optional and based on preference, so feel free to add or remove any function calls.

setFutureProperties("bg");
setFutureProperties("bgm");
setFutureProperties("speaker");
setFutureProperties("sprite");
setFutureProperties("spriteLeft");
setFutureProperties("spriteRight");

function setFutureProperties(key) {
  let cache = "";
  for (let obj of story) {
    if (obj[key] || obj[key] === "") {
      cache = obj[key];
    } else {
      obj[key] = cache;
    }
  }
}
export default story;
