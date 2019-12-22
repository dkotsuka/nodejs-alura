const app = require('./src/config/custom-express')

app.listen(3000, 'localhost', () => {
    console.log("Servidor iniciado na porta 3000")
})