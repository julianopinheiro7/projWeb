module.exports = function (application) {

    application.get('/cadastrarProjeto', (req, res) => {                
        application.app.controllers.projeto.cadastrarProjeto(application, req, res);        
    });

    application.post('/cadastrar', (req, res) => {                
        application.app.controllers.projeto.cadastrar(application, req, res);        
    });
    
    application.get('/listarProjetos', (req, res) => {        
        application.app.controllers.projeto.listar(application, req, res);
    });

    application.get('/excluirProjeto', (req, res) => {
        application.app.controllers.projeto.excluirProjeto(application, req, res);
    });
        
    application.get('/integrarProjeto', (req, res) => {        
        application.app.controllers.projeto.integrarProjeto(application, req, res);
    });

    application.get('/incluirRecursoProj', (req, res) => {        
        application.app.controllers.projeto.incluirRecursoProj(application, req, res);
    });

}