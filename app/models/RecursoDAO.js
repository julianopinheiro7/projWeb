function RecursoDAO(connection) {    
    this._connection = connection;
}

RecursoDAO.prototype.postRecurso = function(recurso, callback){        
    this._connection.query('insert into recursos set ?', recurso, callback);       
}

RecursoDAO.prototype.getRecurso = function(dados, callback){
    this._connection.query('select * from recursos where idRecurso = ? and idUsuario = ?', [dados.idRec, dados.idUser], callback);    
}

RecursoDAO.prototype.getUsuario = function(userID, callback){
    this._connection.query('select * from users where id = ' + userID, callback);    
}

RecursoDAO.prototype.putRecurso = function(recurso, callback){
    let idRecurso = recurso.idRecurso;
    delete recurso.idRecurso;
    this._connection.query('update recursos set ? where idRecurso = ?', [recurso, idRecurso], callback);
}

RecursoDAO.prototype.getListarRecurso = function(userID, callback){  
    console.log('id do edson', userID);
    this._connection.query('select idRecurso ,nome, FORMAT(valor, 2,"pt_BR") as valor, tipoCobranca from recursos where idUsuario = ' + userID, callback);    
}

RecursoDAO.prototype.deleteRecurso = function(idRecurso, callback){    
    this._connection.query('delete from recursos where idRecurso = ?', idRecurso, callback);
}

RecursoDAO.prototype.getRecursoSelectUser = function(userID, callback){    
    this._connection.query('select idRecurso, nome from recursos where idUsuario = ?', userID, callback);    
}

module.exports = function(){
    return RecursoDAO;
}