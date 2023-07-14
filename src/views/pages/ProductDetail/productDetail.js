// 페이지 상품에 들어갈 경로 설정 . 이미지 브랜드명 상품명

import { $} from '/js/util/dom.js';

let sum;
let itemname;
let itemcapacity;
let itempicture;

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
});




const buyBtn = document.querySelector('.add-order-btn');
const cartBtn = document.querySelector('.add-cart-btn');

cartBtn.addEventListener('click', () => {
  const items = {
    name: itemname,
    capacity: itemcapacity,
    price: sum,
    img: itempicture,
    
  };

  const getItem = window.localStorage.getItem('items') ? [] : window.localStorage.getItem('items');
  const itemsString = getItem.push(items);
  window.localStorage.setItem('items', itemsString);
console.log(getItem);
  // window.location.href = `/cart`;
});

// buyBtn.addEventListener('click', () => {
//   if (response.ok) {
//     window.location.href = '/order';
//   } else {
//     alert('로그인을 해주세요.');
//     window.location.href = '/login';
//   }
// });

// // 페이지네이션
// function searchToObject(searchParam) {
//   const searchObj = searchParam
//     .replace('?', '')
//     .split('&')
//     .reduce((acc, search) => {
//       const [key, value] = search.split('=');
//       acc[key] = value;
//       return acc;
//     }, {});

//   return searchObj;
// }
// function objectToSearch(obj) {
//   const searchParam = `?${Object.entries(obj)
//     .map(([key, value]) => `${key}=${value}`)
//     .join('&')}`;

//   return searchParam;
// }

// function createPagination(totalPage) {
//   const { search } = window.location;
//   const searchObj = search ? searchToObject(search) : {};

//   searchObj.page = searchObj.page || 1;

//   const $target = $('#pagination');
//   const $fragment = document.createDocumentFragment();
//   const $pageWrapper = $create('ul', 'pageWrapper');

//   const $prevPage = $create('div', 'prevPage');
//   $append($fragment, $prevPage);

//   const prevImage = '/asset/icon/left.svg';
//   const $previmg = $create('img', '', { src: prevImage });
//   $append($prevPage, $previmg);

//   if (searchObj.page > 1) {
//     $prevPage.style.cursor = 'pointer';
//     $prevPage.addEventListener('click', () => {
//       window.location.href = pathname + objectToSearch({ ...searchObj, page: +searchObj.page - 1 });
//     });
//   }

//   $append($fragment, $pageWrapper);
//   for (let j = 1; j <= totalPage; j += 1) {
//     const $pageItem = $create('li');
//     $pageItem.textContent = j;

//     if (Number(searchObj.page) !== j) {
//       $pageItem.style.cursor = 'pointer';
//       $pageItem.addEventListener('click', () => {
//         window.location.href = pathname + objectToSearch({ ...searchObj, page: j });
//       });
//     } else {
//       $pageItem.classList.add('current');
//     }

//     $append($pageWrapper, $pageItem);
//   }

//   const $nextPage = $create('div', 'prevPage');
//   $append($fragment, $nextPage);

//   const nextImage = '/asset/icon/right.svg';
//   const $nextImg = $create('img', '', { src: nextImage });
//   $append($nextPage, $nextImg);

//   if (searchObj.page < totalPage) {
//     $nextPage.style.cursor = 'pointer';
//     $nextPage.addEventListener('click', () => {
//       window.location.href = pathname + objectToSearch({ ...searchObj, page: +searchObj.page + 1 });
//     });
//   }

//   $append($target, $fragment);
// }

// // const totalPage = await insertProducts($target, `/api${pathname}${search}`);

// if (totalPage) createPagination(totalPage);
// else {
//   $target.classList.add('no-result');
//   const [current] = window.location.pathname.split('/').slice(-2);
//   const decoded = decodeURIComponent(current);
//   $target.textContent = `찾으시는
//     < ${decoded} > 에 해당하는
//     목록이 존재하지 않습니다.`;

//   const $anchor = $create('a', '', { href: '/products' });
//   $anchor.textContent = '-> 전체 목록으로 돌아가기 <-';
//   $append($target, $anchor);
// }
