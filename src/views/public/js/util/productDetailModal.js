import { $, $create } from '/js/util/dom.js';

const $modalBg = $('.modalBg');

export const updateModal = (btnInit) => {
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
    gap:10px;
    padding: 20px;
    text-align:center;
  }
  .success-msg{
    margin-bottom:40px;
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
  `;
  const $modal = $create('div', 'modal');
  const $successMsg = $create('div', 'success-msg');
  $successMsg.textContent = '상품정보를 수정하였습니다';
  const $successBtn = $create('button');
  $successBtn.textContent = '확인';
  $modal.append($successMsg, $successBtn);

  $modalBg.classList.add('modalBg-on');

  $successBtn.addEventListener('click', async () => {
    btnInit();
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const updateErrModal = () => {
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
    gap:10px;
    padding: 20px;
    text-align:center;
  }
  .err-msg{
    margin-bottom:40px;
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
  `;
  const $modal = $create('div', 'modal');
  const $errMsg = $create('div', 'err-msg');
  $errMsg.textContent = '필수값들을 입력해주세요';
  const $button = $create('button');
  $button.textContent = '확인';
  $modal.append($errMsg, $button);

  $modalBg.classList.add('modalBg-on');

  $button.addEventListener('click', async () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const deleteModal = (id) => {
  // console.log("err")
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
    gap:10px;
    padding: 20px;
    text-align:center;
  }
  .delete-msg{
    margin-bottom:40px;
  }
  .modal > button{
    width:100px;
    height:30px;
    background-color:#c80000;
    color:white;
    cursor:pointer;
    border:none;
    outline:none;
  }
  .cancel{
    background-color: #282828 !important;
  }
  `;
  const $modal = $create('div', 'modal');
  const $deleteMsg = $create('div', 'delete-msg');
  $deleteMsg.textContent = '정말로 삭제하시겠습니까?';
  const $button = $create('button');
  $button.textContent = '확인';
  const $cancel = $create('button', 'cancel');
  $cancel.textContent = '취소';
  $modal.append($deleteMsg, $button, $cancel);

  $modalBg.classList.add('modalBg-on');

  $button.addEventListener('click', async () => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    window.location.href = '/admin/products';
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });
  $cancel.addEventListener('click', async () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const imsi = 'imsi';
