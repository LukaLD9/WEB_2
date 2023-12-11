const express = require('express');
const multer = require('multer');
const path = require("path");
const app = express();
const httpPort = 1234;

app.use(express.json());

// app.use((req, res, next) => {
//     console.log(new Date().toLocaleString() + " " + req.url);
//     next();
// });

const UPLOAD_PATH = path.join(__dirname, "public", "uploads");
var uploadAudio = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_PATH);
        },
        filename: function (req, file, cb) {
            let fn = file.originalname.replaceAll(":", "-");
            cb(null, fn);
        }
    })
}).single('audio');
  
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
app.post('/upload', function (req, res) {
    uploadAudio(req, res, async function (err) {
        if(err) {
            console.log(err);
            res.json({
                success: false,
                error: {
                    message: 'Upload failed' + JSON.stringify(err)
                }
            })
        } else {
            res.json({
                success: true,
                file: req.body.id
            });
            // push notification
        }
    });
});


app.use(express.static(path.join(__dirname, "public")));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(httpPort, function () {
    console.log(`HTTP listening on port: ${httpPort}`);
    console.log(`http://localhost:${httpPort}`);
});