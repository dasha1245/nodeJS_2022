const {IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require('../config/fileUpload.config')
const ApiError = require('../error/apiError')

module.exports = {
    checkUploadImage: async (req, res, next) => {
        try {
            if (!req.files) {
                throw new ApiError('No files to upload', 400)
            }

            const imagesForUpload = Object.values(req.files);

            for (let image of imagesForUpload) {
                const {size, mimetype, name} = image;

                if (size > IMAGE_MAX_SIZE) {
                    throw new ApiError(`File ${name} is to big.`)
                } else if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    throw new ApiError(`File ${name} has invalid format.`)
                }
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}