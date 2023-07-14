import { $ } from '/js/util/dom.js';

let sum;
let itemname;
let itemcapacity;
let itempicture;
let id;
const productDetailRenderer = async (url) => {
  const {
    product: {
      name: { origin, korean },
      capacity,
      price,
      picture,
      note,
      brand: {
        name: { origin: brandorigin },
      },
      description,
      productId,
    },
  } = await fetch(`/api${url}`).then((res) => res.json());
  const $krNameElementTitle = $('.name-kr');
  $krNameElementTitle.textContent = korean;

  const $krNameElementDetail = $('#tab2 .kr-name-detail');
  $krNameElementDetail.textContent = korean;

  const $originNameElementTitle = $('.eng_name .name-origin');
  $originNameElementTitle.textContent = origin;

  const $originNameElementSub = $('.count_name .name-origin');
  $originNameElementSub.textContent = origin;

  const $capacityElement = $('.capacity');
  $capacityElement.textContent = capacity;

  const $priceElement = $('.totalCost');
  $priceElement.textContent = `\u00a0 ${price.toLocaleString()}`; // 원가, 숫자타입이엇음

  const $pictureElement = $('.product_info img');
  $pictureElement.src = picture;

  const $noteElement1 = $('.note1');
  $noteElement1.textContent = note[0].type;

  const $noteElement2 = $('.note2');
  $noteElement2.textContent = note[1].type;

  const $noteElement3 = $('.note3');
  $noteElement3.textContent = note[2].type;

  const $brandNameElement = $('.eng_name .brandname-origin');
  $brandNameElement.textContent = brandorigin;

  const $descriptionElement = $('.description');
  $descriptionElement.textContent = description;

  sum = price;
  itemname = korean;
  itemcapacity = capacity;
  itempicture = picture;
  id = productId;
};
const { pathname } = window.location;
productDetailRenderer(pathname);

// 밑이 수량 증감 수정본. 수량 증감에 따른 판매가가 보여짐
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const result = document.querySelector('#result');
const totalCost = document.querySelector('.totalCost');

let i = 1;

plus.addEventListener('click', () => {
  i += 1;
  result.textContent = i;
  const totalCostNum = i * sum;
  totalCost.textContent = `\u00a0 ${totalCostNum.toLocaleString()}`;
});

minus.addEventListener('click', () => {
  if (i > 0) {
    i -= 1;
    result.textContent = i;
    const totalCostNum = i * sum;
    totalCost.textContent = `\u00a0 ${totalCostNum.toLocaleString()}`;
  } else {
    totalCost.textContent = `\u00a0 ${0}`; // 판매가
  }
  return i;
});

const buyBtn = document.querySelector('.add-order-btn');
const cartBtn = document.querySelector('.add-cart-btn');

cartBtn.addEventListener('click', () => {
  const items = {
    id,
    count: Number(i),
  };

  const getItem = JSON.parse(localStorage.getItem('cart')) || [];
  const index = getItem.findIndex((v) => v.id === id);
  if (index >= 0) {
    getItem[index].count += items.count;
  } else {
    getItem.push(items);
  }

  window.localStorage.setItem('cart', JSON.stringify(getItem));
  if (confirm('장바구니에 상품이 담겼습니다.\n장바구니로 이동 하시겠습니까?')) {
    window.location.href = `/cart`;
  }
});

buyBtn.addEventListener('click', () => {
  fetch('/api/auth/is-sign-in').then((response) => {
    if (response.ok) {
      localStorage.setItem(
        'toOrder',
        JSON.stringify([
          {
            id,
            count: i,
            name: itemname,
            capacity: itemcapacity,
            price: sum,
            picture: itempicture,
          },
        ]),
      );
      window.location.href = '/order';
    } else if (confirm('로그인이 필요한 서비스 입니다.\n로그인 페이지로 이동 하시겠습니까?')) {
      window.location.href = '/login';
    }
  });
});
