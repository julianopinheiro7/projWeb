module.exports.cadastrarProjeto = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }
    
    const projetoModel = new application.app.models.ProjetoDAO(global.db);
       

    projetoModel.getProjeto(req.query.id, (err, result) => {
        
        if (err != null) {
            res.render('novoProjeto', { message: msg });
        } else {
            res.render('novoProjeto', { message: msg });
        }            
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

