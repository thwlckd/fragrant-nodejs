import { $, $create } from '/js/util/dom.js';
import { brandInit } from '/js/util/init.js';

const $modalBg = $('.modalBg');

export const createModal = () => {
  const $modalStyle = $create('style');
  $modalStyle.textContent = `
  .modal{
    width: 500px;
    height: 500px;
    background-color: #FAFAFA;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    padding: 20px;
    text-align:center;
    box-sizing:border-box;
  }
  .img-view{
    width: 100%;
    height: 300px;
    object-fit: contain;
    background-color: #232323;
    border:none;
  }
  .name-gr{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:10px;
  }
  .name-input{
    border:none;
    outline:none;
    width:250px;
    height:30px;
    box-sizing:border-box;
    padding:5px 10px;
  }
  .btn-gr{
    display:flex;
    gap:10px;
  }
  .btn-gr > button{
    width:100px;
    height:30px;
    box-sizing:border-box;
    padding:5px 10px;
    border:none;
    outline:none;
    cursor:pointer;
  }
  .create-btn{
    background-color: #232323;
    color:white;
  }
  .cancel-btn{
    background-color: #C80000;
    color:white;
  }
  .alert-mgs{
    display:none;
    color:orange;
  }
  `;

  const $modal = $create('div', 'modal');

  const $imgView = $create('img', 'img-view');
  const $imgFileCreate = $create('input', 'file-input', { type: 'file' });
  $modal.append($imgView, $imgFileCreate);

  $imgFileCreate.addEventListener('change', () => {
    if ($imgFileCreate.files[0] && $imgFileCreate.files) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        $imgView.src = e.target.result;
      });
      reader.readAsDataURL($imgFileCreate.files[0]);
    }
  });

  const $nameGr = $create('div', 'name-gr');
  const $koreanName = $create('input', 'name-input', { type: 'text', placeholder: '한글명' });
  const $originName = $create('input', 'name-input', { type: 'text', placeholder: '원명' });
  $nameGr.append($koreanName, $originName);

  const $BtnGr = $create('div', 'btn-gr');
  const $createBtn = $create('button', 'create-btn');
  $createBtn.textContent = '추가';
  const $cancelBtn = $create('button', 'cancel-btn');
  $cancelBtn.textContent = '취소';
  $BtnGr.append($createBtn, $cancelBtn);

  const $alertMsg = $create('small', 'alert-mgs');
  $alertMsg.textContent = '파일과 브랜드 명을 다시 확인하세요';

  $modal.append($nameGr, $BtnGr, $alertMsg);

  $createBtn.addEventListener('click', async () => {
    if (
      $imgFileCreate.files[0] &&
      $imgFileCreate.files &&
      $koreanName.value.length !== 0 &&
      $originName.value.length !== 0
    ) {
      const formData = new FormData();
      formData.append('originName', $originName.value);
      formData.append('koreanName', $koreanName.value);
      formData.append('picture', $imgFileCreate.files[0]);
      await fetch('/api/brands', {
        method: 'POST',
        body: formData,
      });
      brandInit();
      $modalBg.classList.remove('modalBg-on');
      $modalBg.shadowRoot.replaceChildren();
    } else {
      $alertMsg.style.display = 'block';
      setTimeout(() => {
        $alertMsg.style.display = '';
      }, 5000);
    }
  });
  $cancelBtn.addEventListener('click', () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });
  $modalBg.classList.add('modalBg-on');
  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const viewModal = (src) => {
  const $modalStyle = $create('style');
  $modalStyle.textContent = `
    .modal{
      width: 100%;
      height:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:50px;
      text-align:center;
      position:relative;
      top:0;
      left:0;
    }
    .view{
      max-width:100%;
      max-height:100%;
      object-fit:contain;
      background-color:white;
    }
    `;
  const $modal = $create('div', 'modal');
  const $img = $create('img', 'view', { src });
  $modal.append($img);
  $modalBg.classList.add('modalBg-on');

  $img.addEventListener('click', () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};

export const updateModal = (id, { children }) => {
  console.dir(id);
  const $modalStyle = $create('style');
  $modalStyle.textContent = `
  .modal{
    width: 500px;
    height: 500px;
    background-color: #FAFAFA;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    padding: 20px;
    text-align:center;
    box-sizing:border-box;
  }
  .img-view{
    width: 100%;
    height: 300px;
    object-fit: contain;
    background-color: #232323;
    border:none;
  }
  .name-gr{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:10px;
  }
  .name-input{
    border:none;
    outline:none;
    width:250px;
    height:30px;
    box-sizing:border-box;
    padding:5px 10px;
  }
  .btn-gr{
    display:flex;
    gap:10px;
  }
  .btn-gr > button{
    width:100px;
    height:30px;
    box-sizing:border-box;
    padding:5px 10px;
    border:none;
    outline:none;
    cursor:pointer;
  }
  .create-btn{
    background-color: #232323;
    color:white;
  }
  .cancel-btn{
    background-color: #C80000;
    color:white;
  }
  .alert-mgs{
    display:none;
    color:orange;
  }

  `;

  const $modal = $create('div', 'modal');

  const $imgView = $create('img', 'img-view');
  $imgView.src = children[0].src;
  const $imgFileCreate = $create('input', 'file-input', { type: 'file' });
  $modal.append($imgView, $imgFileCreate);

  $imgFileCreate.addEventListener('change', () => {
    if ($imgFileCreate.files[0] && $imgFileCreate.files) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        $imgView.src = e.target.result;
      });
      reader.readAsDataURL($imgFileCreate.files[0]);
    }
  });

  const $nameGr = $create('div', 'name-gr');
  const $koreanName = $create('input', 'name-input', { type: 'text', placeholder: '한글명' });
  $koreanName.value = children[1].textContent;
  const $originName = $create('input', 'name-input', { type: 'text', placeholder: '원명' });
  $originName.value = children[2].textContent;

  $nameGr.append($koreanName, $originName);

  const $BtnGr = $create('div', 'btn-gr');
  const $createBtn = $create('button', 'create-btn');
  $createBtn.textContent = '저장';
  const $cancelBtn = $create('button', 'cancel-btn');
  $cancelBtn.textContent = '취소';
  $BtnGr.append($createBtn, $cancelBtn);

  const $alertMsg = $create('small', 'alert-mgs');
  $alertMsg.textContent = '파일과 브랜드 명을 다시 확인하세요';

  $modal.append($nameGr, $BtnGr, $alertMsg);

  $createBtn.addEventListener('click', async () => {
    if (
      $imgFileCreate.files[0] &&
      $imgFileCreate.files &&
      $koreanName.value.length !== 0 &&
      $originName.value.length !== 0
    ) {
      const formData = new FormData();
      // console.log(_id);
      formData.append('target', id);
      formData.append('originName', $originName.value);
      formData.append('koreanName', $koreanName.value);
      formData.append('picture', $imgFileCreate.files[0]);
      await fetch('/api/brands', {
        method: 'PATCH',
        body: formData,
      });
      brandInit();
      $modalBg.classList.remove('modalBg-on');
      $modalBg.shadowRoot.replaceChildren();
    } else {
      $alertMsg.style.display = 'block';
      setTimeout(() => {
        $alertMsg.style.display = '';
      }, 5000);
    }
  });
  $cancelBtn.addEventListener('click', () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });
  $modalBg.classList.add('modalBg-on');
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
    await fetch(`/api/brands/${id}`, {
      method: 'DELETE',
    });
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
    brandInit();
  });
  $cancelBtn.addEventListener('click', async () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });

  $modalBg.shadowRoot.append($modalStyle, $modal);
};
