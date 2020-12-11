const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'hpit', 
    api_key: '172531165774159', 
    api_secret: '6f1mirZThJyqi8QqwRQpk-1TFpg', 
  });

  module.exports.uploadToCloudinary = (image) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, {folder:'books'},(err, result) => {
        if (err) return reject(err);
        return resolve(result);
      })
    });
  }