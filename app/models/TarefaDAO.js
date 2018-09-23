function TarefaDAO(connection) {    
    this._connection = connection;
}

TarefaDAO.prototype.getTarefa = function(dados, callback){
    this._connection.query('select * from tarefas where idTarefa = ? and idUsuario = ?', [dados.idTar, dados.idUser], callback);    
}

TarefaDAO.prototype.getUsuario = function(userID, callback){
    this._connection.query('select * from users where id = ' + userID, callback);    
}

module.exports = function(){
    return TarefaDAO;
}
