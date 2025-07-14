export default function handleErrors(err, req, res, next) {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    type: err.type,
    details: err.details,
  });
}
