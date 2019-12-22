const db = require('../../config/database')
const LivroDao = require('../infra/livros-dao')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.marko(
            require('../views/home/main/main.marko')
        )
    })
    
    app.get('/livros', (req, res) => {

        const livroDao = new LivroDao(db)
        livroDao.lista()
            .then((results) => {
                res.marko(
                    require('../views/livros/lista/lista.marko'),
                    { livros: results }
                )
            })
            .catch(error => console.log(error))
    })

    app.get('/livros/form', (req, res) => {
        res.marko(require('../views/livros/form/form.marko'))
    })

    app.post('/livros', (req, res) => {
        console.log(res.body)
        const livroDao = new LivroDao(db)
        livroDao.adiciona(res.body)
            .then(() => {})
            .catch(error => console.log(error))
    })
}