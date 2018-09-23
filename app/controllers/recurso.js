module.exports.cadastrarRecurso = function (application, req, res) {

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

    const recursoModel = new application.app.models.RecursoDAO(global.db);

    let id = req.query.idRecurso;    

    console.log('Id...:', id);

    if (id != undefined) {
        
        let dados = {
            idRec: id,
            idUser: userId
        }

        recursoModel.getUsuario(userId, (err2, result2) => {
            recursoModel.getRecurso(dados, (err, result) => {

                if (err) {
                    res.json(err);
                }
                else {                    
                    res.render('novoRecurso', {
                        message: msg,
                        user: userId,
                        nomeUsuario: result2[0].first_name,
                        dados: result[0]                                        
                    });                
                }
            })
        });
    }
    else {               
        recursoModel.getUsuario(userId, (err2, result2) => {
            if (err2) {
                console.log(err2);
            }
            else {
                res.render('novoRecurso', { 
                    message: msg,
                    user: userId,
                    nomeUsuario: result2[0].first_name,
                    dados: {}                    
                });
            }
        });
    }
}

module.exports.cadastrar = function (application, req, res) {

    let recurso = req.body;
    const recursoModel = new application.app.models.RecursoDAO(global.db);

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }    

    if (recurso.idRecurso == '') {        
        delete recurso.idRecurso;            
        recursoModel.postRecurso(recurso, (err, result) => {
            
            if (err) {
                console.log(err);
                res.redirect('/cadastrarRecurso?msg=F');
            }
            else {
                res.redirect('http://localhost:8080/listarRecursos');
            }
        });
    } else {
        recursoModel.putRecurso(recurso, (err, result) => {
            
            if (err != null) {
                res.redirect('/cadastrarRecurso?msg=F');
            }
            else {                
                res.redirect('http://localhost:8080/listarRecursos');
            }
        });
    }

}

module.exports.listarRecurso = function (application, req, res) {

    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const recursoModel = new application.app.models.RecursoDAO(global.db);

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    recursoModel.getUsuario(userId, (err2, result2) => {
        recursoModel.getListarRecurso(userId, (err, result) => {
            if (err) {                
                res.json(err);
            }
            res.render('listarRecursos', {
                message: msg,
                user: userId,
                nomeUsuario: result2[0].first_name,
                data: result                
            });
        })
    });
}

module.exports.excluirRecurso = function (application, req, res) {
    
    const recursoModel = new application.app.models.RecursoDAO(global.db); 

    if (req.query.idRecurso != undefined) {
        
        recursoModel.deleteRecurso(req.query.idRecurso, (err, result) => {
            if (err != null) {
                console.log(err);
            }
            else {                
                res.redirect('http://localhost:8080/listarRecursos');
            }
        });
    } else {
        console.log('To pulando pro else mesmo!');        
    }
}

