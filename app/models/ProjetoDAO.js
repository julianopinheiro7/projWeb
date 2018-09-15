function ProjetoDAO(connection) {    
    this._connection = connection;
}

ProjetoDAO.prototype.postProjeto = function(projeto, callback){
    console.log('Estrutura do callback', projeto);
    this._connection.query('insert into projeto set ?', projeto, callback);
}

ProjetoDAO.prototype.getProjeto = function(id, callback){
    this._connection.query('select * from projeto where idProjeto = ' + id, callback);
}

module.exports = function(){
    return ProjetoDAO;
}