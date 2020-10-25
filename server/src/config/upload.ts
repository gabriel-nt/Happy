import multer from 'multer';
import path from 'path';

const uploadsFolder = path.join(__dirname, '..', '..', 'uploads');

export default {
  uploadsFolder,

  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    }
  })
}