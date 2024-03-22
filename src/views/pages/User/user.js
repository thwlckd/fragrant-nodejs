import { $, $create, $append } from '/js/util/dom.js';

//유저의 회원정보 불어오기
async function getUserInfo() {
  const users = await fetch('/api/users/user/info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = users.json();
  if (!users.ok) {
    alert(result.error);
    return null;
  }
  return result;
}

async function setUserInfo() {
  const userInfo = await getUserInfo();
  const { email, userName } = userInfo;

  $('#user-name').textContent = `${userName} 님`;
  $('#user-email').textContent = email;
}

//로그아웃
async function userlogOut() {
  const logOut = await fetch('/api/auth/sign-out', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = logOut.json();

  if (logOut.ok) {
    alert('로그아웃 되었습니다.');
    location.href = '/login';
  } else {
    alert(data.error);
  }
}
$('.logout-btn').addEventListener('click', () => {
  userlogOut();
});

//유저의 주문내역 불러오기
async function getOrderList() {
  const orders = await fetch('/api/orders/user', {
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

async function displayOrderList() {
  const orderList = await getOrderList();

  const $orderListDiv = $('#order-history-list');
  const orderCnt = orderList.length;

  let orderComplete = 0;
  let shippingReady = 0;
  let onShipping = 0;
  let shippingComplete = 0;

  for (let i = orderCnt - 1; i >= 0; i -= 1) {
    const orderItem = orderList[i];
    const { orderTime, products, _id, price, orderStatus } = orderItem;

    const paymentUnit = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let productName = products[0].name;
    if (products.length > 1) {
      productName += ` 외 ${products.length - 1} 건`;
    }
    switch (orderStatus) {
      case '주문완료':
        orderComplete += 1;
        break;
      case '상품준비중':
        shippingReady += 1;
        break;
      case '배송중':
        onShipping += 1;
        break;
      case '배송완료':
        shippingComplete += 1;
        break;
      default:
        break;
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

    $append($orderStatus, $orderStatusText);

    $append($orderHistoryColumn, $orderHistoryColumn1, $orderHistoryColumn2, $orderHistoryColumn3);

    $orderListDiv.append($liElement);

    $orderList1.onclick = () => {
      location.href = `../orders/${_id}`;
    };

    $('#order-complete').textContent = orderComplete;
    $('#shipping-ready').textContent = shippingReady;
    $('#on-shipping').textContent = onShipping;
    $('#shipping-complete').textContent = shippingComplete;
  }

  if (orderCnt === 0) {
    $orderListDiv.classList.add('empty-message');
    $orderListDiv.textContent = '주문 내역이 없습니다.';
  }

  if (orderCnt > 4) {
    $('.order-history').classList.add('border-line');
  } else {
    $('.order-history').classList.remove('border-line');
  }
}

setUserInfo();
displayOrderList();
