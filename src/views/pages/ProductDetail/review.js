const inputText = document.querySelector('#commentText');
const resultComment = document.querySelector('#comments');
const btn = document.querySelector('#submitBtn');

// 타임스탬프 만들기
function generateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const wDate = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const time = `${year}-${month}-${wDate} ${hour}:${min}:${sec}`;
  return time;
}


// 랜덤 유저이름 만들기. 10글자로 제한. 이거는 수정
function generateUserName() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let makeUsername = '';
  for (let i = 0; i < 5; i += 1) {
    const index = Math.floor(Math.random(10) * alphabet.length);
    makeUsername += alphabet[index];
  }
  for (let j = 0; j < 5; j += 1) {
    makeUsername += '*';
  }
  return makeUsername;
}


// 댓글보여주기
function showComment(comment) {
  const userName = document.createElement('div');
  const inputValue = document.createElement('span');
  const showTime = document.createElement('div');
  const countSpan = document.createElement('span');
  const commentList = document.createElement('div');
 
  commentList.className = 'eachComment';
  userName.className = 'name';
  inputValue.className = 'inputValue';
  showTime.className = 'time';

  // 유저네임가져오기
  userName.textContent = generateUserName();
  // 입력값 넘기기
  inputValue.textContent = comment;
  // 타임스탬프
  showTime.textContent = generateTime();
  countSpan.textContent = 0;

  // 댓글뿌려주기
  commentList.appendChild(userName);
  commentList.appendChild(inputValue);
  commentList.appendChild(showTime);
  
  resultComment.prepend(commentList);
  console.dir(resultComment);
}

// 버튼만들기+입력값 전달
function pressBtn() {
  const currentVal = inputText.value;

  if (currentVal.length < 10) {
    alert('최소 10자 이상 후기를 작성해주세요.');
  } else {
    showComment(currentVal);
    inputText.value = '';
  }
}

btn.onclick = pressBtn;



// 페이지네이션
/*
const COUNT_PER_PAGE = 5;
const numberButtonWrapper = document.querySelector('.number-button-wrapper');
const ul = document.querySelector('ul');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button'); 
let pageNumberButtons;

let currentPage = 1; 


function getTotalPageCount()  {
  return Math.ceil(showComment.length / COUNT_PER_PAGE);
};


function setPageButtons() {
  numberButtonWrapper.textContent = '';
  
  for (let i = 1; i <= getTotalPageCount(); i+=1) {
    numberButtonWrapper.textContent += <span class="number-button">` ${i} `</span>;
  }

  numberButtonWrapper.firstChild.classList.add('selected');
  pageNumberButtons = document.querySelectorAll('.number-button');
};

const setPageOf = (pageNumber) => {
  ul.textContent = '';

  for (
    let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
    i <= COUNT_PER_PAGE * (pageNumber - 1) + 6 && i <= showComment.length;
    i+=1
  ) {
    const li = document.createElement('li');
    const comments = document.createElement('div');
    comments.className = 'post-container';

    li.append(comments);
    ul.append(li);
  }
};


function moveSelectedPageHighlight() {
   pageNumberButtons = document.querySelectorAll('.number-button');

  pageNumberButtons.forEach((numberButton) => {
    if (numberButton.classList.contains('selected')) {
      numberButton.classList.remove('selected');
    }
  });

  pageNumberButtons[currentPage - 1].classList.add('selected');
};

setPageButtons();
setPageOf(currentPage);






pageNumberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', (e) => {
    currentPage = +e.target.textContent;
    console.log(currentPage);
    setPageOf(currentPage);
    moveSelectedPageHighlight();
  });
});


prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    setPageOf(currentPage);
    moveSelectedPageHighlight();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < getTotalPageCount()) {
    currentPage += 1;
    setPageOf(currentPage);
    moveSelectedPageHighlight();
  }
});
*/