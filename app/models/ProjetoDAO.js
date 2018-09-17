function ProjetoDAO(connection) {    
    this._connection = connection;
}

ProjetoDAO.prototype.postProjeto = function(projeto, callback){
    console.log('Estrutura do projeto', projeto);
    
    this._connection.query('insert into projeto set ?', projeto, callback);       
}

ProjetoDAO.prototype.getProjeto = function(id, callback){
    this._connection.query('select * from projeto where idProjeto = ' + id, callback);
}

ProjetoDAO.prototype.getUsuario = function(userID, callback){
    this._connection.query('select * from users where id = ' + userID, callback);
    console.log('Estou chegando aqui...', userID);
}

module.exports = function(){
    return ProjetoDAO;
}