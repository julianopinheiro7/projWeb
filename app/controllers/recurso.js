module.exports.cadastrarRecurso = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }
    
    const recursoModel = new application.app.models.RecursoDAO(global.db);
       

    recursoModel.getRecurso(req.query.id, (err, result) => {
        
        if (err != null) {
            res.render('novoRecurso', { message: msg });
        } else {
            res.render('novoRecurso', { message: msg });
        }            
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

