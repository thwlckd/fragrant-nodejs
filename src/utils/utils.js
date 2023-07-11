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

function checkObjectValues(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined || value !== '') {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function filterResponse(toResponse) {
  if (Array.isArray(toResponse)) {
    const filteredList = toResponse.map((user) => {
      const { _id, email, userName, address, phone } = user;
      return {
        _id,
        email,
        userName,
        address,
        phone,
      };
    });
    return filteredList;
  }
  const { _id, email, userName, address, phone } = toResponse;
  return {
    _id,
    email,
    userName,
    address,
    phone,
  };
}

function filterformatOrder(order) {
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
  if (Array.isArray(toResponse)) {
    const filteredList = toResponse.map((order) => filterformatOrder(order));
    return filteredList;
  }
  return filterformatOrder(toResponse);
}

function timeFormat(orders) {
  const dateList = String(orders.createdAt.toLocaleString()).split('. ');
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
  if (Array.isArray(orders)) {
    const timeFormattedorders = orders.map((order) => timeFormat(order));
    return timeFormattedorders;
  }
  return timeFormat(orders);
}

module.exports = {
  addProductsQuantity,
  subtractProductsQuantity,
  checkObjectValues,
  filterResponse,
  filterResponseOrder,
  formatDate,
};
