const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

router.use(express.static('public'));

router.get('/upload', function(req, res){
    res.render('visualiser/upload.ejs');
   });  

router.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

module.exports = router;
