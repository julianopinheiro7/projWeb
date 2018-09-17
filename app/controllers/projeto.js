module.exports.cadastrarProjeto = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }
    
    const projetoModel = new application.app.models.ProjetoDAO(global.db);
    
    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    projetoModel.getProjeto(req.query.id, (err, result) => {
        projetoModel.getUsuario(userId, (err2, result2) => {
            res.render('novoProjeto', { message: msg, user: userId, nome: result2[0].first_name });
        })
    });
}


module.exports.cadastrar = function (application, req, res) {
    
    let projeto = req.body;    
    const projetoModel = new application.app.models.ProjetoDAO(global.db);  
         
    projetoModel.postProjeto(projeto, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/cadastrarProjeto?msg=F');            
        }
        else {
            res.redirect('/cadastrarProjeto?msg=T');
        }

    });
}

