module.exports.apontarTarefa = function (application, req, res) {

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

    const tarefaModel = new application.app.models.TarefaDAO(global.db);
    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    let id = req.query.idTarefa;

    if (id != undefined) {

        let dados = {
            idTar: id,
            idUser: userId
        }

        tarefaModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjetoSelectUser(userId, (err3, result3) => {
                tarefaModel.getTarefa(dados, (err, result) => {

                    if (err3) {
                        res.json(err);
                    }
                    else {                        
                        res.render('apontarTarefa', {
                            message: msg,
                            user: userId,
                            nomeUsuario: result2[0].first_name,
                            dados: result[0],
                            selectProjeto: result3
                        });
                    }
                });
            });
        });
    }
    else {
        tarefaModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjetoSelectUser(userId, (err3, result3) => {
                
                if (err2) {
                    console.log(err2);
                }
                else {
                    res.render('apontarTarefa', {
                        message: msg,
                        user: userId,
                        nomeUsuario: result2[0].first_name,
                        dados: {},
                        selectProjeto: result3
                    });
                }
            })
        });
    }
}

module.exports.cadastrar = function (application, req, res) {

    let tarefa = req.body;
    const tarefaModel = new application.app.models.TarefaDAO(global.db);

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    proj = {
        idProj: tarefa.idProjeto,
        idUser: userId
    }


    if (tarefa.idTarefa == '') {
        
        delete tarefa.idTarefa;
        tarefaModel.postTarefa(tarefa, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/apontarTarefa?msg=F');
            }
            else {
                res.redirect('/apontarTarefa?msg=T');
            }
        });
    } else {
        
        tarefaModel.putTarefa(tarefa, (err, result) => {            
            
            if (err != null) {
                res.redirect('/apontarTarefa?msg=F');
            }
            else {
                res.redirect('/consultarTarefa?idProjeto=' + tarefa.idProjeto);
            }
        });
    }
}

module.exports.consultarTarefa = function (application, req, res) {

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

    let obj = {
        id: id,
        idUser: userId
    }

    const tarefaModel = new application.app.models.TarefaDAO(global.db);
    const projetoModel = new application.app.models.ProjetoDAO(global.db);

    if (id == undefined) {

        tarefaModel.getUsuario(userId, (err, result) => {
            projetoModel.getProjetoSelectUser(userId, (err1, result1) => {

                if (err) {
                    res.json(err);
                }
                res.render('consultarTarefa', {
                    message: msg,
                    user: userId,
                    nomeUsuario: result[0].first_name,
                    select: result1,
                    dados: {},
                    nomeProjeto: {}
                });
            });
        });
    }
    else {
        tarefaModel.getUsuario(userId, (err, result) => {
            tarefaModel.getExibirTarefa(obj, (err2, result2) => {
                projetoModel.getProjetoSelectUser(userId, (err1, result1) => {
                    tarefaModel.getProjetoTar(id, (err4, result4) => {

                        if (err) {
                            res.json(err);
                        }
                        if (err2) {
                            res.json(err2);
                        }
                        if (err1) {
                            res.json(err3);
                        }
                        res.render('consultarTarefa', {
                            message: msg,
                            user: userId,
                            nomeUsuario: result[0].first_name,
                            dados: result2,
                            select: result1,
                            nomeProjeto: result4
                        })
                    })
                });
            });
        });
    }


}

module.exports.excluirTarefa = function (application, req, res) {

    const tarefaModel = new application.app.models.TarefaDAO(global.db);

    if (req.query.idTarefa != undefined) {

        let id = req.query.idTarefa;

        tarefaModel.getProjetoTarefa(id, (err1, result1) => {
            tarefaModel.deleteTarefa(id, (err, result) => {
                if (err != null) {
                    console.log(err);
                }
                else {
                    let idProjeto = result1[0].idProjeto;
                    res.redirect('http://localhost:8080/consultarTarefa?idProjeto=' + idProjeto);
                }
            });
        });
    } else {
        
    }
}








