// Wraps an async Express route handler so a rejected promise is forwarded
// to the error-handling middleware via next(err). Express 4 does not await
// handlers, so without this a thrown/rejected handler becomes an unhandled
// rejection and the request hangs with no response.
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports = { asyncHandler };
