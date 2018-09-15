function RecursoDAO(connection) {    
    this._connection = connection;
}

RecursoDAO.prototype.postRecurso = function(recurso, callback){
    console.log('Estrutura do recurso', recurso);
    
    this._connection.query('insert into recursos set ?', recurso, callback);       
}

RecursoDAO.prototype.getRecurso = function(id, callback){
    this._connection.query('select * from recursos where idRecurso = ' + id, callback);
}

module.exports = function(){
    return RecursoDAO;
}