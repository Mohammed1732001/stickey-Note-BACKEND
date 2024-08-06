import multer, { diskStorage } from 'multer'
import { nanoid } from 'nanoid'
import fs from 'fs'

export const uploadFile = (customPath) => {
    const folderName = `uploads/${customPath}`
    const storage = diskStorage({
        filename: (req, file, cb) => {
            const fileName = nanoid() + "__" + file.originalname
            req.folderName = folderName + "/" + fileName
            cb(null, fileName)
        },
        destination: (req, file, cb) => {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName)
            }
            cb(null, folderName)
        }
    })
    const upload = multer({ storage })
    return upload
}



