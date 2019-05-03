const express = require('express');
var multer  = require('multer')
var yukle = multer({ dest: 'uploads/' })

const bp = require('body-parser');
const app = express()
const port = 4000
const login = require("./islemler")

app.use(express.static('uploads'))
app.set('view engine', 'ejs')
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
//app.get('/guncellemeYap/:id',login.guncelle);
app.post('/guncelle',login.guncelleme);
app.get('/sil/:id',login.sil);
app.post('/sanatci',login.sanatciPost); 
app.post('/album',login.albumpost);
app.get('/', login.listele);
app.get('/liste', login.listele);
app.get('/ekle', login.bolumEkleGet);
app.post('/ekle', yukle.any(), login.bolumEklePost);

app.get('/guncelleme/:id', login.guncellemeGet);

app.get('/guncellemeYap',function(req,res){ 
    res.render('/guncellemeYap');
})
app.post('/guncellemeYap', yukle.any(), login.guncelleme);

app.get('/album', login.albumEkleGet);
app.post('/album', yukle.any(), login.albumEklePost);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));