const streamUpload = require("../../helpers/uploadCloudDinary");

const uploadMiddleware = (fieldName) => {
  return async (req, res, next) => {
    if (req.files && req.files[fieldName]) {
      // console.log("File uploaded:", req.files[fieldName]);
      try {
        const fileBuffer = req.files[fieldName].data;
        const result = await streamUpload(fileBuffer); // Upload file lên Cloudinary
        // console.log("Cloudinary Upload Result:", result); // Log kết quả upload từ Cloudinary
        req.uploadedFileUrl = result; // Lưu URL của file upload vào request
        next(); // Tiếp tục xử lý
      } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Lỗi khi upload file" });
      }
    } else {
      console.log("No file found in request.");
      next(); // Nếu không có file, tiếp tục xử lý
    }
  };
};

module.exports = uploadMiddleware;
