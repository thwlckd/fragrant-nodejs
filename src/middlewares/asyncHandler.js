const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res);
  } catch (err) {
    next(err);
  }
};

module.exports = asyncHandler;
