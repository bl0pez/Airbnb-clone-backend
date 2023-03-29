const { Router } = require('express');
const { uploadByLink, uploadByFile } = require('../controllers/user');
const multer  = require('multer')
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, 'photo' + Date.now() + '.jpg')
    }
});

const upload = multer({ storage: storage })

router.post('/upload-by-link', uploadByLink);
router.post('/upload-by-file', upload.array('photos', 12), uploadByFile);


module.exports = router;