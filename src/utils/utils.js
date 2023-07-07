function checkObjectValues(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined || value !== "") {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function filterResponse(toResponse) {
  if (Array.isArray(toResponse)) {
    const filteredList = toResponse.map((user) => {
      const { email, userName, address, phone } = user;
      return { email, userName, address, phone };
    });
    return filteredList;
  } else {
    const { email, userName, address, phone } = toResponse;
    return { email, userName, address, phone };
  }
}

module.exports = {
  checkObjectValues,
  filterResponse,
};
