//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no de banco de dados
const db = new sqlite3.Database("./src/database/database.db") 


module.exports = db

//utilizar objeto de banco de dados para nossas operações (executar comandos SQL)
/* db.serialize(() => {
    //criar uma tabela
   /*   db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados na tabela
    
    const query = `
    INSERT INTO places (
        image, 
        name,
        addres, 
        addres2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)`

    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Coletoria",
        "Paperside",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

     db.run(query, values, afterInsertData) // insere dados = 1º query, 2º valores, 3º arrow function

    //consultar dados da tabela

   db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    }) 

    //deletar um dado da tabela

    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Registro removido com sucesso")
    }) }) */
