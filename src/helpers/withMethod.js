const tryCatchCRUD = require('./tryCatchCRUD');

const withMethod = (method) => async (req, res, next) => {
  await tryCatchCRUD(res, async () => {
    await method(req, res, next)
  })
}

module.exports = withMethod
