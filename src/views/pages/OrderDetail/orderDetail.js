import { $, $create, $append } from '/js/util/dom.js';

async function getProductList() {
  const orders = await fetch('/orders/64a9d6ee08c6c74306d2c606', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let result;
  if (orders.ok) {
    result = await orders.json();
  }
  return result;
}

async function displayProductList() {
  const orderList = await getProductList();
  const prodcutList = await orderList.products;

  console.log(orderList);
  console.log(prodcutList);

  const { orderTime, _id, orderStatus, price, orderer, requirement } = orderList;
  const paymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  $('#order-date').textContent = `주문일자:\u00a0\ ${orderTime}`;
  $('#order-id').textContent = `주문번호:\u00a0\ ${_id}`;
  $('#order-status-text').textContent = orderStatus;

  $('#payment-amount').textContent = `총 결제금액\u00a0\ | \u00a0\ ${paymentUnit} 원`;
  $('#payment-type').textContent = `상품금액 ${paymentUnit} 원 + 배송비 0 원`;

  $('#name').textContent = orderer.name;
  $('#contact').textContent = orderer.phone;
  $('#address').textContent = `${orderer.address.address1} \u00a0\ ${orderer.address.address2}`;
  $('#requirement').textContent = requirement;

  const $productListSection = $('#product-list');

  for (let i = 0; i < prodcutList.length; i += 1) {
    const productItem = prodcutList[i];
    const { name, capacity, price, img, productId } = productItem;
    const productPaymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const $liElement = $create('li', '');

    const $orderProductList = $create('div', 'products-list');
    $liElement.append($orderProductList);

    const $imgLink = $create('a', 'img-link', { href: `/products/${productId}` });
    const $productInfo = $create('div', 'product-info');
    const $reviewBtn = $create('button', 'review-btn');
    $reviewBtn.textContent = '리뷰쓰기';

    $append($orderProductList, $imgLink, $productInfo, $reviewBtn);

    const $productImg = $create('img', 'product-image');

    const $productName = $create('div', 'product-name');
    $productName.textContent = name;
    const $productCapa = $create('div', 'product-capa');
    $productCapa.textContent = `${capacity} ml`;
    const $productPrcie = $create('div', 'product-price');
    $productPrcie.textContent = `${productPaymentUnit} 원 | 1개`;

    $imgLink.append($productImg);

    $append($productInfo, $productName, $productCapa, $productPrcie);

    $append($productListSection, $liElement);

    if (orderStatus === '배송중' || orderStatus === '배송완료') {
      $('.order-cancel-btn').classList.add('order-cancel-hidden');
    }
  }
}
displayProductList();

//주문취소 모달
const open = () => {
  document.querySelector('.modal').classList.remove('hidden');
};

const close = () => {
  document.querySelector('.modal').classList.add('hidden');
};

document.querySelector('.order-cancel-btn').addEventListener('click', open);
document.querySelector('.close-btn').addEventListener('click', close);
document.querySelector('.background').addEventListener('click', close);
