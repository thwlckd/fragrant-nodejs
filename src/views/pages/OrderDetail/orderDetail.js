import { $, $create, $append } from '/js/util/dom.js';

$('.info').style.display = 'block';
$('.update').style.display = 'none';

const url = window.location.pathname.split('/');
const id = url[url.length - 2];

// console.log(url);
// console.log(id);

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

async function displayProductList() {
  const orderList = await getOrders();
  const prodcutList = orderList.products;

  console.log(orderList);
  console.log(prodcutList);

  const { orderTime, _id, orderStatus, price, orderer, requirement } = orderList;
  const paymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const paymentUmint1 = (price - 2500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  //  const orderStausArr = ['주문완료', '상품준비중', '배송중', '배송완료'];
  //   const orderStatusClass = ['order-status-current', 'status-prepare-product'];
  $('.order-status-current').style.backgroundColor = 'black';
  //배송상태 포커싱!!!
  // const statusBg = $('.order-status-current');
  // const statusImg = $('.order-status-current img');
  // const statusTesxts = $('.order-status-current p');
  // if (orderStatus === '주문완료') {
  //   statusBg.classList.add('order-status-focus');

  $('#order-date').textContent = `주문일자:\u00a0\ ${orderTime}`;
  $('#order-id').textContent = `주문번호:\u00a0\ ${_id}`;
  $('#order-status-text').textContent = orderStatus;

  $('#payment-amount').textContent = `총 결제금액\u00a0\ | \u00a0\ ${paymentUnit} 원`;
  $('#payment-type').textContent = `상품금액 ${paymentUnit} 원 + 배송비 0 원`;

  $('#shippingName').value = orderer.name;
  $('#contact').textContent = orderer.phone;
  $('#address').textContent = `${orderer.address.address1} \u00a0\ ${orderer.address.address2}`;
  $('#requirement').textContent = requirement;

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

    const orderArray = ['배송중', '배송완료'];
    if (orderArray.includes(orderStatus)) {
      $('.order-cancel-btn').classList.add('order-cancel-hidden');
    }

    if (price < 102500) {
      $('#payment-type').textContent = `상품금액 ${paymentUmint1} 원 + 배송비 2,500 원`;
    }
  }

  let productName = prodcutList[0].name;
  console.log(productName);
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

const deletOrder = async () => {
  const response = await fetch(`/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    alert('주문취소가 완료되었습니다.');
    window.location.href = '/user/myPage/';
  } else {
    return alert(data.error);
  }
  return null;
};
$('.confirm-btn-cancel').addEventListener('click', deletOrder);

displayProductList();

//배송지 수정
const open1 = () => {
  $('.info').style.display = 'none';
  $('.update').style.display = 'block';
  // document.querySelector('.modal-modify').classList.remove('hidden');
};

const close1 = () => {
  document.querySelector('.modal-modify').classList.add('hidden');
};

//카카오 주소 api 사용하여 주소 정보 입력
document.querySelector('#address-button').addEventListener('click', () => {
  new daum.Postcode({
    oncomplete(data) {
      // console.log(data);
      $('#postcode').value = data.zonecode;
      $('#address').value = data.address;
      $('#detail-address').focus();
    },
  }).open();
});
