import { UnsupportedMediaTypeException } from "@nestjs/common"

export const ImageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      const err = new UnsupportedMediaTypeException(
        'Solo archivos de tipo imagen son soportados',
      )
      return callback(err, false)
    }
    callback(null, true)
  }