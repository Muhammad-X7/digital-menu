"use strict";

module.exports = ({ env }) => ({
  upload: {
    enabled: true,
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          endpoint: env("AWS_ENDPOINT"),
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET"),
          },
          s3ForcePathStyle: true,
        },
        baseUrl: env("AWS_BASE_URL"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      sizeLimit: 10 * 1024 * 1024, // 10MB
    },
    security: {
      strictSsrfCheck: true,
    },
  },

  i18n: {
    enabled: true,
    config: {
      defaultLocale: "ar",
      locales: ["ar", "en", "ckb"],
    },
  },
});