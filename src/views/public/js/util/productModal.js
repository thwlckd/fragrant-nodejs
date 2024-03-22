import { $, $create } from '/js/util/dom.js';

const $modalBg = $('.modalBg');

export const createModal = () => {
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
  $successMsg.textContent = '상품을 추가하였습니다';
  const $successBtn = $create('button');
  $successBtn.textContent = '확인';
  $modal.append($successMsg, $successBtn);

  $modalBg.classList.add('modalBg-on');

  $successBtn.addEventListener('click', async () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const createErrModal = () => {
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

export const imsi = 'imsi';
