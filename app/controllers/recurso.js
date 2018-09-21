module.exports.cadastrarRecurso = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }
    
    const recursoModel = new application.app.models.RecursoDAO(global.db);
    const projetoModel = new application.app.models.ProjetoDAO(global.db); 
    
    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    recursoModel.getRecurso(req.query.id, (err, result) => {
        projetoModel.getUsuario(userId, (err2, result2) => {
            res.render('novoRecurso', { message: msg, user: userId, nomeUsuario: result2[0].first_name });
        })
    });
}


module.exports.cadastrar = function (application, req, res) {
    
    let recurso = req.body;
    const recursoModel = new application.app.models.RecursoDAO(global.db);  
         
    recursoModel.postRecurso(recurso, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/cadastrarRecurso?msg=F');            
        }
        else {
            res.redirect('/cadastrarRecurso?msg=T');
        }
    });
}

