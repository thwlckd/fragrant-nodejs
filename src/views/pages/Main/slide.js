const jumbotron = document.querySelectorAll('.jumbotron-wrap > article');
const jumboIdx = document.querySelectorAll('.jumbo-idx');
const jumboPlayBtn = document.querySelector('.jumbo-playBtn');

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

let see = 0;

function jumbotronInit() {
  jumbotron.forEach((node, i) => {
    node.style.left = `${i * 100 - see * 100}%`;
  });
  jumboIdx.forEach((node, i) => {
    node.style.backgroundColor = '#d0d0d0';
    if (i === see) {
      node.style.backgroundColor = 'white';
    }
  });
}
// jumbotron init
jumbotronInit();

function seeAutoRolling(before, after, oper) {
  if (see === before) {
    see = after;
  } else if (oper === '+') {
    see += 1;
  } else if (oper === '-') {
    see -= 1;
  }
}

let interval;
let intervalRunning;

function startInterval() {
  interval = setInterval(() => {
    seeAutoRolling(4, 0, '+');
    jumbotronInit();
  }, 5000);
  intervalRunning = true;
}
startInterval();
function stopInterval() {
  clearInterval(interval);
  intervalRunning = false;
}

function leftHandler() {
  seeAutoRolling(0, 4, '-');
  jumbotronInit();
  stopInterval();
  startInterval();
}
function rightHandler() {
  seeAutoRolling(4, 0, '+');
  jumbotronInit();
  stopInterval();
  startInterval();
}

leftBtn.addEventListener('click', leftHandler);
rightBtn.addEventListener('click', rightHandler);
jumboIdx.forEach((node, i) => {
  node.addEventListener('click', () => {
    see = i;
    jumbotronInit();
    if (intervalRunning) {
      stopInterval();
      startInterval();
    }
  });
});

function jumbotronPlayHandler() {
  jumboPlayBtn.classList.toggle('jumbo-playBtn-off');
  if (jumboPlayBtn.classList.contains('jumbo-playBtn-off')) {
    jumboPlayBtn.children[0].src = '/asset/icon/play.svg';
    stopInterval();
  } else {
    jumboPlayBtn.children[0].src = '/asset/icon/stop.svg';
    startInterval();
  }
}

jumboPlayBtn.addEventListener('click', jumbotronPlayHandler);
// jumbotronWrap.addEventListener("mouseover", jumbotronPlayHandler);
// jumbotronWrap.addEventListener("mouseleave", jumbotronPlayHandler);
