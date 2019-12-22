class LivrosDao {
    constructor(db){
        this._db = db
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) valores (?,?,?)`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (error) => {
                    if(error) {
                        console.log(error)
                        return reject('Não foi possível adicionar dados livro ao banco de dados.')
                    }
                }
            )
        })
    }

    lista(){
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (error, results) => {
                    if(error) reject('Não foi possível recuperar dados dos livros.')
                    resolve(results)
                }
            )
        })
    }
}

module.exports = LivrosDao