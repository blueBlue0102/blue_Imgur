const config = {};

config.port = process.env.PORT || 8080;
config.imgPath = '/img';    //儲存圖片的地方，與根目錄的相對路徑
config.maxSizeOfData = 50 * 1024 * 1024;  // 50 MB
config.mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    mp4: 'image',
    mov: 'image'
};
config.uploadHTML = 'upload.html'

module.exports = config;