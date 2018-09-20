module.exports = function (application) {

    application.get('/cadastrarProjeto', (req, res) => {
        console.log('Passei aqui...');
        application.app.controllers.projeto.cadastrarProjeto(application, req, res);
    });

    application.post('/cadastrar', (req, res) => {
        console.log('Entrei aqui mano!');
        application.app.controllers.projeto.cadastrar(application, req, res);
    });
    
    application.get('/listarProjetos', (req, res) => {
        console.log('Listar Projetos...');
        application.app.controllers.projeto.listar(application, req, res);
    });

}