import { Pool } from "pg";

export async function connect() {

    if(global.connection){ //Singleton
        return global.connection.connect()
    }

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
    })

    const client = await pool.connect()
    console.log("Criou o Pool de Conexão")

    const res = await client.query("SELECT NOW()")
    console.log(res.rows[0])
    client.release() //Libera a conexão

    global.connection = pool // Guarda numa área global da aplicação
    return pool.connect()
}

export async function selectClientes(){
    const client = await connect()
    const res = await client.query("SELECT * FROM CLIENTE")
    return res.rows
}

export async function insertCliente(cliente){
    const client = await connect()
    await client.query("INSERT INTO CLIENTE " +
    "(NOME, SOBRENOME, EMAIL, TELEFONE) " +
    "VALUES($1, $2, $3, $4)", [cliente.nome, 
    cliente.sobrenome, cliente.email, cliente.telefone]
)}

connect()
