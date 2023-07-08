console.log("확인");

const idInput = document.querySelector("#mid");
const emailInput = document.querySelector("#mid-email");
const password = document.querySelector("#mpw");
const memberName = document.querySelector("#mnm");

const signupForm = document.querySelector(".member-input");

signupForm.addEventListener("SUBMIT", (e) => {
  e.preventDefault();

  console.log(idInput.value + "@" + emailInput.value);
  console.log(password.value);
  console.log(memberName.value);
  fetch("/auth/sign-up", {
    method: "POST",
    Headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: idInput.value + "@" + emailInput.value,
      password: password.value,
      userName: memberName.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
});



const emailList = document.querySelector("#eml");


// select 옵션변경시
emailList.addEventListener("change", (event) => {
  // 선택한 이메일 input에 입력하고 disabled
  if (event.target.value !== "free") {
    emailInput.value = event.target.value;
    emailInput.disabled = true;
  } else {
    // 직접입력시 내용초기화
    emailInput.value = "";
    emailInput.disabled = false;
  }
});

// 아이디창 오류메시지

idInput.onblur = function () {
  if (idInput.value === "") {
    idInput.classList.add("invalid");
    document.querySelector(".msg").style.display = "block";
  }
};

idInput.onfocus = function () {
  if (this.classList.contains("invalid")) {
    // 사용자가 새로운 값을 입력하려고 하므로 에러 메시지를 지움
    this.classList.remove("invalid");
    document.querySelector(".msg").style.display = "none";
  }
};

// 비밀번호 유효성 체크 (영문, 숫자, 특수문자 조합으로 이루어진 8~15자)
const pwRegExp =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=\-_`~\[\]\{\}\\\|<>\/?\.\,;:'"])[a-zA-Z0-9!@#$%^&*+=\-_`~\[\]\{\}\\\|<>\/?\.\,;:'"]{8,15}$/;

// 비밀번호 입력창 오류메시지

const passwordError = document.querySelector("#mpw+.msg");
const comparePassword = document.querySelector("#mpw2");
const passwordChkError = document.querySelector("#mpw2+.msg");

console.log(passwordError);
console.log(passwordChkError);

const passwordErrorMsg = {
  0: "비밀번호를 입력해주세요",
  1: "비밀번호를 한번 더 입력해주세요.",
  2: "비밀번호가 일치 하지 않습니다.",
  3: "비밀번호는 영문,숫자,특수문자 를 모두 조합하여 최소 8~15자 입력해 주세요.",
};

// 비밀번호 입력창
password.onblur = function () {
  if (password.value !== "") {
    console.log(pwRegExp.test(password.value));
    if (pwRegExp.test(password.value)) {
      passwordError.style.display = "none";
    } else {
      passwordError.textContent = passwordErrorMsg[3];
      passwordError.style.display = "block";
    }
  } else {
    passwordError.textContent = passwordErrorMsg[0];
    passwordError.style.display = "block";
  }
};

// 비밀번호 확인 입력창
comparePassword.onblur = function () {
  if (comparePassword.value !== "") {
    if (comparePassword.value !== password.value) {
      passwordChkError.textContent = passwordErrorMsg[2];
      passwordChkError.style.display = "block";
    } else {
      passwordChkError.style.display = "none";
    }
  } else if (comparePassword.value === "") {
    passwordChkError.textContent = passwordErrorMsg[1];
    passwordChkError.style.display = "block";
  }
};

// 이름 입력창 오류메시지

const nameError = document.querySelector("#mnm+.msg");
console.log(nameError);

memberName.onblur = function () {
  if (memberName.value !== "") {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
};
