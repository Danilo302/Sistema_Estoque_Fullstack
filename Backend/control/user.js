import {db} from "../db.js"

export const getAll = async (_,res) => {
    const q = "SELECT * FROM estoque";

    await db.query(q,(err,dados) => {
        if (err) return res.json(err);

        return res.status(200).json(dados);
    });
}