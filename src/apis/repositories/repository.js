
module.exports = {
    ...require("./user.repository"),
    ...require('./address.repository'),
    ...require('./product.repository'),
    ...require('./order.repository')
}