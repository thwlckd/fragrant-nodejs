import { GET } from "/js/util/user.js";
import { $ } from "/js/util/dom.js";

const url = window.location.pathname;
const endpoint = url.split("/").slice(-2)[0];

const getUser = await GET(endpoint);

function userInit() {
  const $username = $("#username");
  const $email = $("#e-mail");
  const $phNum = $("#phone-number");
  const $isAdmin = $("#isAdmin");
  const $postalCode = $("#postalCode");
  const $address1 = $("#address1");
  const $address2 = $("#address2");

  $username.value = getUser.userName;
  $email.value = getUser.email;
  $phNum.value = getUser.phone ?? "";
  $isAdmin.value = getUser.isAdmin;
  $postalCode.value = getUser.address.postalCode ?? "";
  $address1.value = getUser.address.address1 ?? "";
  $address2.value = getUser.address.address2 ?? "";
}

userInit();
