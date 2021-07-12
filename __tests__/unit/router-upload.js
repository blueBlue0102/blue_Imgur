"use strict";

describe("Upload file:", () => {
  describe("the mimetype of file should be an image", () => {
    const mimetypeFilter = require("../../routers/lib/upload.lib").mimetypeFilter;
    test("given an audio file", async () => {
      const dummydata = {
        name: "filename",
        originalFilename: "originalFilename",
        mimetype: "audio/mp4",
      };
      expect(mimetypeFilter(dummydata)).toBeFalsy();
    });
    test("given an image file", async () => {
      // Image mimetype list:
      // https://www.iana.org/assignments/media-types/media-types.xhtml#image
      const dummydata = {
        name: "filename",
        originalFilename: "originalFilename",
        mimetype: "image/jpeg",
      };
      expect(mimetypeFilter(dummydata)).toBeTruthy();
    });
  });
});
