import { $ } from '/js/util/dom.js';
import { POST } from '/js/util/user.js';

const $email = $('#email');
const $password = $('#password');
const $loginBtn = $('#loginBtn');

$loginBtn.addEventListener('click', async () => {
  const postData = {
    email: $email.value,
    password: $password.value,
  };

  const login = await POST('/api/auth/sign-in', postData);
  console.log('🚀 ~ file: login.js:15 ~ $loginBtn.addEventListener ~ login:', login);

  // document.cookie = `userToken=${login.token}; path=/`;
  // window.location.href = '/admin/users';
});
