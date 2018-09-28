function TarefaDAO(connection) {    
    this._connection = connection;
}

TarefaDAO.prototype.getTarefa = function(dados, callback){
    this._connection.query('select * from tarefas where idTarefa = ? and idUsuario = ?', [dados.idTar, dados.idUser], callback);    
}

TarefaDAO.prototype.getUsuario = function(userID, callback){
    this._connection.query('select * from users where id = ' + userID, callback);    
}

TarefaDAO.prototype.postTarefa = function(tarefa, callback){        
    this._connection.query('insert into tarefas set ?', tarefa, callback);       
}

TarefaDAO.prototype.putTarefa = function(tarefa, callback){
    let idTarefa = recurso.idTarefa;
    delete tarefa.idTarefa;
    this._connection.query('update tarefas set ? where idTarefa = ?', [tarefa, idTarefa], callback);
}

TarefaDAO.prototype.getListarTarefa = function(userID, callback){    
    this._connection.query('select * from tarefas where idUsuario = ' + userID, callback);    
}

TarefaDAO.prototype.getExibirTarefa = function(obj, callback) {
    this._connection.query('select * from tarefas where idProjeto = ? and idUsuario = ?', [obj.id, obj.idUser], callback);
}

module.exports = function(){
    return TarefaDAO;
}
