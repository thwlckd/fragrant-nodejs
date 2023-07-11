import { $ } from '/js/util/dom.js';

//해당하는 회원 정보 보여주기
async function getUserInfo() {
  const url = '/users/64a6d7d9b2cb5883241008de';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return response.json();
  }
}

async function setUserInfo() {
  const userInfo = await getUserInfo();

  const { email, userName, phone, address } = userInfo;

  $('#user-id').value = email;
  $('#name').value = userName;
  $('#contact').value = phone;
  $('#postcode').value = address.postalCode;
  $('#address').value = address.address1;
  $('#detail-address').value = address.address2;
}

setUserInfo();

// 카카오 주소 api 사용하여 주소 정보 입력
document.getElementById('address-button').addEventListener('click', () => {
  new daum.Postcode({
    oncomplete(data) {
      console.log(data);
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById('address').value = data.address;
      document.getElementById('detail-address').focus();
    },
  }).open();
});

//회원정보변경 버튼 클릭 시 변경사항 적용
async function sendUserInfo() {
  const url = '/users/64a6d7d9b2cb5883241008de';
  const response = fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  });
  if (response.ok) {
    return response.json();
  }
}

async function userModify() {
  const sendInfo = await sendUserInfo();
  const { email, userName, phone, address } = sendInfo;

  $('#userId').value = email;
  $('#name').value = userName;
  $('#contact').value = phone;
  $('#postcode').value = address.postalCode;
  $('#address').value = address.address1;
  $('#detail-address').value = address.address2;
}

$('#update-form').addEventListener('submit', (event) => {
  event.preventDefault();
  userModify();
});

//   .catch(function (error) {
//     console.log(error);
//     alert("Failed");
//   });

// 회원탈퇴 모달
const open = () => {
  document.querySelector('.modal').classList.remove('hidden');
};

const close = () => {
  document.querySelector('.modal').classList.add('hidden');
};

document.querySelector('.delete-account-btn').addEventListener('click', open);
document.querySelector('.close-btn').addEventListener('click', close);
document.querySelector('.background').addEventListener('click', close);
// document.gquerySelector('modal').scrollTo(0, 0);

async function modifyPassword() {
  const url = '/users/64a6d7d9b2cb5883241008de';

  const response = fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      oldPassword: $('#password-now').value,
      newPassword: $('#password-new').value,
    },
  });
  if (response.ok) {
    return response.json();
  }
}

// $pw.value = '';
// $pwValidate.value = '';
// check.pw = true;
// // $isAdmin.value = data.isAdmin;
// if (data.address) {
//   $postalCode.value = data.address.postalCode;
// } else {
//   $postalCode.value = '';
// }
// if (data.address) {
//   $address1.value = data.address.address1;
// } else {
//   $address1.value = '';
// }
// if (data.address) {
//   $address2.value = data.address.address2;
//   $addressMsg.textContent = '';
//   $addressMsg.style.color = '';
//   check.address = true;
// } else {
//   $address2.value = '';
//   $addressMsg.textContent = guideMsg.ADDR_DETAIL_ADD_MSG.msg;
//   $addressMsg.style.color = guideMsg.ADDR_DETAIL_ADD_MSG.color;
//   check.address = true;
// }
// if ($postalCode.value === '' && $address1.value === '' && $address2.value === '') {
//   $addressMsg.textContent = guideMsg.ADDR_ADD_MSG.msg;
//   $addressMsg.style.color = guideMsg.ADDR_ADD_MSG.color;
// }

// document.getElementById('update-form').addEventListener('submit', (event) => {
//   event.preventDefault();
