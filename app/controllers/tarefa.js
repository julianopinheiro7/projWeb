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

    let id = req.query.idTarefa;    

    if (id != undefined) {
        
        let dados = {
            idTar: id,
            idUser: userId
        }

        tarefaModel.getUsuario(userId, (err2, result2) => {
            tarefaModel.getTarefa(dados, (err, result) => {

                if (err) {
                    res.json(err);
                }
                else {                    
                    res.render('apontarTarefa', {
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
        tarefaModel.getUsuario(userId, (err2, result2) => {
            if (err2) {
                console.log(err2);
            }
            else {
                res.render('apontarTarefa', { 
                    message: msg,
                    user: userId,
                    nomeUsuario: result2[0].first_name,
                    dados: {}                    
                });
            }
        });
    }
}