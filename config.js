const config = {};

config.port = 8080;
config.imgPath = '/img';    //儲存圖片的地方，與根目錄的相對路徑
config.maxSizeOfData = 20 * 1024 * 1024;  // 20 MB

module.exports = config;