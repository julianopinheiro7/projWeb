var moment = require('moment');

module.exports.cadastrarProjeto = function (application, req, res) {

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

    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    let id = req.query.idProjeto;    
    if (id != undefined) {
        
        let dados = {
            idProj: id,
            idUser: userId
        }

        projetoModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjeto(dados, (err, result) => {
                
                let dtInicio = result[0].data_inicio;
                Date.parse(dtInicio);
                
                console.log(dtInicio);

                if (err) {
                    res.json(err);
                }
                else {                    
                    res.render('novoProjeto', {
                        message: msg,
                        user: userId,
                        nomeUsuario: result2[0].first_name,
                        dados: result[0],  
                        dtInicio: dtInicio,                      
                        moment: moment                      
                    });                
                }
            })
        });
    }
    else {       
        projetoModel.getUsuario(userId, (err2, result2) => {
            if (err2) {
                console.log(err2);
            }
            else {
                res.render('novoProjeto', { 
                    message: msg,
                    user: userId,
                    nomeUsuario: result2[0].first_name,
                    dados: {},
                    moment: moment       
                });
            }
        });
    }
}

module.exports.cadastrar = function (application, req, res) {

    let projeto = req.body;
    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    console.log('idProjeto', projeto.idProjeto );

    if (projeto.idProjeto == undefined) {
        console.log('Entrei aqui...')
        projetoModel.postProjeto(projeto, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/cadastrarProjeto?msg=F');
            }
            else {
                res.redirect('/cadastrarProjeto?msg=T');
            }
        });
    } else {
        projetoModel.putProjeto(projeto, (err, result) => {
            if (err != null) {
                res.redirect('/cadastrarProjeto?msg=F');
            }
            else {
                res.redirect('/cadastrarProjeto?msg=T');
            }
        });
    }

}

module.exports.listar = function (application, req, res) {

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

    let proj = req.body;

    projetoModel.getUsuario(userId, (err2, result2) => {
        projetoModel.getListarProjeto(userId, (err, result) => {
            if (err) {                
                res.json(err);
            }
            res.render('listarProjetos', {
                message: msg,
                user: userId,
                nomeUsuario: result2[0].first_name,
                data: result,
                moment: moment
            });
        })
    });
}



