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

function formatDate(orders) {
  if (Array.isArray(orders)) {
    const ordersToResponse = orders.map((order) => {
      const dateList = String(order.createdAt.toLocaleString()).split('. ');
      if (dateList[1].length === 1) dateList[1] = `0${dateList[1]}`;
      if (dateList[2].length === 1) dateList[2] = `0${dateList[2]}`;
      const formattedTime = dateList[3].split(' ')[1].split(':', 2);
      if (formattedTime[0].length === 1) formattedTime[0] = `0${formattedTime[0]}`;
      order.orderTime = `${dateList.slice(0, 3).join('.')} ${formattedTime.join(':')}`;
      return order;
    });
    return ordersToResponse;
  }
  const dateList = String(orders.createdAt.toLocaleString()).split('. ');
  if (dateList[1].length === 1) dateList[1] = `0${dateList[1]}`;
  if (dateList[2].length === 1) dateList[2] = `0${dateList[2]}`;
  const formattedTime = dateList[3].split(' ')[1].split(':', 2);
  if (formattedTime[0].length === 1) formattedTime[0] = `0${formattedTime[0]}`;
  orders.orderTime = `${dateList.slice(0, 3).join('.')} ${formattedTime.join(':')}`;
  return orders;
}

module.exports = {
  checkObjectValues,
  filterResponse,
  formatDate,
};
