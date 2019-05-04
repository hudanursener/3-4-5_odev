const sql = require('mssql')

var webconfig = { user: "batuhan",
                 password: "KD@:S/5Y", 
                 server: "nodejsbatuhan.database.windows.net", 
                 database: "MEDIPOL", 
                 options: { encrypt: true }
                };
module.exports.listele = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query(" select * from Sanatci s left join Album a on s.idSanatci= a.SanatciId ", function (err, verisonucu) {
            if (err) {
                console.log(err);
            
            }
            sql.close();
            res.render('home', { veri: verisonucu.recordset });
            
        });
        
    });
}
module.exports.sanatciPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into Sanatci VALUES('" + req.body.ad + "'," + req.body.exampleRadios + "," + req.body.dTarihi + ",GETDATE())", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/album');
        });


    });
}

module.exports.albumpost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("" + req.body.turAdi + "'))", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('/home');
        });


    });
}

module.exports.guncelleme = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query(" UPDATE  Sanatci SET SanatciAdi='" + req.body.ad + "', SanatciYasiyormu=" + req.body.exampleRadios + ", SanatciDogumTarihi=" + req.body.dTarihi + "WHERE idSanatci =" + req.body.seciliId + " ", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/');
        });
    });
}

module.exports.sil = function (req, res) { 
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from Sanatci where idSanatci=" + req.params.id + "", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            //var id = req.params.id;
            // res.render('home', { veri: verisonucu.recordset/*,id:id*/ });
            res.redirect('/');
        });


    });
}
module.exports.bolumEkleGet = function (req, res) {
    res.render("ekle");
}
module.exports.bolumEklePost = function (req, res) {
    res.redirect('/album');
}

module.exports.albumEkleGet = function (req, res) {
    res.render("album");
}
module.exports.albumEklePost = function (req, res) {
    res.redirect('/home');
}


module.exports.guncellemepost = function (req, res) {
    res.redirect('/guncellemeYap');
}
module.exports.guncellemeGet = function (req, res) {
            var id = req.params.id;
            res.render('guncellemeYap',{id:id});
}

