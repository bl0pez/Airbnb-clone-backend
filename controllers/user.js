const imageDownloader = require('image-downloader');
const path = require('path');

/**
 * Carga imagen por link
 * @param {*} req 
 * @param {*} res 
 */
const uploadByLink = async (req, res) => {

    const { link } = req.body;

    const newName = 'photo' + Date.now() + '.jpg';


   await imageDownloader.image({
        url: link,
        dest: __dirname + '/../uploads/' +newName
    });

    res.json({
        ok: true,
        msg: newName
    });

}

const uploadByFile = async (req, res) => {

    const files = req.files;

    console.log(files);

    try {

       res.json({
            ok: true,
            msg: files.map(file => file.filename)
       }); 

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    uploadByLink,
    uploadByFile
}