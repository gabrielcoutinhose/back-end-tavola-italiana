import multer from "multer";
import { v4 } from "uuid";
import { extname, resolve } from "path";
import fs from "fs";

const uploadDir = resolve(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default {
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, callback) => {
      try {
        const uniqueName = v4() + extname(file.originalname);
        callback(null, uniqueName);
      } catch (error) {
        callback(error);
      }
    },
  }),
};
