const errorHandler = (err, req, res) => {
  const statusCode = req.status ? req.status : 500;
  res.statusCode = statusCode;
  res.json = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };
};

module.exports = { errorHandler };
