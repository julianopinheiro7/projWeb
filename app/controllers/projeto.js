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

    let id = req.query.idProjeto;
    console.log('Variavel proj...:', id);

    if (id != undefined) {

        console.log('Entrei no if...:', id);
        const projetoModel = new application.app.models.ProjetoDAO(global.db);

        let dados = {
            idProj: id,
            idUser: userId
        }

        projetoModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjeto(dados, (err, result) => {
                if (err) {
                    res.json(err);
                }
                console.log('Result....:', result[0].nome);
                res.render('novoProjeto', {
                    message: msg,
                    user: userId,
                    nome: result2[0].first_name,
                    proj: result[0].nome
                });                
            })
        });
    }
    else {
        console.log('Estou caindo no else !!!');
        res.render('novoProjeto', { message: msg, user: userId, nome: result2[0].first_name });
    }






}


module.exports.cadastrar = function (application, req, res) {

    let projeto = req.body;
    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    if (projeto.idProjeto == '') {
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
    else {
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
    console.log(proj);

    projetoModel.getUsuario(userId, (err2, result2) => {
        projetoModel.getListarProjeto(userId, (err, result) => {
            if (err) {
                console.log('Erro...: ', err);
                res.json(err);
            }
            res.render('listarProjetos', {
                message: msg,
                user: userId,
                nome: result2[0].first_name,
                data: result,
                moment: moment
            });
        })
    });
}



