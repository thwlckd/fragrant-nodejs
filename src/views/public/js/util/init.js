import { $, $create, $append } from '/js/util/dom.js';
import { GET } from '/js/util/user.js';
import { createModal, viewModal, updateModal, deleteModal } from '/js/util/modal.js';

export const brandInit = async () => {
  const $brandsWrap = $('.brands-wrap');

  if ($brandsWrap.length !== 0) {
    $brandsWrap.replaceChildren();
  }

  const { brands } = await GET('/api/brands');

  const $brands = brands.map(({ name, picture, _id }) => {
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
    const brandViewHandler = () => {
      viewModal(picture);
    };
    $viewBtn.addEventListener('click', brandViewHandler);

    const $updateBtn = $create('button', 'brand-update-btn');
    $updateBtn.textContent = '수정';
    const brandUpdateHandler = (id) => {
      updateModal(id, $item);
    };
    $updateBtn.addEventListener('click', () => {
      brandUpdateHandler(_id);
    });

    const $deleteBtn = $create('button', 'brand-delete-btn');
    $deleteBtn.textContent = '삭제';
    const brandDeleteHandler = (id) => {
      deleteModal(id);
    };
    $deleteBtn.addEventListener('click', () => {
      brandDeleteHandler(_id);
    });
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

export const noteInit = 1;
