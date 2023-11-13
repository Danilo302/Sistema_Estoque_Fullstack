import { db } from "../db.js";

export const addPro = async (req, res) => {
  const produto = req.body;
  const { nome_produto, quantidade, preco } = produto;

  const q = 'INSERT INTO estoque(nome_produto, quantidade, preco) VALUES (?,?,?)';

  try {
    const result = await db.query(q, [nome_produto,quantidade , preco]);
    const addproduto = result.rows; // Assumindo que os resultados estão em result.rows

    return res.status(201).json(addproduto);
  } catch (error) {
    console.error(error);
    console.log(nome)
    return res.status(500).json({ error: 'Erro ao adicionar produto.' });
  }
};
