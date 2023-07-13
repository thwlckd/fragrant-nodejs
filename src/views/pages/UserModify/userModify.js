import { $ } from '/js/util/dom.js';
import { phNumValidate, passwordValidate } from '/js/util/validate.js';

//해당하는 회원 정보 보여주기
async function getUserInfo() {
  const response = await fetch('/api/users/user/info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return response.json();
  }
  return null;
}

async function setUserInfo() {
  const userInfo = await getUserInfo();

  const { email, userName, phone, address } = userInfo;

  $('#user-id').value = email;
  $('#name').value = userName;
  $('#contact').value = phone;
  if (address) {
    $('#postcode').value = address.postalCode;
  } else {
    $('#postcode').value = '';
  }
  if (address) {
    $('#address').value = address.address1;
  } else {
    $('#address').value = '';
  }
}

setUserInfo();

// 카카오 주소 api 사용하여 주소 정보 입력
document.getElementById('address-button').addEventListener('click', () => {
  new daum.Postcode({
    oncomplete(data) {
      // console.log(data);
      $('#postcode').value = data.zonecode;
      $('#address').value = data.address;
      $('#detail-address').focus();
    },
  }).open();
});

//회원정보변경 버튼 클릭 시 변경사항 적용
async function userModify() {
  const response = await fetch('/api/users/user/info', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: $('#name').value,
      phone: $('#contact').value,
      address: {
        postalCode: $('#postcode').value,
        address1: $('#address').value,
        address2: $('#detail-address').value,
      },
    }),
  });
  if (response.ok) {
    alert('회원정보 변경이 완료되었습니다.');
  }
}

//비밀번호 인풋박스 초기화
function clearPwInput() {
  $('#password-now').value = '';
  $('#password-new').value = '';
  $('#password-new-confirm').value = '';
}

//비밀번호 수정
async function modifyPassword() {
  if ($('#password-new').value !== $('#password-new-confirm').value) {
    alert('새 비밀번호가 일치하지 않습니다.');
    clearPwInput();
    return;
  }
  const response = await fetch('/api/users/user/info/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      oldPassword: $('#password-now').value,
      newPassword: $('#password-new').value,
    }),
  });

  // console.log(response.json());
  const data = await response.json();
  if (response.ok) {
    alert('비밀번호를 변경헀습니다.');
    clearPwInput();
  } else {
    alert(data.error);
  }
}

onsubmit = (event) => {
  event.preventDefault();
  if (event.target.className === 'update-form-user') {
    userModify();
  } else if (event.target.className === 'update-form-password') {
    modifyPassword();
  }
};

function checkMethod(event) {
  const inputVal = event.target.value;
  let checkText = '';

  switch (event.target.name) {
    case 'phone':
      if (inputVal.length === 0) {
        checkText = '';
      } else if (!phNumValidate(inputVal)) {
        checkText = '전화번호 형식에 알맞게 입력해주세요.';
      }
      $('.contact p').textContent = checkText;
      break;

    case 'password-new':
      if (inputVal.length === 0 || !passwordValidate(inputVal)) {
        checkText = '영문/숫자/특수문자 조합 8~15자로 입력해주세요.';
      }
      $('.password-new p').textContent = checkText;
      break;

    case 'password-new-confirm':
      if (inputVal.length === 0) {
        checkText = '비밀번호 변경을 위해 한번 더 입력해주세요.';
      }
      $('.new-pwd-confirm p').textContent = checkText;
      break;
    default:
      break;
  }
}

// $('#name').addEventListener('keyup', checkMethod);
$('#contact').addEventListener('keyup', checkMethod);
$('#password-new').addEventListener('keyup', checkMethod);
$('#password-new-confirm').addEventListener('keyup', checkMethod);

// 회원탈퇴 모달
const open = () => {
  document.querySelector('.modal').classList.remove('hidden');
};

const close = () => {
  document.querySelector('.modal').classList.add('hidden');
};

$('.delete-account-btn').addEventListener('click', open);
$('.close-btn').addEventListener('click', close);
$('.background').addEventListener('click', close);

//회원탈퇴
const deleteAccount = async () => {
  const response = await fetch('/api/users/user/info', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: $('#current-pw-delete').value,
    }),
  });
  const data = response.json();

  if (response.ok) {
    alert('회원탈퇴가 완료되었습니다.');
    location.href = '/login';
  } else {
    alert(data.error);
    $('#current-pw-delete').value = '';
  }
};

$('.delete-confirm-btn').addEventListener('click', deleteAccount);
