module.exports = function (application) {

    application.get('/apontarTarefa', (req, res) => {        
        application.app.controllers.tarefa.apontarTarefa(application, req, res);
    });

    application.post('/gravarTarefa', (req, res) => {        
        application.app.controllers.tarefa.cadastrar(application, req, res);
    });

    application.get('/consultarTarefa', (req, res) => {        
        application.app.controllers.tarefa.consultarTarefa(application, req, res);
    });

    application.get('/excluirTarefa', (req, res) => {
        application.app.controllers.tarefa.excluirTarefa(application, req, res);
    });
    

}