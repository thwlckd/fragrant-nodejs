// 페이지 상품에 들어갈 경로 설정 . 이미지 브랜드명 상품명

import { $ } from '/js/util/dom.js';

let sum;
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
    },
  } = await fetch(`/api${url}`).then((res) => res.json());
  const $krNameElementTitle = $('.name-kr');
  $krNameElementTitle.textContent = korean;

  const $krNameElementDetail = $('#tab2 .kr-name-detail');
  $krNameElementDetail.textContent = korean;

  const $originNameElementTitle = $('.eng_name .name-origin');
  $originNameElementTitle.textContent = origin;

  const $originNameElementSub = $('.delivery_box .name-origin');
  $originNameElementSub.textContent = origin;

  const $capacityElement = $('.capacity');
  $capacityElement.textContent = capacity;

  const $priceElement = $('.totalCost');
  $priceElement.textContent = price; // 원가, 숫자타입이엇음

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
};
const { pathname } = window.location;
productDetailRenderer(pathname);

// 밑이 수량 증감 수정본. 수량 증감에 따른 판매가가 보여짐
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const result = document.querySelector('#result');
const totalCost = document.querySelector('.totalCost');

let i = 0;

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
});

