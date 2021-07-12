function generateRandomString(name, ext, part, form) {
  let result = [];
  
  // generate string by Math.random()
  const length = 3;
  const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
      );
  }
    
    // generate string by Date().getTime()
    let ts = String(new Date().getTime());
    
    for (let i = 1; i < ts.length; i += 3) {
      result.push(Number(ts.substr(i, 3)).toString(36));
    }
    
    return result.join("") + ext;
  }
exports.generateRandomString = generateRandomString;
  
function mimetypeFilter({ name, originalFilename, mimetype }) {
  return mimetype && mimetype.includes("image");
}
exports.mimetypeFilter = mimetypeFilter;