module.exports = function (application) {

    application.get('/cadastrarProjeto', (req, res) => {
        console.log('Passei aqui...');
        application.app.controllers.projeto.cadastrarProjeto(application, req, res);
    });

    application.post('/cadastrar', (req, res) => {
        console.log('Entrei aqui mano!');
        application.app.controllers.projeto.cadastrar(application, req, res);
    });
    
}