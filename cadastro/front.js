const form = document.getElementById("formCliente");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const cliente = {
        nome : document.getElementById("nome").value,

        sobrenome : document.getElementById("sobrenome").value,

        email : document.getElementById("email").value,

        telefone : document.getElementById("telefone").value
    };

    try{
        const response = await fetch("http://localhost:3000/clientes", {
            method: "POST", 
            headers: {"content-type": "application/json"},
            body: JSON.stringify(cliente)
        });
        if(response.status === 201){
            msg.textContent = "Cliente cadastrado com sucesso!";
            msg.style.color = "green";
            form.reset();
        } else{
            msg.textContent = "Erro ao cadastrar cliente!";
            msg.style.color = "red";
        };
    } catch(err){
            msg.textContent = "Erro de conexão com o Servidor!";
            msg.style.color = "red";
            alert(err);
    }
});

//LISTAR CLIENTES

document.getElementById("listarClientes").addEventListener("click",
    async() => {
        try{
            const res = await fetch("http://localhost:3000/clientes")
            const dados = await res.json()
            const nomes = dados.map((c) => `(${c.cod_cli} ${c.nome})`).join(", ")
            msg.textContent = `${nomes}`
            msg.style.color = "blue"
        } catch (error){
            msg.textContent = "Erro de conexão"
            msg.style.color = "red"
            alert(err)
        }
    }
)
