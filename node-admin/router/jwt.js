const jwtExpress = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

const jwtAuth = jwtExpress({
    secret: PRIVATE_KEY,
    credentialsRequired: true, // 开启验证
    algorithms: ['HS256']
}).unless({
    path: [
        '/',
        '/user/login'
    ]
})

module.exports = jwtAuth