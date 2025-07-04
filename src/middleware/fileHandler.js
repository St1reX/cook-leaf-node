const multer = require("multer");
const path = require("path");


const createStorage = (folderName) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../uploads", folderName));
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
            req.body.photoName = uniqueName;
            cb(null, uniqueName);
        },
    })
}

const upload = (folderName) => multer({ storage: createStorage(folderName) });

module.exports = upload;