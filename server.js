import express from 'express';
import { produtosRoutes } from './routes/Produtos.js';
import pg from 'pg';
const { Pool } = pg;
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

server.use('/produtos', produtosRoutes);

const pool = new Pool({
  connectionString: 'postgres://illrvdok:DhtjweMPtrUQzv20cUTQjdZHuddEoz7l@motty.db.elephantsql.com/illrvdok',
});

pool.query(`
  CREATE TABLE IF NOT EXISTS Produtos (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    preco DECIMAL,
    dataDeCriacao DATE
  )`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log('Tabela criada!');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

export { server };
