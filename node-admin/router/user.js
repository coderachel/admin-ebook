const express = require('express')
const Result = require('../models/Result')
const { login, findUser } = require('../services/user')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { md5, decode } = require('../utils')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post(
    '/login',
    [
        body('username').isString().withMessage('用户名必须是字符串'),
        body('password').isString().withMessage('密码必须是字符串')
    ],
    function(req, res) {
        const err = validationResult(req)
        if(!err.isEmpty()) {
            const [{msg}] = err.errors
            next(boom.badRequest(msg))
        } else {
            let { password, username } = req.body
            password = md5(`${password}${PWD_SALT}`)
            login(username, password).then(user => {
                if(!user || user.length === 0) {
                    new Result('登录失败').fail(res)
                } else {
                    const token = jwt.sign(
                        { username },
                        PRIVATE_KEY,
                        { expiresIn: JWT_EXPIRED }
                    )
                    new Result({ token }, '登录成功').success(res)
                }
            }).catch(err => {

            })
        }
        
    })

router.get('/info', function(req, res) {
    const decoded = decode(req)
    console.log('decoded',decoded)
    if(decoded && decoded.username) {
        findUser(decoded.username).then(user => {
            if(user) {
                user.roles = [user.role]
                new Result(user, '用户信息查询成功').success(res)
            } else {
                new Result(null, '用户信息查询失败').fail(res)
            }
        })
    }
})

module.exports = router 