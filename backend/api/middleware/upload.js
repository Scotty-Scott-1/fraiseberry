import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const random = crypto.randomBytes(6).toString("hex");
    const uniqueName = `${file.fieldname}-${Date.now()}-${random}${ext}`;
    cb(null, uniqueName);
  },
});

// Allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Export middleware with explicit fields
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
});

// Fields config for Express route
export const uploadProfileFields = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "supportingPic1", maxCount: 1 },
  { name: "supportingPic2", maxCount: 1 },
  { name: "supportingPic3", maxCount: 1 },
]);
