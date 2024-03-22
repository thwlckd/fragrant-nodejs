import { GET, PATCH, DELETE } from '/js/util/user.js';
import { $, $create } from '/js/util/dom.js';
import { check } from '/js/util/validate.js';
import { guideMsg } from '/js/util/constant.js';

const render = async () => {
  const url = window.location.pathname;
  const id = url.split('/').slice(-2)[0];
  const endpoint = `/api/users/${id}`;
  const data = await GET(endpoint);

  // input
  const $username = $('#username');
  const $email = $('#e-mail');
  const $phNum = $('#phone-number');
  const $phNumMsg = $('#phone-number-form small');
  // const $pw = $('#password');
  // const $pwValidate = $('#pw-validate');
  // const $isAdmin = $('#isAdmin');
  const $postalCode = $('#postalCode');
  const $address1 = $('#address1');
  const $address2 = $('#address2');
  const $addressMsg = $('.input-address small');

  // button
  const $init = $('#init');
  const $save = $('#save');
  const $delete = $('#delete');

  // modal
  const $modalBg = $('.modalBg');
  $modalBg.attachShadow({ mode: 'open' });

  const userInit = () => {
    $username.value = data.userName;
    check.name = true;
    $email.value = data.email;
    check.email = true;
    if (data.phone) {
      $phNum.value = data.phone;
      check.phNum = true;
    } else {
      $phNum.value = '';
      check.phNum = true;
    }
    if ($phNum.value === '') {
      $phNumMsg.textContent = guideMsg.PH_NUM_ADD_MSG.msg;
      $phNumMsg.style.color = guideMsg.PH_NUM_ADD_MSG.color;
    }
    // $pw.value = '';
    // $pwValidate.value = '';
    // check.pw = true;
    // $isAdmin.value = data.isAdmin;
    if (data.address) {
      $postalCode.value = data.address.postalCode;
    } else {
      $postalCode.value = '';
    }
    if (data.address) {
      $address1.value = data.address.address1;
    } else {
      $address1.value = '';
    }
    if (data.address) {
      $address2.value = data.address.address2;
      $addressMsg.textContent = '';
      $addressMsg.style.color = '';
      check.address = true;
    } else {
      $address2.value = '';
      $addressMsg.textContent = guideMsg.ADDR_DETAIL_ADD_MSG.msg;
      $addressMsg.style.color = guideMsg.ADDR_DETAIL_ADD_MSG.color;
      check.address = true;
    }
    if ($postalCode.value === '' && $address1.value === '' && $address2.value === '') {
      $addressMsg.textContent = guideMsg.ADDR_ADD_MSG.msg;
      $addressMsg.style.color = guideMsg.ADDR_ADD_MSG.color;
    }

    // console.log(check);
  };

  const userSave = async () => {
    let rejectText = '';
    const successText = '수정 완료!!';
    const PatchData = {
      userName: String,
      phone: String,
      address: {
        postalCode: String,
        address1: String,
        address2: String,
      },
    };

    if (!check.name) {
      rejectText += '사용자 명';
    }
    if (!check.email) {
      if (rejectText.length === 0) {
        rejectText += '이메일';
      } else {
        rejectText += ', 이메일';
      }
    }
    if (!check.phNum) {
      if (rejectText.length === 0) {
        rejectText += '전화번호';
      } else {
        rejectText += ', 전화번호';
      }
    }
    // if (!check.pw) {
    //   if (rejectText.length === 0) {
    //     rejectText += '비밀번호';
    //   } else {
    //     rejectText += ', 비밀번호';
    //   }
    // }
    if (!check.address) {
      if (rejectText.length === 0) {
        rejectText += '주소';
      } else {
        rejectText += ', 주소';
      }
    }

    PatchData.userName = $username.value;
    PatchData.phone = $phNum.value || '';
    PatchData.address.postalCode = $postalCode.value || '';
    PatchData.address.address1 = $address1.value || '';
    PatchData.address.address2 = $address2.value || '';

    // console.log(PatchData);

    const saveModal = (text) => {
      const $modalStyle = $create('style');
      $modalStyle.textContent = `
      .modal{
        width: 300px;
        height: 300px;
        background-color: #FAFAFA;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:50px;
        padding: 20px;
        text-align:center;
      }
      .modal > button{
        width:100px;
        height:30px;
        background-color:#282828;
        color:white;
        cursor:pointer;
      }
      `;

      const $modal = $create('div', 'modal');
      const $modalText = $create('div');
      $modal.append($modalText);
      const $modalBtn = $create('button');
      $modalBtn.textContent = '확인';
      $modal.append($modalBtn);

      $modalText.textContent = text;
      $modalBg.classList.add('modalBg-on');
      $modalBg.shadowRoot.append($modalStyle, $modal);

      $modalBtn.addEventListener('click', () => {
        $modalBg.classList.remove('modalBg-on');
        $modalBg.shadowRoot.replaceChildren();
      });
    };

    if (check.name && check.phNum && check.pw && check.address) {
      // if ($pwValidate.value !== '') {
      //   // PATCH(pwEndPoint);
      //   PATCH(endpoint, PatchData);
      //   saveModal(successText);
      // } else {
      PATCH(endpoint, PatchData);
      saveModal(successText);
      // }
    } else {
      rejectText += ` 을(를) \n다시 확인해주세요.`;
      saveModal(rejectText);
    }
  };

  const deleteModal = (userId) => {
    const $modalStyle = $create('style');
    $modalStyle.textContent = `
    .modal{
      width: 300px;
      height: 300px;
      background-color: #FAFAFA;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:50px;
      padding: 20px;
      text-align:center;
    }
    .modal > button{
      width:100px;
      height:30px;
      background-color:#282828;
      color:white;
      cursor:pointer;
      border:none;
      outline:none;
    }
    .cancel-btn{
      background-color:#C80000 !important;
    }
    `;

    const $modal = $create('div', 'modal');
    const $modalText = $create('div');
    $modal.append($modalText);
    const $modalBtn = $create('button');
    $modalBtn.textContent = '확인';
    const $cancelBtn = $create('button', 'cancel-btn');
    $cancelBtn.textContent = '취소';
    $modal.append($modalBtn, $cancelBtn);

    $modalText.textContent = '삭제하시겠습니까?';
    $modalBg.classList.add('modalBg-on');
    $modalBg.shadowRoot.append($modalStyle, $modal);

    $modalBtn.addEventListener('click', async () => {
      await DELETE(`/api/users/${userId}`);
      $modalBg.classList.remove('modalBg-on');
      $modalBg.shadowRoot.replaceChildren();
      window.location.href = '/admin/users';
    });

    $cancelBtn.addEventListener('click', () => {
      $modalBg.classList.remove('modalBg-on');
      $modalBg.shadowRoot.replaceChildren();
    });
  };

  const userDelete = (userId) => {
    deleteModal(userId);
  };

  $init.addEventListener('click', userInit);
  $save.addEventListener('click', userSave);
  $delete.addEventListener('click', () => {
    userDelete(id);
  });

  userInit();
};

render();
