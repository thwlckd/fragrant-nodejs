import { $, $create, $append } from '/js/util/dom.js';
import { GET } from '/js/util/user.js';
import { createModal, viewModal, updateModal, deleteModal } from '/js/util/brandModal.js';
import {
  updateModal as orderUpdateModal,
  deleteModal as orderDeleteModal,
} from '/js/util/orderDetailModal.js';

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

export const orderDetailInit = async () => {
  $('.modalBg').attachShadow({ mode: 'open' });
  const url = window.location.pathname;
  const id = url.split('/').slice(-2)[0];
  const endpoint = `/api/orders/${id}`;
  const { orderStatus, orderTime, orderer, price, products, requirement, _id } = await GET(
    endpoint,
  );

  const $orderId = $('#orderId');
  $orderId.textContent = _id;
  const $ordererEmail = $('#ordererEmail');
  $ordererEmail.textContent = orderer.email;
  const $ordererName = $('#ordererName');
  $ordererName.textContent = orderer.name;
  const $ordererPhNum = $('#ordererPhNum');
  $ordererPhNum.textContent = orderer.phone;
  const $ordererPostalCode = $('#ordererPostalCode');
  $ordererPostalCode.textContent = orderer.address.postalCode;
  const $ordereraAddr = $('#ordereraAddr');
  $ordereraAddr.textContent = `${orderer.address.address1} ${orderer.address.address2}`;

  const $ordersStandard = $('#ordersStandard');

  const $orderRequire = $('#orderRequire');
  $orderRequire.textContent = requirement;
  const $orderStatus = $('#orderStatus');
  $orderStatus.textContent = orderStatus;
  const $orderTime = $('#orderTime');
  $orderTime.textContent = orderTime;
  const $orderPrice = $('#orderPrice');
  $orderPrice.textContent = `${price}₩`;

  const productsMap = products.map((product) => {
    // console.log(product);
    // 상품 ID
    const $productId = $create('tr', 'productId');
    const $idTh = $create('th');
    $idTh.textContent = '상품 ID';
    const $idTd = $create('td', '', { colspan: 3 });
    $idTd.textContent = product.productId;
    $productId.append($idTh, $idTd);
    // 상품명
    const $productName = $create('tr', 'productName');
    const $nameTh = $create('th');
    $nameTh.textContent = '상품명';
    const $nameTd = $create('td', '', { colspan: 3 });
    $nameTd.textContent = product.name;
    $productName.append($nameTh, $nameTd);
    // 개당 가격
    const $priceName = $create('tr', 'priceName');
    const $priceTh = $create('th');
    $priceTh.textContent = '개당 가격';
    const $priceTd = $create('td', '', { colspan: 3 });
    $priceTd.textContent = product.price;
    $priceName.append($priceTh, $priceTd);
    // 갯수
    const $quantity = $create('tr', 'quantity');
    const $quantityTh = $create('th');
    $quantityTh.textContent = '갯수';
    const $quantityTd = $create('td', '', { colspan: 3 });
    $quantityTd.textContent = product.quantity;
    $quantity.append($quantityTh, $quantityTd);
    // 용량
    const $capacity = $create('tr', 'capacity');
    const $capacityTh = $create('th');
    $capacityTh.textContent = '용량';
    const $capacityTd = $create('td', '', { colspan: 3 });
    $capacityTd.textContent = '35ML';
    $capacity.append($capacityTh, $capacityTd);
    // 이미지
    const $imgTr = $create('tr', 'imgTr');
    const $imgTh = $create('th');
    $imgTh.textContent = '이미지';
    const $imgTd = $create('td', '', { colspan: 3 });
    const $img = $create('img', '', {
      src: product.img,
    });
    $img.style.maxWidth = '200px';
    $img.style.maxHeight = '200px';

    $imgTd.append($img);
    $imgTr.append($imgTh, $imgTd);

    const $fragment = document.createDocumentFragment();
    $fragment.append($productId, $productName, $priceName, $quantity, $quantity, $capacity, $imgTr);

    return $fragment;
  });
  $ordersStandard.rowSpan = 1 + productsMap.length * 6;
  productsMap.forEach((fragment) => {
    [...fragment.children].reverse().forEach((node) => {
      $ordersStandard.parentNode.insertAdjacentElement('afterend', node);
    });
  });

  const $update = $('.updateBtn');
  const $delete = $('.deleteBtn');

  $update.addEventListener('click', () => {
    orderUpdateModal(_id, $orderStatus);
  });
  $delete.addEventListener('click', () => {
    orderDeleteModal(_id);
  });
};

export const noteInit = 1;
