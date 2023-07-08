import { $ } from "/js/util/dom.js";
import {
  emailValidate,
  phNumValidate,
  passwordValidate,
} from "/js/util/validate.js";

const guide_msg = {
  USER_NAME_EMPTY: { msg: "사용자 이름은 필수값입니다!!", color: "red" },
  E_MAIL_EMPTY: { msg: "이메일은 필수값입니다!!", color: "red" },
  E_MAIL_SYNTAX: { msg: "이메일 형식을 지켜주세요!!", color: "red" },
  PH_NUM_ADD_MSG: {
    msg: "전화 번호를 추가해주세요!!",
    color: "orange",
  },
  PH_NUM_SYNTAX: {
    msg: "전화 번호 형식을 지켜주세요!!",
    color: "red",
  },
  PASSWORD_SYNTAX: { msg: "영문/숫자/특수문자 조합 8~15자", color: "red" },
  PASSWORD_VALIDATE_EMPTY: { msg: "비밀번호를 확인해주세요!!", color: "red" },
  PASSWORD_VALIDATE_SYNTAX: { msg: "비밀번호가 다릅니다!!", color: "red" },
  ADDR_ADD_MSG: { msg: "주소를 넣어주세요!!", color: "orange" },
  ADDR_DETAIL_ADD_MSG: { msg: "상세주소를 넣어주세요!!", color: "orange" },
};

const $username = $("#username");
const $username_msg = $("#username-form small");

$username.onkeyup = (e) => {
  $username.value === ""
    ? (($username_msg.textContent = guide_msg.USER_NAME_EMPTY.msg),
      ($username_msg.style.color = guide_msg.USER_NAME_EMPTY.color))
    : ($username_msg.textContent = "");
};

const $email = $("#e-mail");
const $email_msg = $("#e-mail-form small");
$email.onkeyup = (e) => {
  $email.value === ""
    ? (($email_msg.textContent = guide_msg.E_MAIL_EMPTY.msg),
      ($email_msg.style.color = guide_msg.E_MAIL_EMPTY.color))
    : !emailValidate($email.value)
    ? (($email_msg.textContent = guide_msg.E_MAIL_SYNTAX.msg),
      ($email_msg.style.color = guide_msg.E_MAIL_SYNTAX.color))
    : ($email_msg.textContent = "");
};

const $phNum = $("#phone-number");
const $phNum_msg = $("#phone-number-form small");

if ($phNum.value === "") {
  $phNum_msg.textContent = guide_msg.PH_NUM_ADD_MSG.msg;
  $phNum_msg.style.color = guide_msg.PH_NUM_ADD_MSG.color;
}
$phNum.onkeyup = (e) => {
  $phNum.value === ""
    ? (($phNum_msg.textContent = guide_msg.PH_NUM_ADD_MSG.msg),
      ($phNum_msg.style.color = guide_msg.PH_NUM_ADD_MSG.color))
    : phNumValidate($phNum.value)
    ? ($phNum_msg.textContent = "")
    : (($phNum_msg.textContent = guide_msg.PH_NUM_SYNTAX.msg),
      ($phNum_msg.style.color = guide_msg.PH_NUM_SYNTAX.color));
};

const $password = $("#password");
const $password_msg = $("#password-form small");

const $pwValidate = $("#pw-validate");
const $pwValidate_msg = $("#pw-validate-form small");

$password.onkeyup = (e) => {
  $password.value === ""
    ? (($password_msg.textContent = ""),
      ($pwValidate.value = ""),
      ($pwValidate.readOnly = true),
      ($pwValidate_msg.textContent = ""))
    : passwordValidate($password.value)
    ? (($password_msg.textContent = ""),
      ($pwValidate.readOnly = false),
      ($pwValidate_msg.textContent = guide_msg.PASSWORD_VALIDATE_EMPTY.msg),
      ($pwValidate_msg.style.color = guide_msg.PASSWORD_VALIDATE_EMPTY.color))
    : (($password_msg.textContent = guide_msg.PASSWORD_SYNTAX.msg),
      ($password_msg.style.color = guide_msg.PASSWORD_SYNTAX.color));
};

$pwValidate.onkeyup = (e) => {
  $pwValidate.value === ""
    ? (($pwValidate_msg.textContent = guide_msg.PASSWORD_VALIDATE_EMPTY.msg),
      ($pwValidate_msg.style.color = guide_msg.PASSWORD_VALIDATE_EMPTY.color))
    : $password.value === $pwValidate.value
    ? ($pwValidate_msg.textContent = "")
    : (($pwValidate_msg.textContent = guide_msg.PASSWORD_VALIDATE_SYNTAX.msg),
      ($pwValidate_msg.style.color = guide_msg.PASSWORD_VALIDATE_SYNTAX.color));
};

const $postalCode = $("#postalCode");
const $address1 = $("#address1");
const $address2 = $("#address2");
const $address_msg = $(".input-address small");

$username.onkeyup = (e) => {
  $username.value === ""
    ? (($username_msg.textContent = guide_msg.USER_NAME_EMPTY.msg),
      ($username_msg.style.color = guide_msg.USER_NAME_EMPTY.color))
    : ($username_msg.textContent = "");
};
