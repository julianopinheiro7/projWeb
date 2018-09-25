module.exports = function (application) {

    application.get('/apontarTarefa', (req, res) => {        
        application.app.controllers.tarefa.apontarTarefa(application, req, res);
    });

    application.post('/gravarTarefa', (req, res) => {        
        application.app.controllers.tarefa.cadastrar(application, req, res);
    });

    application.get('/listarTarefa', (req, res) => {        
        application.app.controllers.tarefa.listarTarefa(application, req, res);
    });

    application.get('/listarTarefaProjeto', (req, res) => {        
        application.app.controllers.tarefa.listarTarefaProjeto(application, req, res);
    });

}