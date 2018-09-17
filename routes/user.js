
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function (req, res) {
    message = '';
    var sess = req.session;

    if (req.method == "POST") {

        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        var fname = post.first_name;
        var lname = post.last_name;
        var email = post.email;
       
        if (post.first_name == '' || post.last_name == '' || post.email == '' || post.user_name == '' || post.password == '' ) {
            
            message = "Para criar sua conta, você deve preencher todos os campos!";
            res.render('signup.ejs', { message: message });
        }

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`email`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + pass + "')";

        //var query = 
        db.query(sql, function (err, result) {
            message = "Parabéns! Sua conta foi criada com sucesso.";
            res.render('signup.ejs', { message: message });
        });

    } else {
        res.render('signup');        
    }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = "SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
        db.query(sql, function (err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            }
            else {
                message = 'Credenciais Inválidas.';
                res.render('index.ejs', { message: message });
            }

        });
    } else {
        res.render('index.ejs', { message: message });
    }

};
//-----------------------------------------------dashboard page functionality----------------------------------------------

exports.dashboard = function (req, res, next) {
    
    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    var sql2 = "select count(*) as qtde from `projeto`";

    db.query(sql, function (err, results) {        
        db.query(sql2, function (err2, results2) {            
            res.render('dashboard.ejs', { user: userId, nome: results[0].first_name, qtde: results2[0].qtde });
        })        
    });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/login");
    })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function (req, res) {

    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    db.query(sql, function (err, result) {
        res.render('profile.ejs', { data: result });
    });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile = function (req, res) {
    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    db.query(sql, function (err, results) {
        res.render('edit_profile.ejs', { data: results });
    });
};
//--------------------------------- render view novos projetos
exports.novoProjeto = function (req, res, next) {

    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        res.render('novoProjeto.ejs', { user: userId, message: msg });
    });
};
//------------------------------- render header
exports.header = function (req, res, next) {
   
    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        res.render('header', { user: userId, nome: results[0].first_name });
    });
};
