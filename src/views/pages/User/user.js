import { $, $create, $append } from '/js/util/dom.js';

async function getOrderList() {
  const orders = await fetch('/orders/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODg4MjY2OTJ9.h30XrRfX7cAuwfvGgyxB5e6DTB-WLaCeQVbhH_NaXwQ',
    },
  });
  let result;
  if (orders.ok) {
    result = await orders.json();
  }
  return result;
}

async function displayOrderList() {
  const orderList = await getOrderList();

  console.log(orderList);

  const $orderListDiv = $('#order-history-list');

  for (let i = orderList.length - 1; i >= 0; i -= 1) {
    const orderItem = orderList[i];
    const { orderTime, products, _id, price, orderStatus } = orderItem;

    const paymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let productName = products[0].name;
    if (products.length > 1) {
      productName += ` 외 ${products.length - 1} 건`;
    }

    const $liElement = $create('li', '');

    const $orderList = $create('div', 'order-list');
    $liElement.append($orderList);

    const $orderHistoryHeader = $create('div', 'order-history-header');
    const $orderList1 = $create('div', 'order-list-1');

    $append($orderList, $orderHistoryHeader, $orderList1);

    const $orderDate = $create('p', 'order-date');
    $orderDate.textContent = `${orderTime}`;
    const $orderDetailBtn = $create('a', 'view-order-detail', { href: `../orders/${_id}` });
    $orderDetailBtn.textContent = '주문내역 상세보기>';

    $append($orderHistoryHeader, $orderDate, $orderDetailBtn);

    const $orderHistoryInfo = $create('div', 'order-history-info');
    $append($orderList1, $orderHistoryInfo);

    const $productImg = $create('img', 'product-image', { src: `${products[0].img}` });
    const $orderHistoryColumn = $create('div', 'order-histroy-column');
    const $orderStatus = $create('div', 'order-status');

    $append($orderHistoryInfo, $productImg, $orderHistoryColumn, $orderStatus);

    const $orderHistoryColumn1 = $create('div', 'order-history-column-value');
    $orderHistoryColumn1.textContent = `상품명 \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 ${productName}`;
    const $orderHistoryColumn2 = $create('div', 'order-history-column-value');
    $orderHistoryColumn2.textContent = `주문번호 \u00a0\u00a0 ${_id}`;
    const $orderHistoryColumn3 = $create('div', 'order-history-column-value');
    $orderHistoryColumn3.textContent = `결제금액 \u00a0\u00a0 ${paymentUnit} 원`;

    const $orderStatusText = $create('p', 'order-status-text');
    $orderStatusText.textContent = `${orderStatus}`;
    const $orderCancelBtn = $create('button', 'order-cancel-btn');
    $orderCancelBtn.textContent = '주문취소';

    $append($orderStatus, $orderStatusText, $orderCancelBtn);

    $append($orderHistoryColumn, $orderHistoryColumn1, $orderHistoryColumn2, $orderHistoryColumn3);

    $orderListDiv.append($liElement);

    if (orderStatus === '배송중' || orderStatus === '') {
      $orderCancelBtn.classList.add('order-cancel-hidden');
    }
  }
}

displayOrderList();
