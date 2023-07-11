import { $, $create, $append } from '/js/util/dom.js';
import { GET, POST, PATCH, DELETE } from '/js/util/user.js';

const $modalBg = $('.modalBg');
// $modalBg.attachShadow({ mode: 'open' });

const $brandsWrap = $('.brands-wrap');

const getBrands = async () => {
  const datas = await GET('/api/brands');
  return datas;
};

const createModal = (text) => {
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

  $modal.append($nameGr, $BtnGr);

  $createBtn.addEventListener('click', async () => {
    if (
      $imgFileCreate.files[0] &&
      $imgFileCreate.files &&
      $koreanName.value.length !== 0 &&
      $originName.value.length !== 0
    ) {
      await POST('/api/brands', {
        originName: $originName.value,
        koreanName: $koreanName.value,
        picture: $imgFileCreate.files[0],
      });
    } else {
      alert('파일 이름 똑바로 적어 보내');
    }
  });
  $cancelBtn.addEventListener('click', () => {
    $modalBg.classList.remove('modalBg-on');
    $modalBg.shadowRoot.replaceChildren();
  });
  $modalBg.classList.add('modalBg-on');
  $modalBg.shadowRoot.append($modalStyle, $modal);
};

const render = async () => {
  const init = async () => {
    const { brands } = await getBrands();

    const $brands = brands.map(({ name, picture }) => {
      // console.log(name); // {origin: 'ELICE', korean: '엘리스'}
      // console.log(picture); // /asset/brands/엘리스/viva_magenta_swipe_thumbnail.png
      const $item = $create('div', 'brand-item');

      const $img = $create('img', 'brand-img', { src: picture });
      const $korean = $create('div', 'brand-name');
      $korean.textContent = name.korean;
      const $origin = $create('div', 'brand-name');
      $origin.textContent = name.origin;
      const $brandController = $create('div', 'brand-controller');
      const $viewBtn = $create('button', 'brand-view-btn');
      $viewBtn.textContent = '보기';
      const $updateBtn = $create('button', 'brand-update-btn');
      $updateBtn.textContent = '수정';
      const $deleteBtn = $create('button', 'brand-delete-btn');
      $deleteBtn.textContent = '삭제';
      $append($brandController, $viewBtn, $updateBtn, $deleteBtn);
      $append($item, $img, $korean, $origin, $brandController);

      return $item;
    });

    const $createBtn = $create('div', 'brand-create');
    const $icon = $create('img', '', { src: '/asset/icon/plus.svg' });
    $createBtn.append($icon);

    const brandCreateHandler = () => {
      createModal('create');
    };

    $createBtn.addEventListener('click', brandCreateHandler);

    $brandsWrap.append(...$brands, $createBtn);
  };

  init();
};

render();
