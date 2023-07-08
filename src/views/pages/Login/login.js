console.log("확인");

//const email = document.getElementById("uid").value;
const idEmail = document.querySelector("#uid");
const password = document.querySelector("#upassword");
const loginForm = document.querySelector(".userinput");

loginForm.addEventListener("submit", e => {
  e.preventDefault()

  fetch("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({
      email: idEmail.value,
      password: password.value
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.token);
    });
})


// 아이디 입력 유효성

const idEmailError = document.querySelector("#uid+.login-msg");

const idRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const idEmailErrorMsg = {
  0: "이메일을 입력하세요",
  1: "아이디(이메일)는 이메일 형식으로 입력해주세요.",
};

console.log(idEmailError);

idEmail.onblur = function () {
  if (idEmail.value !== "") {
    console.log(idRegExp.test(idEmail.value));
    if (idRegExp.test(idEmail.value)) {
      idEmailError.style.display = "none";
    } else {
      idEmailError.textContent = idEmailErrorMsg[1];
      idEmailError.style.display = "block";
    }
  } else {
    idEmailError.textContent = idEmailErrorMsg[0];
    idEmailError.style.display = "block";
  }
};
