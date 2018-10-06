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

ProjetoDAO.prototype.deleteProjeto = function(idProjeto, callback){
    this._connection.query('delete from projeto where idProjeto = ?', idProjeto, callback);
}

ProjetoDAO.prototype.getProjetoSelect = function(id, callback){    
    this._connection.query('select idProjeto, nome from projeto where idProjeto = ?', id, callback);
}

ProjetoDAO.prototype.getProjetoSelectUser = function(userID, callback){    
this._connection.query('select idProjeto, nome from projeto where idUsuario = ?', userID, callback);    
}

ProjetoDAO.prototype.postProjRecursos = function(projRecursos, callback){    
    this._connection.query('insert into proj_recursos set ?', projRecursos, callback);    
}

ProjetoDAO.prototype.getIntegrarProjeto = function(idProjeto, callback){    
    this._connection.query(
        'select r.nome, r.valor, r.tipoCobranca, pr.qtdeRecurso,' +
        '(r.valor * pr.qtdeRecurso) as valorParcialvalor' +
        'from proj_recursos as pr inner join projeto as p' +
        'on p.idProjeto = pr.idProjeto' +
        'inner join recursos as r on r.idRecurso = pr.idRecurso;' +
        'where idProjeto = ?', idProjeto, callback);    
}

ProjetoDAO.prototype.getExibirProjRecursos = function(id, callback) {    
    this._connection.query('select r.nome, FORMAT(r.valor, 2,"pt_BR") as valor, r.tipoCobranca, pr.qtdeRecurso from proj_recursos as pr inner join projeto as p on p.idProjeto = pr.idProjeto inner join recursos as r on r.idRecurso = pr.idRecurso where pr.idProjeto = ?', id, callback);      
}

module.exports = function(){
    return ProjetoDAO;
}