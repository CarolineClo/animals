let isSynthBrokenFlag = true;
// let isSynthPartAvailableFlag = false;
// let isTeacherHappyFlag = true;

document.addEventListener("DOMContentLoaded", (event) => {
  document.addEventListener("keydown", (event) => {
    console.log("Is the synth broken?", isSynthBrokenFlag);
    isSynthBrokenFlag = !isSynthBrokenFlag;
  });
});
