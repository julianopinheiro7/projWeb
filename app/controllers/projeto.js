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

        projetoModel.getProjetoR(id, (err, result1) => {

            projetoModel.deleteProjRecurso(id, (err, result) => {

                if (err != null) {
                    console.log(err);
                }
                else {
                    let idProj = result1[0].idProjeto;
                    res.redirect('http://localhost:8080/integrarProjeto?idProjeto=' + idProj);
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

module.exports.integrarProjetoSelecionado = function (application, req, res) {

    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    let id = req.query.idProjeto;

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {
        projetoModel.getProjetoRec(id, (err1, result1) => {
            projetoModel.getListarProjetoList(id, (err2, result2) => {
                projetoModel.getIntegrarProjeto(id, (err3, result3) => {
                    projetoModel.getIntegrarProjTotal(id, (err4, result4) => {

                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.render('integrarProjetoRelatorio', {
                                user: userId,
                                nomeUsuario: results[0].first_name,
                                nomeProjeto: result1[0].nome,
                                dadosProj: result2[0],
                                dadosRec: result3,
                                totalProjeto: result4[0].valorTotalProjeto
                            });
                        }
                    });
                });
            });
        });
    });

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
                recursoModel.getRecursoSelectUser(userId, (err4, result4) => {
                    projetoModel.getEditarProjRecursos(id, (err5, result5) => {
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

module.exports.adicionarRecursoProj = function (application, req, res) {

    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    let projRecurso = req.body;
    let idProjeto = req.body.idProjeto;
    let id = projRecurso.idProj_recursos;   

    console.log('variavel id', projRecurso);

    if (id == '') {    
        console.log('Entrei para incluir com o objeto:', projRecurso);
        delete projRecurso.idProj_recursos;
        projetoModel.postProjRecursos(projRecurso, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/novoProjRecurso?msg=F');
            }
            else {
                res.redirect('http://localhost:8080/integrarProjeto?idProjeto=' + idProjeto);
            }
        });
    }
    else {
        console.log('Entrei no else para atualizar');
        projetoModel.putProjRecursos(projRecurso, (err, result) => {
            if (err != null) {
                console.log(err);
                res.redirect('/novoProjRecurso?msg=F');
            }
            else {
                res.redirect('http://localhost:8080/integrarProjeto?idProjeto=' + idProjeto);
            }
        });
    }
}

module.exports.consultarProjetosIntegrados = function (application, req, res) {

    let msg = ''
    let id = req.query.idProjeto;

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

    projetoModel.getUsuario(userId, (err, result) => {
        projetoModel.getProjetoSelectUser(userId, (err1, result1) => {
            projetoModel.getProjetoTar(id, (err4, result4) => {                
                if (err) {
                    res.json(err);
                }
                res.render('consultarProjInteg', {
                    message: msg,
                    user: userId,
                    nomeUsuario: result[0].first_name,
                    select: result1,
                    nomeProjeto: result4
                });
            });
        });
    });
}






