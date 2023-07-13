import { $, $create } from '/js/util/dom.js';

const $modalBg = $('.modalBg');

export const updateModal = (id, el) => {
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
  select{
    border:1px solid #999999;
    outline:none;
    padding:5px 10px;
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
  const $state = $create('div', 'state');
  $state.textContent = '주문 상태';
  const $select = $create('select');
  const $opt1 = $create('option', '', { value: '주문완료' });
  $opt1.textContent = '주문완료';
  const $opt2 = $create('option', '', { value: '상품준비중' });
  $opt2.textContent = '상품준비중';
  const $opt3 = $create('option', '', { value: '배송중' });
  $opt3.textContent = '배송중';
  const $opt4 = $create('option', '', { value: '배송완료' });
  $opt4.textContent = '배송완료';
  $select.append($opt1, $opt2, $opt3, $opt4);
  const $updateBtn = $create('button');
  $updateBtn.textContent = '저장';
  const $cancelBtn = $create('button', 'cancel-btn');
  $cancelBtn.textContent = '취소';
  $modal.append($state, $select, $updateBtn, $cancelBtn);

  $modalBg.classList.add('modalBg-on');

  $updateBtn.addEventListener('click', async () => {
    await fetch(`/api/orders/admin/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderStatus: $select.value,
      }),
    });
    el.textContent = $select.value;
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });
  $cancelBtn.addEventListener('click', async () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const deleteModal = (id) => {
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
  const $deleteMsg = $create('div', 'delete-msg');
  $deleteMsg.textContent = '정말로 삭제하시겠습니까?';
  const $deleteBtn = $create('button');
  $deleteBtn.textContent = '확인';
  const $cancelBtn = $create('button', 'cancel-btn');
  $cancelBtn.textContent = '취소';
  $modal.append($deleteMsg, $deleteBtn, $cancelBtn);

  $modalBg.classList.add('modalBg-on');

  $deleteBtn.addEventListener('click', async () => {
    await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    });
    window.location.href = '/admin/orders';
    // $modalBg.classList.remove('modalBg-on');
    // $modalBg.shadowRoot.replaceChildren();
  });
  $cancelBtn.addEventListener('click', async () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};
