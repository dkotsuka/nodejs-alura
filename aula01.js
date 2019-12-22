const http = require('http')

const servidor = http.createServer((req, res) => {
    res.end(`
    <html>
        <head>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Casa do código</h1>
        </body>
    </hmtl>
    `)
})
console.log("Servidor rodando na porta 3000")
servidor.listen(3000)

