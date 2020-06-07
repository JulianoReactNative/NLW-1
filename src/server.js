const express = require("express");
const server = express();

//pegar o banco de dados

const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//habilitar uso do body
server.use(express.urlencoded({extended: true}))


//utilizando templete engine (html com bomba) html dinâmico
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//configurar os caminhos da aplicação
//página inicial
//req: requisião
//res: resposta
server.get("/", (req, res) => { //__dirname = pega a pasta que vc está
    return res.render("index.html")
})

server.get("/create-point", (req, res) => { //__dirname = pega a pasta que vc está

    //req.query: Query string da nossa URL
    //console.log(req.query)

    return res.render("create-point.html")
})


server.post("/save-point", (req, res) => {

    //inserir dados no banco de dados

    
    const query = `
    INSERT INTO places (
        image, 
        name,
        address, 
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)`

    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("./partials/error.html")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        console.log(values)

        res.render("create-point.html", {saved: true})
    }

     db.run(query, values, afterInsertData) // insere dados = 1º query, 2º valores, 3º arrow function

})



server.get("/search-results", (req, res) => { //__dirname = pega a pasta que vc está
    

    const search = req.query.search


    if (search == "") {
        return res.render("search-results.html", {total: 0})
    }


    //pegar os dados do banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        //mostrar o hmtl com os dados do banco
        return res.render("search-results.html", {places: rows, total: total})
    })
   
})


//ligar o servidor
server.listen(3000)
