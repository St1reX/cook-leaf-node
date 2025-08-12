export default function handleErrors(err, req, res, next) {
  console.log(err);

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    type: err.type,
    details: err.details,
  });
}
