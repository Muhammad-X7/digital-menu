'use strict';

const fs = require('fs');

const originalUnlink = fs.unlink.bind(fs);
fs.unlink = (filePath, callback) => {
  if (typeof filePath === 'string' && filePath.includes('strapi-upload')) {
    let attempts = 10;
    const retry = () => {
      originalUnlink(filePath, (err) => {
        if (!err) return callback(null);
        if (err.code === 'EBUSY' && attempts > 1) {
          attempts--;
          setTimeout(retry, 200);
        } else {
          callback(null); // silent — S3 upload already succeeded
        }
      });
    };
    retry();
  } else {
    originalUnlink(filePath, callback);
  }
};

const originalUnlinkAsync = fs.promises.unlink.bind(fs.promises);
fs.promises.unlink = async (filePath) => {
  if (typeof filePath === 'string' && filePath.includes('strapi-upload')) {
    let attempts = 10;
    while (attempts > 0) {
      try {
        return await originalUnlinkAsync(filePath);
      } catch (err) {
        if (err.code === 'EBUSY' && attempts > 1) {
          attempts--;
          await new Promise((res) => setTimeout(res, 200));
        } else {
          return; // silent
        }
      }
    }
  } else {
    return originalUnlinkAsync(filePath);
  }
};