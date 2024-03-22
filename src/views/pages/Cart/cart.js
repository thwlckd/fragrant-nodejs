import { $, $all, $create, $append } from '/js/util/dom.js';

const cartinfo = {};
const $list = $('.cart-wrap');

const getItemAtServer = async (id) => {
  const { product } = await fetch(`/api/products/${id}`).then((res) => res.json());
  const {
    name: { korean },
    capacity,
    price,
    picture,
  } = product;
  return { korean, capacity, price, picture };
};

const checkItem = () => {
  const $price = $('.products-price');
  const $delivery = $('.delivery-price');
  const $total = $('.total-price');

  let current = 0;

  const $checks = $all('.selectCheck');
  $checks.forEach((v) => {
    if (v.checked) {
      const { price, count } = cartinfo[v.id];
      current += price * count;
    }

    cartinfo[v.id].checked = v.checked;
  });

  $price.textContent = current;
  const delivery = current >= 100000 ? 0 : 2500;
  $delivery.textContent = delivery;
  $total.textContent = current + delivery;
};

const checkAll = () => {
  const $checkAll = $('#allCheck-box');
  const $checks = $all('.selectCheck');
  $checkAll.addEventListener('change', (e) => {
    $checks.forEach((v) => {
      v.checked = e.target.checked;
    });

    checkItem();
  });
};

const changeCount = (id, signal, target) => {
  if (signal === '+') {
    cartinfo[id].count += 1;
  } else if (signal === '-') {
    cartinfo[id].count -= 1;
  }
  if (cartinfo[id].count < 1) {
    cartinfo[id].count = 1;
  }

  target.textContent = cartinfo[id].count;

  const cart = JSON.parse(localStorage.getItem('cart'));
  cart[cart.findIndex((v) => v.id === id)].count = cartinfo[id].count;
  localStorage.setItem('cart', JSON.stringify(cart));

  checkItem();
};

const cartRenderer = async () => {
  const cartList = JSON.parse(localStorage.getItem('cart'));
  cartList.forEach(async ({ id, count }) => {
    const { korean, capacity, price, picture } = await getItemAtServer(id);
    cartinfo[id] = { id, capacity, name: korean, count, price, picture, checked: false };

    const $item = $create('div', 'item');
    const $checkbox = $create('input', 'selectCheck', {
      type: 'checkbox',
      id,
    });
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
    $append($item, $checkbox, $imgWrap, $cartInfo);

    const $minus = $create('button', 'minus');
    $minus.textContent = '-';
    const $result = $create('span', '', { id: 'result' });
    $result.textContent = count;
    const $plus = $create('button', 'plus');
    $plus.textContent = '+';
    $append($count, $minus, $result, $plus);

    $append($list, $item);

    $checkbox.addEventListener('change', checkItem);
    $minus.addEventListener('click', (e) => {
      e.preventDefault();
      changeCount(id, '-', $result);
    });
    $plus.addEventListener('click', (e) => {
      e.preventDefault();
      changeCount(id, '+', $result);
    });

    checkAll();
  });
};

$('.selectdelete-btn').addEventListener('click', () => {
  if (confirm('삭제 하시겠습니까?')) {
    const cart = JSON.parse(localStorage.getItem('cart')).filter(({ id }) => !cartinfo[id].checked);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
  }
});

$('.pay-do').addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')).filter(({ id }) => cartinfo[id].checked);
  localStorage.setItem('toOrder', JSON.stringify(cart.map((v) => cartinfo[v.id])));

  if ([...$all('.selectCheck')].reduce((acc, v) => acc || v.checked, false)) {
    fetch('/api/auth/is-sign-in').then((res) => {
      if (res.ok) {
        window.location.href = '/order';
      } else if (
        confirm('로그인후 이용가능한 서비스 입니다.\n로그인 페이지로 이동 하시겠습니까?')
      ) {
        window.location.href = '/login';
      }
    });
  }
});

cartRenderer();
