const idInput = document.querySelector('#mid');
const emailInput = document.querySelector('#mid-email');
const password = document.querySelector('#mpw');
const memberName = document.querySelector('#mnm');

const signupForm = document.querySelector('.member-input');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `${idInput.value}@${emailInput.value}`,
      password: password.value,
      userName: memberName.value,
    }),
  }).then((response) => {
    if (response.ok) {
      alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      window.location.href = '/login';
    } else {
      // alert('이메일 인증해주세요.');
      alert('이미 가입하셨거나, 알 수 없는 오류가 발생하였습니다.\n 다시 시도 해 주세요.');
    }
  });
});

// 메일인증요청
// const mailCheck = document.querySelector('#reqBtn');

// mailCheck.addEventListener('click', (e) => {
//   e.preventDefault();

//   fetch('/api/auth/email', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       email: `${idInput.value}@${emailInput.value}`,
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       alert('이메일이 전송되었습니다.');
//     } else {
//       alert('메일 전송에 실패했습니다.');
//     }
//   });
// });

const emailList = document.querySelector('#eml');

// select 옵션변경시
emailList.addEventListener('change', (event) => {
  // 선택한 이메일 input에 입력하고 disabled
  if (event.target.value !== 'free') {
    emailInput.value = event.target.value;
    emailInput.disabled = true;
  } else {
    // 직접입력시 내용초기화
    emailInput.value = '';
    emailInput.disabled = false;
  }
});

// 아이디창 오류메시지
idInput.onblur = () => {
  if (idInput.value === '') {
    idInput.classList.add('invalid');
    document.querySelector('.msg').style.display = 'block';
  } else document.querySelector('.msg').style.display = 'none';
};

// 비밀번호 유효성 체크 (영문, 숫자, 특수문자 조합으로 이루어진 8~15자)
const pwRegExp =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=\-_`~\[\]\{\}\\\|<>\/?\.\,;:'"])[a-zA-Z0-9!@#$%^&*+=\-_`~\[\]\{\}\\\|<>\/?\.\,;:'"]{8,15}$/;

// 비밀번호 입력창 오류메시지
const passwordError = document.querySelector('#mpw+.msg');
const comparePassword = document.querySelector('#mpw2');
const passwordChkError = document.querySelector('#mpw2+.msg');

// console.log(passwordError);
// console.log(passwordChkError);
const passwordErrorMsg = {
  error0: '비밀번호를 입력해주세요',
  error1: '비밀번호를 한번 더 입력해주세요.',
  error2: '비밀번호가 일치 하지 않습니다.',
  error3: '비밀번호는 영문,숫자,특수문자 를 모두 조합하여 최소 8~15자 입력해 주세요.',
};

const { error0, error1, error2, error3 } = passwordErrorMsg;

// 비밀번호 입력창
password.oninput = () => {
  if (password.value !== '') {
    console.log(pwRegExp.test(password.value));
    if (pwRegExp.test(password.value)) {
      passwordError.textContent = '';
      passwordError.style.display = 'none';
    } else {
      passwordError.textContent = error3;
      passwordError.style.display = 'block';
    }
  } else {
    passwordError.textContent = error0;
    passwordError.style.display = 'block';
  }
};

// 비밀번호 확인 입력창
comparePassword.oninput = () => {
  if (comparePassword.value !== '') {
    if (comparePassword.value !== password.value) {
      passwordChkError.textContent = error2;
      passwordChkError.style.display = 'block';
    } else {
      passwordChkError.textContent = '';
      passwordChkError.style.display = 'none';
    }
  } else if (comparePassword.value === '') {
    passwordChkError.textContent = error1;
    passwordChkError.style.display = 'block';
  }
};

// 이름 입력창 오류메시지
const nameError = document.querySelector('#mnm+.msg');
// console.log(nameError);

memberName.onblur = () => {
  if (memberName.value !== '') {
    nameError.style.display = 'none';
  } else {
    nameError.style.display = 'block';
  }
};

// 회원가입 버튼
const joinBtn = document.querySelector('#joinbtn');

joinBtn.addEventListener('click', (e) => {
  if (
    !(
      idInput.value !== '' &&
      memberName.value !== '' &&
      passwordError.textContent === '' &&
      passwordChkError.textContent === '' &&
      emailInput.value !== ''
    )
  ) {
    e.preventDefault();
    alert('다시 확인해주세요.');
  }
});
