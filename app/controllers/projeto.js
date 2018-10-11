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

        console.log('Entrei no id != undefined para editar');

        projetoModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjeto(dados, (err, result) => {

                if (err) {
                    res.json(err);
                }
                else {
                    res.render('novoProjeto', {
                        message: msg,
                        user: userId,
                        nomeUsuario: result2[0].first_name,
                        dados: result[0],
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

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    if (projeto.idProjeto == '') {
        delete projeto.idProjeto;
        projetoModel.postProjeto(projeto, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/cadastrarProjeto?msg=F');
            }
            else {
                res.redirect('http://localhost:8080/listarProjetos');
            }
        });
    } else {
        projetoModel.putProjeto(projeto, (err, result) => {
            if (err != null) {
                res.redirect('/cadastrarProjeto?msg=F');
            }
            else {
                res.redirect('http://localhost:8080/listarProjetos');
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

module.exports.excluirProjeto = function (application, req, res) {

    let projeto = req.body;
    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    if (req.query.idProjeto != undefined) {

        projetoModel.deleteProjeto(req.query.idProjeto, (err, result) => {
            if (err != null) {
                console.log(err);
            }
            else {
                res.redirect('http://localhost:8080/listarProjetos');
            }
        });
    } else {
        console.log('Projeto não excluido! Verifique!');
    }
}

module.exports.excluirProjRec = function (application, req, res) {

    let id = req.query.idProj_recursos;
    const projetoModel = new application.app.models.ProjetoDAO(global.db);


    if (id != undefined) {

        projetoModel.getProjetoRec(id, (err, result1) => {
            projetoModel.deleteProjRecurso(id, (err, result) => {
                console.log('retorno result1', result1[0]);
                if (err != null) {
                    console.log(err);
                }
                else {
                    let idProjeto = result1[0].idProjeto;
                    res.redirect('http://localhost:8080/integrarProjeto?idProjeto=' + idProjeto);
                }
            })
        })

    } else {
        console.log('Recurso do Projeto não excluido! Verifique!');
    }

}

module.exports.integrarProjeto = function (application, req, res) {

    let msg = '';
    let id = req.query.idProjeto;

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const projetoModel = new application.app.models.ProjetoDAO(global.db);
    const recursoModel = new application.app.models.RecursoDAO(global.db);

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    let recProj = {
        idProj: id,
        idUser: userId
    }

    if (id == undefined) {

        projetoModel.getUsuario(userId, (err, result) => {
            projetoModel.getProjetoSelectUser(userId, (err1, result1) => {
                if (err) {
                    res.json(err);
                }
                res.render('integrarProjeto', {
                    message: msg,
                    user: userId,
                    nomeUsuario: result[0].first_name,
                    selectP: result1,
                    dados: {},
                    nomeProjeto: {}
                });
            });
        });
    }
    else {
        console.log('Goku');
        projetoModel.getUsuario(userId, (err, result) => {
            projetoModel.getProjetoSelectUser(userId, (err2, result2) => {
                projetoModel.getExibirProjRecursos(recProj, (err3, result3) => {
                    projetoModel.getProjetoRec(id, (err4, result4) => {
                        if (err) {
                            console.log('Erro na consulta:', err);
                        }
                        res.render('integrarProjeto', {
                            message: msg,
                            user: userId,
                            nomeUsuario: result[0].first_name,
                            selectP: result2,
                            dados: result3,
                            nomeProjeto: result4
                        })
                    })
                });
            });
        });
    }
}

module.exports.novoProjetoRecurso = function (application, req, res) {
    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const projetoModel = new application.app.models.ProjetoDAO(global.db);
    const recursoModel = new application.app.models.RecursoDAO(global.db);

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    let id = req.query.idProj_recursos;

    if (id != undefined) {

        projetoModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjetoSelectUser(userId, (err3, result3) => {
                recursoModel.getRecursoSelectUser(userId, (err3, result4) => {
                    projetoModel.getEditarProjRecursos(id, (err3, result5) => {
                        if (err2) {
                            res.json(err2);
                        }
                        res.render('novoProjRecurso', {
                            message: msg,
                            user: userId,
                            nomeUsuario: result2[0].first_name,
                            selectProjeto: result3,
                            selectRecurso: result4,
                            dados: result5[0]
                        });
                    });
                });
            });
        });
    }
    else {
        console.log('goku else');
        projetoModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjetoSelectUser(userId, (err3, result3) => {
                recursoModel.getRecursoSelectUser(userId, (err3, result4) => {
                    if (err2) {
                        res.json(err2);
                    }
                    res.render('novoProjRecurso', {
                        message: msg,
                        user: userId,
                        nomeUsuario: result2[0].first_name,
                        selectProjeto: result3,
                        selectRecurso: result4,
                        dados: {}
                    });
                });
            });
        });
    }


}

module.exports.adiconarRecursoProj = function (application, req, res) {

    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    let projRecurso = req.body;
    let id = req.body.idProjeto
    console.log('id pego do body', id);

    projetoModel.postProjRecursos(projRecurso, (err, result) => {

        if (err) {
            console.log(err);
            res.redirect('/novoProjRecurso?msg=F');
        }
        else {
            res.redirect('http://localhost:8080/integrarProjeto?idProjeto=' + id);
        }
    });

}






