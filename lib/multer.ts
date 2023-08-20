import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "/public/uploads");
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, new Date().toISOString() + "-" + file.originalNmae);
  },
});

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true);
  } else
    ({ error: "Unsupported file format. Upload only JPEG, JPG, WEBP or PNG" });
};

const upload = multer({
  storage,
  limits: { fieldSize: 1920 * 1920},
  fileFilter
});

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export default upload;