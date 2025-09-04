import multer from "multer";
import path from "node:path";
import fs from "fs";

const destDirectory = path.join(__dirname, "../uploads");

// Ensure upload directory exists
const ensureUploadsDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      ensureUploadsDir(destDirectory);
      cb(null, destDirectory);
    },
    filename: (_req: any, file: any, cb: any) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("the file type is not supported"));
    }
  },
});

export const uploadSingle = (fieldName: string) =>
  multerUpload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number) =>
  multerUpload.array(fieldName, maxCount);
