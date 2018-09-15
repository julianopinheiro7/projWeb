module.exports = function (application) {

    application.get('/cadastrarRecurso', (req, res) => {
        console.log('Passei aqui...');
        application.app.controllers.recurso.cadastrarRecurso(application, req, res);
    });

    application.post('/gravarRecurso', (req, res) => {
        console.log('Entrei aqui mano!');
        application.app.controllers.recurso.cadastrar(application, req, res);
    });
    
}