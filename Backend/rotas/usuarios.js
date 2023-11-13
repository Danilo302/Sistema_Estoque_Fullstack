import express from "express"
import {getAll} from "../control/user.js"
import { addPro } from "../control/addPro.js"
import { delPro } from "../control/DelPro.js"
import { AlterPro } from "../control/AlterPro.js"

const rota = express.Router()

rota.get("/",getAll)
rota.post("/",addPro)
rota.delete("/:id",delPro)
rota.put("/:id",AlterPro)

export default rota