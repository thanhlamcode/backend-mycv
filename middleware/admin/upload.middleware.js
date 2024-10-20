const streamUpload = require("../../helpers/uploadCloudDinary");

// Middleware xử lý upload ảnh
const uploadMiddleware = (fieldName) => {
  return async (req, res, next) => {
    if (req.files && req.files[fieldName]) {
      // Kiểm tra nếu có file với tên fieldName
      try {
        const fileBuffer = req.files[fieldName].data;
        const result = await streamUpload(fileBuffer); // Upload file lên Cloudinary
        req.uploadedFileUrl = result.secure_url; // Lưu URL của file upload vào request
        next(); // Tiếp tục xử lý
      } catch (error) {
        return res.status(500).json({ error: "Lỗi khi upload file" });
      }
    } else {
      next(); // Nếu không có file, tiếp tục xử lý
    }
  };
};

module.exports = uploadMiddleware;
