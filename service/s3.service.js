const s3 = require('aws-sdk/clients/s3');

const {S3_BUCKET_NAME, S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY} = require('../config/env.config');
const {buildFileName} = require('../helper/s3.helper')

const s3Bucket = new s3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
});

async function uploadPublicFile(fileToUpload, itemType, itemId) {
    return s3Bucket.upload({
        ContentType: fileToUpload.mimetype,
        ACL: 'public-read',
        Body: fileToUpload.data,
        Bucket: S3_BUCKET_NAME,
        Key: buildFileName(fileToUpload.name, itemType, itemId)
    }).promise()
}

module.exports = {
    uploadPublicFile
}