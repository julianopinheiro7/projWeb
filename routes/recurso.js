module.exports = function (application) {

    application.get('/cadastrarRecurso', (req, res) => {        
        application.app.controllers.recurso.cadastrarRecurso(application, req, res);
    });

    application.post('/gravarRecurso', (req, res) => {        
        application.app.controllers.recurso.cadastrar(application, req, res);
    });

    application.get('/listarRecursos', (req, res) => {        
        application.app.controllers.recurso.listarRecurso(application, req, res);
    });

    application.get('/excluirRecurso', (req, res) => {
        application.app.controllers.recurso.excluirRecurso(application, req, res);
    });
    
}