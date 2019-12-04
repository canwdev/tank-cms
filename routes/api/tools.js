var router = require('express').Router();
const tools = require('../../components/tool')
const oss = require('../../components/tool/oss')
const COMMON = require('../../utils/common')
const authLogin = require('../../components/user/authLoginMiddleware')

const multer = require('multer') // 图片上传模块
var upload = multer({
  dest: COMMON.UPLOAD_PATH + '/'
})// 定义图片上传的临时目录
router.post('/upload', authLogin, upload.single('fileToUpload'), tools.uploadFile);
router.get('/oss-policy', oss.getOssPolicy)
router.get('/listUploaded', authLogin, tools.listUploadedFile);
router.post('/deleteUploaded', authLogin, tools.deleteUploadedFile);
router.get('/encryptText', authLogin, tools.encryptText);

router.get('/getSettings', authLogin, tools.getSettings);
router.post('/setSettings', authLogin, tools.setSettings);
router.post('/saveHitokoto', tools.saveHitokoto);
router.get('/queryHitokoto', tools.queryHitokoto);
router.get('/temp', tools.temp);

module.exports = router;
