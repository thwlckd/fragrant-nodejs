const multer = require('multer');
const path = require('path');
const fs = require('fs');

const extensionFilter = (req, file, cb) => {
  const allowExtensions = ['png', 'jpg', 'jpeg'];
  const { mimetype } = file;
  const extension = mimetype.split('/')[1];

  if (allowExtensions.includes(extension)) {
    cb(null, true);
  } else {
    req.fileExtensionError = 'png, jpg, jpeg 파일만 업로드 가능합니다.';
    cb(null, false);
  }
};

const mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { baseUrl } = req;
      let dest = path.join('src', 'views', 'public', 'asset');

      switch (baseUrl) {
        case '/api/brands':
          dest += `/brands`;
          break;
        case '/api/products':
          dest += `/products`;
          break;
        case '/api/reviews':
          dest += `/reviews`;
          break;
        default:
          break;
      }

      dest = path.resolve(dest);
      mkdir(dest);

      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const { originalname } = file;
      const extension = path.extname(originalname);

      const fileName = path.basename(originalname, extension) + extension;
      cb(null, fileName);
    },
  }),
  extensionFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
