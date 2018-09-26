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

    console.log('Id...:', id);

    if (id != undefined) {

        let dados = {
            idTar: id,
            idUser: userId
        }

        tarefaModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjetoSelect((err3, result3) => {
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
                            selectProjeto: result3[0]
                        });
                    }
                })
            })
        });
    }
    else {
        console.log('Fiote estou entrando no else');
        tarefaModel.getUsuario(userId, (err2, result2) => {
            projetoModel.getProjetoSelect((err3, result3) => {
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

    let msg = '';
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

    console.log(proj);

    if (tarefa.idTarefa == '') {

        delete tarefa.idTarefa;
        tarefaModel.postTarefa(tarefa, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/apontarTarefa?msg=F');
            }
            else {
                tarefaModel.getUsuario(userId, (err2, result2) => {
                    tarefaModel.getListarTarefaProjeto(proj, (err, result) => {
                        console.log(result[0].descricao);
                        if (err) {
                            res.json(err);
                        }
                        res.render('listarTarefa', {
                            message: msg,
                            user: userId,
                            nomeUsuario: result2[0].first_name,
                            data: result[0].descricao
                        });
                    })
                });                
            }
        });
    } else {
        tarefaModel.putTarefa(tarefa, (err, result) => {

            if (err != null) {
                res.redirect('/apontarTarefa?msg=F');
            }
            else {
                res.redirect('http://localhost:8080/listarTarefa');
            }
        });
    }
}

module.exports.listarTarefa = function (application, req, res) {

    let msg = '';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    const tarefaModel = new application.app.models.TarefaDAO(global.db);    

    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    tarefaModel.getUsuario(userId, (err2, result2) => {        
        tarefaModel.getListarTarefa(userId, (err, result) => {            
            if (err) {
                res.json(err);
            }
            res.render('listarTarefa', {
                message: msg,
                user: userId,
                nomeUsuario: result2[0].first_name,
                data: result[0].descricao                
            });
        })        
    });
}

module.exports.listarTarefaProjeto = function (application, req, res) {
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

    proj = {
        userId: req.query.userId,
        idProj: req.query.idProjeto
    }

    const tarefaModel = new application.app.models.TarefaDAO(global.db);

    console.log('idProj', proj.idProj);

    tarefaModel.getUsuario(userId, (err2, result2) => {
        tarefaModel.getListarTarefaProjeto(proj, (err, result) => {
            if (err) {
                res.json(err);
            }
            res.render('listarTarefa', {
                message: msg,
                user: userId,
                nomeUsuario: result2[0].first_name,
                data: result
            });
        })
    });
} 