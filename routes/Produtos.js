import {Router} from 'express'
import pg from 'pg'

const pool = new pg.Pool({
    connectionString: 'postgres://illrvdok:DhtjweMPtrUQzv20cUTQjdZHuddEoz7l@motty.db.elephantsql.com/illrvdok',
  })
  
  const produtosRoutes = Router();

  produtosRoutes.post('/', (req, res) => {
    const { nome, descricao, preco,dataDeCriacao } = req.body; 
  
    pool.query(
        'INSERT INTO produtos (nome, descricao, preco, dataDeCriacao) VALUES ($1, $2, $3 , $4)',
        [nome, descricao, preco, dataDeCriacao],
        (error, result) => {
          if (error) {
            console.error("Erro ao inserir produto:", error);
            res.status(500).json({ error: "Erro ao inserir produto." });
          } else {
            res.json({ message: 'Produto criado com sucesso!' });
          }
        }
      );
      
  });
  
  produtosRoutes.get('/', (req, res) => {
    pool.query('SELECT * FROM produtos', (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    });
  });
  
  produtosRoutes.get('/produtos/:id', async(req, res) => {
    try {
        const id = await req.context.models.id.findByPk(req.params.id);
        if (id) {
          res.send(id);
        } else {
          res.status(404).send({ error: "Id não encontrado." });
        }
      } catch (error) {
        console.error("Erro ao retornar o id:", error);
        res.status(500).send({ error: "Erro ao retornar o id." });
      }
    });



    produtosRoutes.put('/produtos/:id', async (req, res) => {
        const { nome, descricao, preco, dataDeCriacao } = req.body;
        const id = req.params.id;
    try{
        const id = await req.context.models.id.findByPk(req.params.id);

        if(!id){
            return res.status(404).json({ error: "Id não encontrado." });
        }   pool.query(
            'UPDATE produtos SET nome = $1, descricao = $2, preco = $3, dataDeCriacao = $4 WHERE id = $5',
            [nome, descricao, preco, dataDeCriacao, id],
            (error, result) => {
              if (error) {
                console.error("Erro ao atualizar produto:", error);
                res.status(500).json({ error: "Erro ao atualizar produto." });
              } else {
                res.json({ message: 'Produto atualizado com sucesso!' });
              }
            }
          );
        } catch (error) {
          console.error("Erro ao atualizar produto:", error);
          res.status(500).json({ error: "Erro ao atualizar produto." });
        }
      });


  produtosRoutes.delete('/produtos/:id', async (req, res) => {
    try {
        const result = await req.context.models.id.destroy({
          where: { id: req.params.id }
          
        });
        res.json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {
        console.error("Erro ao deletar linha:", error);
        res.status(500).send({ error: "Erro ao deletar linha." });
      }
  
  });
          
  export { produtosRoutes};