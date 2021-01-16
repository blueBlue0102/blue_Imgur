const config = {};

config.port = process.env.PORT;
config.imgPath = '/img';    //儲存圖片的地方，與根目錄的相對路徑
config.maxSizeOfData = 5 * 1024 * 1024;  // 5 MB
config.mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
};
config.uploadHTML = 'newUpload.html'

module.exports = config;