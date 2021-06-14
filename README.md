# Personal Image Hosting Service

Upload the picture to host on server, and then get the image URL.

## Demo
https://blueimgur.com/

---

## Installation

```
$ git clone https://github.com/blueBlue0102/blue_imgur.git
$ yarn install
$ npx webpack
```

## Features

- Upload image via:
  - Click Upload Button
  - Drag and Drop the File
  - Paste From Clipboard
- Click image preview to copy the URL of file
- Account System:
  - Login via Google OAuth2
  - Guest can upload only 3 files
  - (not yet) Manage the uploaded image

## Known Issue

- Can not delete the uploaded image

  If you are a guest, you can not upload any image after upload over 3 images