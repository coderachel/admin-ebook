const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ? 'D:/admin-upload-book' : ''

module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    CODE_TOKEN_EXPIRED: -2,
    debug: true,
    PWD_SALT: 'admin_imooc_ndoe', //密码和密钥进行加密
    PRIVATE_KEY: 'admin_imooc_node_test_youbaobao_xyz',
    JWT_EXPIRED: 60 * 60,
    UPLOAD_PATH
}