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

    application.get('/excluirProjRec', (req, res) => {
        application.app.controllers.projeto.excluirProjRec(application, req, res);
    })
        
    application.get('/integrarProjeto', (req, res) => {        
        application.app.controllers.projeto.integrarProjeto(application, req, res);
    });

    application.get('/novoProjRecurso', (req, res) => {
        application.app.controllers.projeto.novoProjetoRecurso(application, req, res);
    })

    application.post('/addRecProj', (req, res) => {        
        application.app.controllers.projeto.adicionarRecursoProj(application, req, res);
    });

    application.get('/integrarProjetoRelatorio', (req, res) => {
        application.app.controllers.projeto.integrarProjetoSelecionado(application, req, res);
    });


}