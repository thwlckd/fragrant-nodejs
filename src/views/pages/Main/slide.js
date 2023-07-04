const jumbotronWrap = document.querySelector(".jumbotron-wrap");
const jumbotron = document.querySelectorAll(".jumbotron-wrap > article");
const jumboIdx = document.querySelectorAll(".jumbo-idx");

const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

let see = 0;

// jumbotron init
jumbotronInit();

function leftHandler() {
  seeAutoRolling(0, 4, "-");
  jumbotronInit();
}
function rightHandler() {
  seeAutoRolling(4, 0, "+");
  jumbotronInit();
}

function jumbotronInit() {
  jumbotron.forEach((node, i) => {
    node.style.left = i * 100 - see * 100 + "%";
  });
  jumboIdx.forEach((node, i) => {
    node.style.backgroundColor = "#d0d0d0";
    if (i === see) {
      node.style.backgroundColor = "white";
    }
  });
}

function seeAutoRolling(before, after, oper) {
  if (see === before) {
    see = after;
  } else if (oper === "+") {
    see++;
  } else if (oper === "-") {
    see--;
  }
}

leftBtn.addEventListener("click", leftHandler);
rightBtn.addEventListener("click", rightHandler);
jumboIdx.forEach((node, i) => {
  node.addEventListener("click", () => {
    see = i;
    jumbotronInit();
  });
});

setInterval(() => {
  seeAutoRolling(4, 0, "+");
  jumbotronInit();
}, 3000);
