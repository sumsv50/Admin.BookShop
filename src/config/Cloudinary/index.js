const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
  });

  module.exports.uploadToCloudinary = (image) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, {folder:'books'},(err, result) => {
        if (err) return reject(err);
        return resolve(result);
      })
    });
  }