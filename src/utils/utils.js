const { productService } = require('../services');

async function addProductsQuantity(products) {
  await Promise.all(
    products.map(async (product) =>
      productService.updateQuantity(product.productId, { quantity: product.quantity }),
    ),
  );
}

async function subtractProductsQuantity(products) {
  await Promise.all(
    products.map(async (product) =>
      productService.updateQuantity(product.productId, { quantity: -product.quantity }),
    ),
  );
}

function filterFormatUser(user) {
  const { _id, email, userName, address, phone } = user;
  return {
    _id,
    email,
    userName,
    address,
    phone,
  };
}

function filterResponseUser(toResponse) {
  if (!toResponse) return null;
  if (Array.isArray(toResponse)) {
    const filteredList = toResponse.map((user) => filterFormatUser(user));
    return filteredList;
  }
  return filterFormatUser(toResponse);
}

function filterFormatOrder(order) {
  const { _id, products, orderer, price, orderStatus, requirement, orderTime } = order;
  return {
    _id,
    products,
    orderer,
    price,
    orderStatus,
    requirement,
    orderTime,
  };
}

function filterResponseOrder(toResponse) {
  if (!toResponse) return null;
  if (Array.isArray(toResponse)) {
    const filteredList = toResponse.map((order) => filterFormatOrder(order));
    return filteredList;
  }
  return filterFormatOrder(toResponse);
}

function timeFormat(orders) {
  const dateList = String(orders.createdAt.toLocaleString('ko-KR')).split('. ');
  if (dateList[1].length === 1) dateList[1] = `0${dateList[1]}`;
  if (dateList[2].length === 1) dateList[2] = `0${dateList[2]}`;
  const formattedTime = dateList[3].split(' ')[1].split(':', 2);
  const dayOrNight = dateList[3].split(' ')[0];
  if (dayOrNight === '오후') formattedTime[0] = `${Number(formattedTime[0]) + 12}`;
  if (formattedTime[0].length === 1) formattedTime[0] = `0${formattedTime[0]}`;
  orders.orderTime = `${dateList.slice(0, 3).join('.')} ${formattedTime.join(':')}`;
  return orders;
}

function formatDate(orders) {
  if (!orders) return null;
  if (Array.isArray(orders)) {
    const timeFormattedorders = orders.map((order) => timeFormat(order));
    return timeFormattedorders;
  }
  return timeFormat(orders);
}

module.exports = {
  addProductsQuantity,
  subtractProductsQuantity,
  filterResponseUser,
  filterResponseOrder,
  formatDate,
};
