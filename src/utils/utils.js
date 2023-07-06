function checkObjectValues(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined || value !== "") {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

module.exports = {
  checkObjectValues,
};
