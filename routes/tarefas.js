module.exports = function (application) {

    application.get('/apontarTarefa', (req, res) => {        
        application.app.controllers.tarefa.apontarTarefa(application, req, res);
    });

}