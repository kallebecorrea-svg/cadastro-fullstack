import 'dotenv/config'
import * as db from "./db.js"
import express from "express"
import cors from 'cors'

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors());

app.get("/clientes", async (req, res) => {
    const clientes = await db.selectClientes()
    res.json(clientes)
})

app.post("/clientes", async (req, res)=>{
    await db.insertCliente(req.body)
    res.sendStatus(201)
})

app.listen(port);
console.log("Backend rodando!")