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
                ) values (?,?,?)`,
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
            resolve()
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

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM livros WHERE id = ?`, [id],
            (error, livro) => {
                if(error) return reject('Não foi possível recuperar dados dos livros.')
                resolve(livro)
            })
        })
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros
                SET titulo = ?,
                    preco = ?,
                    descricao = ?
                WHERE id = ?
            `, [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ], (error) => {
                if(error) {
                    console.log(error)
                    return reject('Não foi possível atualizar dados livro ao banco de dados.')
                }
                return resolve()
            })
        })
    }

    remove(id) {
        console.log(id)
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`, [id], (error) => {
                if(error) {
                    console.log(error)
                    return reject('Não foi possível adicionar dados livro ao banco de dados.')
                }
                resolve()
            })
        })
    }
}

module.exports = LivrosDao