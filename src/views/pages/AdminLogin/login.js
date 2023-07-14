import { $ } from '/js/util/dom.js';
import { POST } from '/js/util/user.js';

const $email = $('#email');
const $password = $('#password');
const $loginBtn = $('#loginBtn');
const signInCheck = async () => {
  const res = await fetch('/api/auth/is-sign-in');
  console.log(res);
  if(res.ok){
    window.location.href = '/admin/users';
  }
};

signInCheck();

$loginBtn.addEventListener('click', async () => {
  const postData = {
    email: $email.value,
    password: $password.value,
  };

  const login = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  console.log(login);

  // document.cookie = `userToken=${login.token}; path=/`;
  window.location.href = '/admin/users';
});
