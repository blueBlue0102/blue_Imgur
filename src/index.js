import Dropzone from "dropzone";
// Optionally, import the dropzone file to get default styling.
import "dropzone/dist/dropzone.css";
import "./style.scss";

Dropzone.autoDiscover = false;

const myDropzone = new Dropzone("#form1", {
  dictDefaultMessage: `<svg class="box__icon" xmlns="http://www.w3.org/2000/svg" width="200" height="172" viewBox="0 0 50 43">
  <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
  <br><p><b>點此選擇</b> 或 <b>拖拉檔案 </b>進行上傳</p>`,
  maxFilesize: 5, // MB
  addRemoveLinks: true,
  acceptedFiles: "image/*",
});

myDropzone.on("success", function (file, responseText) {
  // delete previewTemplate data size and data name info
  file.previewTemplate
    .querySelector(".dz-details")
    .removeChild(file.previewTemplate.querySelector(".dz-details .dz-size"));

  file.previewTemplate
    .querySelector(".dz-details")
    .removeChild(
      file.previewTemplate.querySelector(".dz-details .dz-filename")
    );

  // add event listener to copy button
  file.previewTemplate.addEventListener("click", function (event) {
    event.preventDefault();
    navigator.clipboard.writeText(responseText.imagePath);
  });

  // let div element could be focus
  file.previewTemplate.setAttribute("tabindex", "-1");
});

window.addEventListener("paste", (event) => {
  if (!event.clipboardData) {
    return;
  }
  myDropzone.emit("drop", event);

  // Convert the FileList to an Array
  // This is necessary for IE11
  let files = [];
  for (let i = 0; i < event.clipboardData.files.length; i++) {
    files[i] = event.clipboardData.files[i];
  }

  // Even if it's a folder, files.length will contain the folders.
  if (files.length) {
    let { items } = event.clipboardData;
    if (items && items.length && items[0].webkitGetAsEntry != null) {
      // The browser supports dropping of folders, so handle items instead of files
      myDropzone._addFilesFromItems(items);
    } else {
      myDropzone.handleFiles(files);
    }
  }

  myDropzone.emit("addedfiles", files);
});
