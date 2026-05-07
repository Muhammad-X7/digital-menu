'use strict';

const fs = require("fs");

// ── Windows EBUSY patch ────────────────────────────────────────────────────
// Strapi's upload plugin deletes temp files after S3 upload.
// On Windows the file handle is still open briefly, causing EBUSY errors.
// We patch fs.unlink to retry automatically before giving up.

const originalUnlink = fs.unlink.bind(fs);

fs.unlink = (filePath, callback) => {
  if (typeof filePath === "string" && filePath.includes("strapi-upload")) {
    let attempts = 8;
    const retry = () => {
      originalUnlink(filePath, (err) => {
        if (!err) return callback(null);
        if (err.code === "EBUSY" && attempts > 1) {
          attempts--;
          setTimeout(retry, 150);
        } else {
          callback(null); // silent — upload already succeeded
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
  if (typeof filePath === "string" && filePath.includes("strapi-upload")) {
    let attempts = 8;
    while (attempts > 0) {
      try {
        return await originalUnlinkAsync(filePath);
      } catch (err) {
        if (err.code === "EBUSY" && attempts > 1) {
          attempts--;
          await new Promise((res) => setTimeout(res, 150));
        } else {
          return; // silent — upload already succeeded
        }
      }
    }
  } else {
    return originalUnlinkAsync(filePath);
  }
};

// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  register(/*{ strapi }*/) {},
  bootstrap(/*{ strapi }*/) {},
};