import { $, $create } from '/js/util/dom.js';

const render = async () => {
  const res = await fetch('/api/orders');
  const datas = await res.json();
  const $orderArry = datas.map((data) => {
    const $item = $create('div', '');
    const $orderDate = $create('div', 'order-date');
    const $orderComponent = $create('div', 'order-component');
    const $orderaimg = $create('a', '', { href: `/admin/orders/${data._id}` });
    const $orderimg = $create('img', '', { src: data.products[0].img });
    const $content = $create('div', 'product-content');
    const $product = $create('div', 'productId');
    const $productName = $create('div', 'product-name');
    const $orderName = $create('div', 'orderer');
    const $productNum = $create('div', 'product-num');
    let total = 0;
    data.products.forEach((product) => {
      total += product.quantity;
    });
    const $totalPrice = $create('div', 'total-price');

    $item.append($orderDate, $orderComponent);
    $orderComponent.append($orderaimg, $content, $totalPrice);
    $orderaimg.append($orderimg);
    $content.append($product, $productName, $orderName, $productNum);

    $orderDate.textContent = data.orderTime;
    $product.textContent = `주문ID : ${data._id}`;
    $productName.textContent = `상품명 : ${data.products[0].name}`;
    $orderName.textContent = `주문자 : ${data.orderer.name}`;
    $productNum.textContent = `갯수 : ${total}`;
    $totalPrice.textContent = `총 가격 : ${data.price}`;

    return $item;
  });
    const $orderlist = $('.order-list')
    $orderlist.append(...$orderArry)
};

render();
