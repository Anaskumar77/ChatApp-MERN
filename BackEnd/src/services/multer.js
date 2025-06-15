import multer from "multer";
import path from "path";
import fs from "fs";
const uploadPath = path.resolve("uploads");

// Ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const upload = multer({ storage });

export default upload;
