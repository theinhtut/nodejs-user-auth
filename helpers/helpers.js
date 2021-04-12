exports.jsonErrHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err)
    return res.status(400).send({ status: 400, msg: 'Bad request' }) // Bad request
  }
  next()
}
