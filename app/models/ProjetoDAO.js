function ProjetoDAO(connection) {    
    this._connection = connection;
}

ProjetoDAO.prototype.postProjeto = function(projeto, callback){        
    this._connection.query('insert into projeto set ?', projeto, callback);       
}

ProjetoDAO.prototype.getProjeto = function(dados, callback){    
    this._connection.query('select * from projeto where idProjeto = ? and idUsuario = ?', [dados.idProj, dados.idUser], callback);    
}

ProjetoDAO.prototype.getListarProjeto = function(userID, callback){    
    this._connection.query('select * from projeto where idUsuario = ' + userID, callback);    
}

ProjetoDAO.prototype.getUsuario = function(userID, callback){
    this._connection.query('select * from users where id = ' + userID, callback);    
}

ProjetoDAO.prototype.putProjeto = function(projeto, callback){
    let idProjeto = projeto.idProjeto;
    delete projeto.idProjeto;

    this._connection.query('update projeto set ? where idProjeto = ?', [projeto, idProjeto], callback);
}

module.exports = function(){
    return ProjetoDAO;
}