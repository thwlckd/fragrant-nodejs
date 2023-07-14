import { $, $create, $append } from '/js/util/dom.js';

const url = window.location.pathname.split('/');
const id = url[url.length - 2];

async function getOrders() {
  const orders = await fetch(`/api/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await orders.json();

  if (!orders.ok) {
    return alert(data.error);
  }

  return data;
}

let receiver;
let contact;
let requirementMsg;

//주문상품 리스트
async function displayProductList() {
  const orderList = await getOrders();
  const prodcutList = orderList.products;

  const { orderTime, _id, orderStatus, price, orderer, requirement } = orderList;
  const paymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const paymentUmint1 = (price - 2500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  receiver = orderer.name;
  contact = orderer.phone;
  requirementMsg = requirement;

  //배송현황 표시
  const orderStausArr = ['주문완료', '상품준비중', '배송중', '배송완료'];
  const currentStatus = $('.order-status' + orderStausArr.indexOf(orderStatus));
  currentStatus.style.backgroundColor = 'rgb(67, 67, 67)';
  currentStatus.querySelector('img').style.filter = 'brightness(150%)';
  currentStatus.querySelector('p').style.color = '#f7f7f7';

  //주문정보
  $('#order-date').textContent = `주문일자:\u00a0\ ${orderTime}`;
  $('#order-id').textContent = `주문번호:\u00a0\ ${_id}`;
  $('#order-status-text').textContent = orderStatus;

  //금액 정보
  $('#payment-amount').textContent = `총 결제금액\u00a0\ | \u00a0\ ${paymentUnit} 원`;
  $('#payment-type').textContent = `상품금액 ${paymentUnit} 원 + 배송비 0 원`;

  //배송지 정보
  $('#receiver').value = orderer.name;
  $('#contact').value = orderer.phone;
  $('#address').textContent = `${orderer.address.address1} \u00a0\ ${orderer.address.address2}`;
  $('#requirement').value = requirement;
  $('#postcode').value = orderer.address.postalCode;
  $('#address1').value = orderer.address.address1;
  $('#detail-address').value = orderer.address.address2;

  //상품리스트
  const $productListSection = $('#product-list');
  for (let i = 0; i < prodcutList.length; i += 1) {
    const productItem = prodcutList[i];
    const { name, capacity, price, img, productId, quantity } = productItem;
    const productPaymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const $liElement = $create('li', '');

    const $orderProductList = $create('div', 'products-list');
    $liElement.append($orderProductList);

    const $imgLink = $create('a', 'img-link', { href: `/products/${productId}` });
    const $productInfo = $create('div', 'product-info');
    const $reviewBtn = $create('button', 'review-btn');
    $reviewBtn.textContent = '리뷰쓰기';

    $reviewBtn.addEventListener('click', () => {
      window.location.href = `/products/${productId}/#tab3`;
    });

    $append($orderProductList, $imgLink, $productInfo, $reviewBtn);

    const $productImg = $create('img', 'product-image', { src: `${img}` });

    const $productName = $create('div', 'product-name');
    $productName.textContent = name;
    const $productCapa = $create('div', 'product-capa');
    $productCapa.textContent = `${capacity} ml`;
    const $productPrcie = $create('div', 'product-price');
    $productPrcie.textContent = `${productPaymentUnit} 원 | ${quantity}개`;

    $imgLink.append($productImg);

    $append($productInfo, $productName, $productCapa, $productPrcie);

    $append($productListSection, $liElement);

    if (orderStatus !== '배송완료') {
      $reviewBtn.classList.add('review-btn-hidden');
    }

    //배송비 계산
    if (price < 102500) {
      $('#payment-type').textContent = `상품금액 ${paymentUmint1} 원 + 배송비 2,500 원`;
    }
  }

  const orderArray = ['배송중', '배송완료'];
  if (orderArray.includes(orderStatus)) {
    $('.order-cancel-btn').classList.add('btn-hidden');
    $('.modify-btn').classList.add('btn-hidden');
  }

  //주문취소 모달 헤더 세팅
  let productName = prodcutList[0].name;
  if (prodcutList.length > 1) {
    productName += ` 외 ${prodcutList.length - 1} 건`;
  }
  $('.modal-box1 p').textContent = `[ ${productName} ]`;
}

//주문취소 모달
const openOrderDel = () => {
  document.querySelector('.modal-order-cancel').classList.remove('hidden');
};

const closeOrderDel = () => {
  document.querySelector('.modal-order-cancel').classList.add('hidden');
};

$('.order-cancel-btn').addEventListener('click', openOrderDel);
$('.close-btn-cancel').addEventListener('click', closeOrderDel);
$('.background').addEventListener('click', closeOrderDel);

//주문취소
const deletOrder = async () => {
  const response = await fetch(`/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 404) {
    alert('주문취소가 완료되었습니다.');
    window.location.href = '/user/myPage/';
  } else {
    const data = await response.json();
    alert(data.error);
  }
  return null;
};

$('.confirm-btn-cancel').addEventListener('click', deletOrder);

displayProductList();

//배송지정보
const infoDivs = document.querySelectorAll('.info');
const updateDivs = document.querySelectorAll('.update');

//배송지정보 - info모드(디스플레이모드)
const infoMode = () => {
  infoDivs.forEach((e) => {
    e.style.display = 'block';
    $('#receiver').disabled = true;
    $('#contact').disabled = true;
    $('#requirement').disabled = true;
  });
  updateDivs.forEach((e) => {
    e.style.display = 'none';
  });
};

//배송지정보 - 수정모드
const modifyMode = () => {
  infoDivs.forEach((e) => {
    e.style.display = 'none';
  });
  updateDivs.forEach((e) => {
    e.style.display = 'block';
    $('#receiver').disabled = false;
    $('#contact').disabled = false;
    $('#requirement').disabled = false;
  });
};

//배송지정보 수정
async function modifyInfo() {
  const response = await fetch(`/api/orders/user/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderer: {
        name: $('#receiver').value,
        phone: $('#contact').value,
        address: {
          postalCode: $('#postcode').value,
          address1: $('#address1').value,
          address2: $('#detail-address').value,
        },
      },
      requirement: $('#requirement').value,
    }),
  });
  if (response.ok) {
    alert('배송지정보가 변경되었습니다.');
    infoMode();
  } else {
    alert('배송지정보 수정에 실패하였습니다.');
  }
}

$('.address-modify-btn').addEventListener('click', modifyMode);
$('.modify-cancel-btn').addEventListener('click', () => {
  infoMode();
  $('#receiver').value = receiver;
  $('#contact').value = contact;
  $('#requirement').value = requirementMsg;
});
$('.modify-confirm-btn').addEventListener('click', modifyInfo);

infoMode();

//카카오 주소 api 사용하여 주소 정보 입력
document.querySelector('#address-button').addEventListener('click', () => {
  new daum.Postcode({
    oncomplete(data) {
      $('#postcode').value = data.zonecode;
      $('#address1').value = data.address;
      $('#detail-address').focus();
    },
  }).open();
});
