import { db } from "../db.js";

export const delPro = async (req, res) => {
    const produto = req.params;
    const { id} = produto;
  
    const q = 'DELETE FROM estoque WHERE id = ?';
  
    try {
      const result = await db.query(q, [id]);
      //const delProduto = result.rows; // Assumindo que os resultados estão em result.rows
  
      return res.status(201).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
  };