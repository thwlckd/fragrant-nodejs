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

module.exports = {
  checkObjectValues,
  filterResponse,
};
