const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from projeto', (err, projetos) => {
            if (err) {
                res.json(err);
            }            
            res.render('projetos', {
                data: projetos
            });
        });
    });
};

controller.save = (req, res) => {    
    const data = req.body    

    req.getConnection((err, conn) => {
        conn.query('insert into projeto set ?', [data], (err, projeto) => {
            res.redirect('/');
        });
    });
}


controller.edit = (req, res) => {    
    
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from projeto where id=?', [id], (err, projeto) => {
            res.render('projeto_edit', {
                data: projeto[0]
            })
        });
    });
};


controller.update = (req, res) => {
    const { id } = req.params;
    const newprojeto = req.body;
    req.getConnection((err, conn) => {
        conn.query('update projeto set ? where id = ?', [newprojeto, id], (err, rows) => {
            res.redirect('/');
        })
    })
};

controller.delete = (req, res) => {    
    
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('delete from projeto where id=?', [id], (err, rows) => {
            res.redirect('/');
        });
    })
};

module.exports = controller;