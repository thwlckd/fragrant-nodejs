import { $, $all, $create, $append } from '/js/util/dom.js';
import { guideMsg } from '/js/util/constant.js';

const $postCode = $('#post-code');
const $address1 = $('#address1');
const $address2 = $('#address2');
const $addressMsg = $('#requirement');

const popupApi = () => {
  new daum.Postcode({
    oncomplete: ({ zonecode, address }) => {
      $postCode.value = zonecode;
      $address1.value = address;
      $address2.value = '';

      $address2.readOnly = false;
      $address2.focus();
    },
  }).open();
};

$('#btn-address-api').addEventListener('click', popupApi);
$postCode.addEventListener('click', popupApi);
$address1.addEventListener('click', popupApi);

const orderInfo = {};

const orderCompleted = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const toOrder = JSON.parse(localStorage.getItem('toOrder'));
  localStorage.removeItem('toOrder');
  const ordered = toOrder.map(({ id }) => id);
  const newCart = cart.filter(({ id }) => !ordered.includes(id));
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const checkItem = () => {
  const $price = $('.products-price');
  const $delivery = $('.delivery-price');
  const $total = $('.total-price');

  let current = 0;

  Object.values(orderInfo).forEach((v) => {
    current += v.quantity * v.price;
  });

  $price.textContent = current;
  const delivery = current >= 100000 ? 0 : 2500;
  $delivery.textContent = delivery;
  $total.textContent = current + delivery;
};

const listRenderer = () => {
  const $list = $('.product-list');
  const toOrderList = JSON.parse(localStorage.getItem('toOrder'));
  console.log(toOrderList);
  toOrderList.forEach(async ({ id, count, name: korean, capacity, price, picture }) => {
    orderInfo[id] = { productId: id, quantity: count, name: korean, capacity, img: picture, price };

    const $item = $create('div', 'item');
    const $imgWrap = $create('div', 'cart-img');
    const $img = $create('img', '', { src: picture });
    $append($imgWrap, $img);
    const $cartInfo = $create('div', 'cart-info');
    const $name = $create('div', 'name-kr');
    $name.textContent = korean;
    const $capacity = $create('div', 'capacity');
    $capacity.textContent = capacity;
    $append($cartInfo, $name, $capacity);
    const $priceInfo = $create('div', 'num');
    const $price = $create('span', 'won');
    $price.textContent = '₩ ';
    const $priceCost = $create('span', 'won');
    $priceCost.textContent = price;
    $append($price, $priceCost);
    const $count = $create('span', 'result-count');
    $append($priceInfo, $price, $count);
    $append($cartInfo, $priceInfo);
    $append($item, $imgWrap, $cartInfo);

    const $result = $create('span', '', { id: 'result' });
    $result.textContent = `${count} 개`;
    $append($count, $result);

    $append($list, $item);
    checkItem();
  });
};

listRenderer();

$('.pay-do').addEventListener('click', async () => {
  if (!$('#name').value || $('#name').value.length < 2) alert('이름을 정확히 입력해 주세요');
  else if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test($('#phone').value))
    alert('폰번호를 정확히 입력해 주세요');
  else if (!$postCode.value || !$address1.value || !$address2.value)
    alert('주소 정확히 입력해 주세요');
  else if (confirm('주문 하시겠습니까?')) {
    const res = await fetch('/api/orders/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: Object.values(orderInfo).map((v) => ({
          ...v,
          capacity: Number(v.capacity.match(/[0-9]*/)[0]),
        })),
        orderer: {
          name: $('#name').value,
          phone: $('#phone').value.replace(/[-]/g, ''),
          address: {
            postalCode: Number($postCode.value),
            address1: $address1.value,
            address2: $address2.value,
          },
        },
        price: Number($('.total-price').textContent),
        requirement: $('#requirement').value,
      }),
    });

    if (res.ok) {
      orderCompleted();
      window.location.href = '/user/mypage';
    }
  }
});
