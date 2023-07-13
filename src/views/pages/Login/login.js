const idEmail = document.querySelector('#uid');
const password = document.querySelector('#upassword');
const loginForm = document.querySelector('.userinput');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: idEmail.value,
      password: password.value,
    }),
  }).then((res) => {
    console.log(res);
    if (!res.ok) {
      alert('아이디(이메일) 또는 비밀번호를 확인해주세요.');
    } else {
      window.location.href = res.url;
    }
  });
});

// 아이디 입력 유효성
const idEmailError = document.querySelector('#uid+.login-msg');

const idRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const idEmailErrorMsg = {
  error0: '이메일을 입력하세요',
  error1: '아이디(이메일)는 이메일 형식으로 입력해주세요.',
};

// console.log(idEmailError);
idEmail.oninput = () => {
  const { error0, error1 } = idEmailErrorMsg;

  if (idEmail.value !== '') {
    if (idRegExp.test(idEmail.value)) {
      idEmailError.textContent = '';
      idEmailError.style.display = 'none';
    } else {
      idEmailError.textContent = error1;
      idEmailError.style.display = 'block';
    }
  } else {
    idEmailError.textContent = error0;
    idEmailError.style.display = 'block';
  }
};

// 로그인버튼
const loginBtn = document.querySelector('#sbtn');

loginBtn.addEventListener('click', (e) => {
  if (!(idEmail.value !== '' && idEmailError.textContent === '' && password.value !== '')) {
    e.preventDefault();
    alert('아이디(이메일), 비밀번호를 확인해주세요.');
  }
});