// multerConfig.js
const multer = require('multer');

module.exports = multer({ dest: 'uploads/' }); // 确保uploads文件夹存在