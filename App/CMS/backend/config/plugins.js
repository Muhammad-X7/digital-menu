"use strict";

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
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
      // Rewrite stored URLs to the public R2 domain so Next.js
      // image optimization can fetch them without auth.
      baseUrl: env("AWS_BASE_URL"),
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
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