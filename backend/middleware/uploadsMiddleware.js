const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: "dhcfzl9wv",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_avatars",
    format: async (req, file) => {
      switch (file.mimetype) {
        case "image/jpeg":
          return "jpg";
        case "image/png":
          return "png";
        default:
          return "jpg";
      }
    },
    public_id: (req, file) => uuidv4(),
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
