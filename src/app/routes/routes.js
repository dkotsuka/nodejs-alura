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

    app.get('/livros/form/:id', (req, res) => {
        const id = req.params.id
        const livroDao = new LivroDao(db)

        livroDao.buscaPorId(id)
            .then((livro) => {
                res.marko(require('../views/livros/form/form.marko'),
                {
                    livro
                })
            })
            .catch( error =>  console.log(error))
    })

    app.get('/livros/form', (req, res) => {
        res.marko(require('../views/livros/form/form.marko'), {livro: {}})
    })

    app.post('/livros', (req, res) => {
        console.log(req.body)
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(error => console.log(error))
    })

    app.put('/livros', (req, res) => {
        console.log(req.body)
        const livroDao = new LivroDao(db)
        livroDao.atualiza(req.body)
            .then(res.redirect('/livros'))
            .catch(error => console.log(error))
    })

    app.get('/livro/:id', (req, res) => {
        console.log(req.params)
        const livroDao = new LivroDao(db)
        livroDao.buscaPorId(req.params.id)
            .then((livros) => {
                console.log("livros", livros)
            })
    })

    app.delete('/livros/:id', (req, res) => {
        const livroDao = new LivroDao(db)
        livroDao.remove(req.params.id)
            .then(res.status(200).end())
            .catch(error => console.log(error))
    })
}