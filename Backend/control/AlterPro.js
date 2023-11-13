import { db } from "../db.js";

export const AlterPro = async (req, res) => {
    const produto = req.body;
    const {id, nome_produto, quantidade, preco } = produto;
  
    const q = 'UPDATE estoque SET nome_produto = ?, quantidade = ?, preco = ? WHERE id = ?';
  
    try {
      const result = await db.query(q, [nome_produto,quantidade , preco, id]);
      //const delProduto = result.rows; // Assumindo que os resultados estão em result.rows
  
      return res.status(201).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao alterar produto.' });
    }
  };