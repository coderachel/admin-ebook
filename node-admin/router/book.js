const express = require('express')
const multer = require('multer')
const Result = require('../models/Result')
const { UPLOAD_PATH } = require('../utils/constant')

const router = express.Router()

router.post('/upload', 
    multer({ dest: `${UPLOAD_PATH}/book`}).single('file'), 
    function(req, res) {
        if(!req.file || req.file.length === 0) {
            new Result('上传电子书失败').fail(res)
        } else {
            console.log(UPLOAD_PATH)
            new Result('上传电子书成功').success(res)
        }
    }
)

module.exports = router