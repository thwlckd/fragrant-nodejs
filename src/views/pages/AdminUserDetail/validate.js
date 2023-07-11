import { $ } from '/js/util/dom.js';
import { check, emailValidate, phNumValidate, passwordValidate } from '/js/util/validate.js';
import { guideMsg } from '/js/util/constant.js';

const $username = $('#username');
const $usernameMsg = $('#username-form small');

$username.onkeyup = () => {
  if ($username.value === '') {
    $usernameMsg.textContent = guideMsg.USER_NAME_EMPTY.msg;
    $usernameMsg.style.color = guideMsg.USER_NAME_EMPTY.color;
    check.name = false;
  } else {
    $usernameMsg.textContent = '';
    check.name = true;
  }
};

const $email = $('#e-mail');
const $emailMsg = $('#e-mail-form small');
$email.onkeyup = () => {
  if ($email.value === '') {
    $emailMsg.textContent = guideMsg.E_MAIL_EMPTY.msg;
    $emailMsg.style.color = guideMsg.E_MAIL_EMPTY.color;
    check.email = false;
  } else if (!emailValidate($email.value)) {
    $emailMsg.textContent = guideMsg.E_MAIL_SYNTAX.msg;
    $emailMsg.style.color = guideMsg.E_MAIL_SYNTAX.color;
    check.email = false;
  } else {
    $emailMsg.textContent = '';
    check.email = true;
  }
};

const $phNum = $('#phone-number');
const $phNumMsg = $('#phone-number-form small');

// if ($phNum.value === '') {
//   $phNumMsg.textContent = guideMsg.PH_NUM_ADD_MSG.msg;
//   $phNumMsg.style.color = guideMsg.PH_NUM_ADD_MSG.color;
// }
$phNum.onkeyup = () => {
  if ($phNum.value === '') {
    $phNumMsg.textContent = guideMsg.PH_NUM_ADD_MSG.msg;
    $phNumMsg.style.color = guideMsg.PH_NUM_ADD_MSG.color;
    check.phNum = false;
  } else if (phNumValidate($phNum.value)) {
    $phNumMsg.textContent = '';
    check.phNum = true;
  } else {
    $phNumMsg.textContent = guideMsg.PH_NUM_SYNTAX.msg;
    $phNumMsg.style.color = guideMsg.PH_NUM_SYNTAX.color;
    check.phNum = false;
  }
};

// const $password = $('#password');
// const $passwordMsg = $('#password-form small');

// const $pwValidate = $('#pw-validate');
// const $pwValidateMsg = $('#pw-validate-form small');

// $password.onkeyup = () => {
//   if ($password.value === '') {
//     $passwordMsg.textContent = '';
//     $pwValidate.value = '';
//     $pwValidate.readOnly = true;
//     $pwValidateMsg.textContent = '';
//     check.pw = true;
//   } else if (passwordValidate($password.value)) {
//     $passwordMsg.textContent = '';
//     $pwValidate.readOnly = false;
//     $pwValidateMsg.textContent = guideMsg.PASSWORD_VALIDATE_EMPTY.msg;
//     $pwValidateMsg.style.color = guideMsg.PASSWORD_VALIDATE_EMPTY.color;
//     check.pw = false;
//   } else {
//     $passwordMsg.textContent = guideMsg.PASSWORD_SYNTAX.msg;
//     $passwordMsg.style.color = guideMsg.PASSWORD_SYNTAX.color;
//     check.pw = false;
//   }
// };

// $pwValidate.onkeyup = () => {
//   if ($pwValidate.value === '') {
//     $pwValidateMsg.textContent = guideMsg.PASSWORD_VALIDATE_EMPTY.msg;
//     $pwValidateMsg.style.color = guideMsg.PASSWORD_VALIDATE_EMPTY.color;
//     check.pw = false;
//   } else if ($password.value === $pwValidate.value) {
//     $pwValidateMsg.textContent = '';
//     check.pw = true;
//   } else {
//     $pwValidateMsg.textContent = guideMsg.PASSWORD_VALIDATE_SYNTAX.msg;
//     $pwValidateMsg.style.color = guideMsg.PASSWORD_VALIDATE_SYNTAX.color;
//     check.pw = false;
//   }
// };

// const $postalCode = $('#postalCode');
// const $address1 = $('#address1');
const $address2 = $('#address2');
const $addressMsg = $('.input-address small');

// if ($postalCode.value === '' && $address1.value === '' && $address2.value === '') {
//   $addressMsg.textContent = guideMsg.ADDR_ADD_MSG.msg;
//   $addressMsg.style.color = guideMsg.ADDR_ADD_MSG.color;
// }
$address2.addEventListener('keyup', () => {
  if ($address2.value === '') {
    $addressMsg.textContent = guideMsg.ADDR_DETAIL_ADD_MSG.msg;
    $addressMsg.style.color = guideMsg.ADDR_DETAIL_ADD_MSG.color;
    check.address = false;
  } else {
    $addressMsg.textContent = '';
    $addressMsg.style.color = '';
    check.address = true;
  }
});
