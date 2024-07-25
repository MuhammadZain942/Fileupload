const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const imageDB = []; // Don't use this in a real project; it should be in a database

app.use(express.static('public'));
app.use(express.static('uploads'));

app.post('/image', upload.single('avatar'), function (req, res, next) {
    console.log(req.file.filename);
    console.log(req.body);

    const newFileName = req.body.fullname + path.extname(req.file.originalname);
    fs.rename(`uploads/${req.file.filename}`, `uploads/${newFileName}`, (err) => {
        if (err) {
            return res.status(500).send('Error while uploading file.');
        } else {
            imageDB.push(newFileName);
            res.send(`
                <script>
                    alert('Upload successful!');
                    window.location.href = '/';
                </script>
            `);
        }
    });
});

app.get('/images', (req, res) => {
    let html = "";
    imageDB.forEach(image => {
        html += `<img width="50%" src='/${image}'></img>`;
    });
    res.send(html);
});

app.listen(PORT, () => {
    console.log('server started at ' + PORT);
});
