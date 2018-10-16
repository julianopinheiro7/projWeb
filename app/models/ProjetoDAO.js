function ProjetoDAO(connection) {    
    this._connection = connection;
}

ProjetoDAO.prototype.postProjeto = function(projeto, callback){        
    this._connection.query('insert into projeto set ?', projeto, callback);       
}

ProjetoDAO.prototype.postProjRecursos = function(projRecursos, callback){     
    this._connection.query('insert into proj_recursos set ?', projRecursos, callback);    
}

ProjetoDAO.prototype.getProjeto = function(dados, callback){    
    this._connection.query('select * from projeto where idProjeto = ? and idUsuario = ?', [dados.idProj, dados.idUser], callback);    
}

ProjetoDAO.prototype.getProjetoR = function(id, callback) {       
    this._connection.query('select idProjeto from proj_recursos where idProj_recursos = ' + id, callback);
}

ProjetoDAO.prototype.getListarProjeto = function(userID, callback){    
    this._connection.query('select * from projeto where idUsuario = ' + userID, callback);    
}

ProjetoDAO.prototype.getListarProjetoList = function(id, callback){    
    this._connection.query('select * from projeto where idProjeto = ' + id, callback);    
}

ProjetoDAO.prototype.getUsuario = function(userID, callback){
    this._connection.query('select * from users where id = ' + userID, callback);    
}

ProjetoDAO.prototype.putProjeto = function(projeto, callback){
    let idProjeto = projeto.idProjeto;
    delete projeto.idProjeto;
    this._connection.query('update projeto set ? where idProjeto = ?', [projeto, idProjeto], callback);
}

ProjetoDAO.prototype.putProjRecursos = function(projRecurso, callback) {
    console.log('Objeto que ta chegando para atualizar',projRecurso);
    let idProj_recursos = projRecurso.idProj_recursos;
    delete projRecurso.idProj_recursos;
    this._connection.query('update proj_recursos set ? where idProj_recursos = ?', [projRecurso, idProj_recursos], callback);
}

ProjetoDAO.prototype.deleteProjeto = function(idProjeto, callback){
    this._connection.query('delete from projeto where idProjeto = ?', idProjeto, callback);
}

ProjetoDAO.prototype.deleteProjRecurso = function(id, callback) {
    this._connection.query('delete from proj_recursos where idProj_recursos = ?', id, callback);
}

ProjetoDAO.prototype.getProjetoSelect = function(callback){    
    this._connection.query('select idProjeto, nome from projeto', callback);
}

ProjetoDAO.prototype.getProjetoRec = function(id, callback){    
    this._connection.query('select idProjeto, nome from projeto where idProjeto = ?', id, callback);
}

ProjetoDAO.prototype.getProjetoSelectUser = function(userID, callback){    
    this._connection.query('select idProjeto, nome from projeto where idUsuario = ?', userID, callback);    
}

ProjetoDAO.prototype.getIntegrarProjeto = function(id, callback){        
    this._connection.query(
    'select r.nome, FORMAT(r.valor, 2,"pt_BR") as valor, r.tipoCobranca, pr.qtdeRecurso, FORMAT((r.valor * pr.qtdeRecurso),2,"PT_BR") as valorParcialvalor from proj_recursos as pr inner join projeto as p on p.idProjeto = pr.idProjeto inner join recursos as r on r.idRecurso = pr.idRecurso where pr.idProjeto = ' + id, callback);    
}

ProjetoDAO.prototype.getIntegrarProjTotal = function (id, callback) {
    this._connection.query(
    'select FORMAT(sum(r.valor * pr.qtdeRecurso), 2, "pt_BR") as valorTotalProjeto from proj_recursos as pr inner join projeto as p on p.idProjeto = pr.idProjeto inner join recursos as r on r.idRecurso = pr.idRecurso where pr.idProjeto = ' + id, callback);    
}

ProjetoDAO.prototype.getExibirProjRecursos = function(recProj, callback) {          
    this._connection.query('select pr.idProj_recursos, pr.idProjeto, pr.idRecurso, r.nome, FORMAT(r.valor, 2,"pt_BR") as valor, r.tipoCobranca, pr.qtdeRecurso from proj_recursos as pr inner join projeto as p on p.idProjeto = pr.idProjeto inner join recursos as r on r.idRecurso = pr.idRecurso where pr.idProjeto = ? and pr.idUsuario = ?', [recProj.idProj, recProj.idUser], callback);              
}

ProjetoDAO.prototype.getEditarProjRecursos = function(id, callback) {    
    this._connection.query('select * from proj_recursos where idProj_recursos = ?', id, callback);              
}

ProjetoDAO.prototype.getProjetoRecurso = function(idProjeto, callback) {
    this._connection.query('select idProjeto from proj_recursos where idProjeto = ' + idProjeto, callback);
}

ProjetoDAO.prototype.getProjetoTar = function(id, callback){    
    this._connection.query('select idProjeto, nome from projeto where idProjeto = ?', id, callback);
}

module.exports = function(){
    return ProjetoDAO;
}