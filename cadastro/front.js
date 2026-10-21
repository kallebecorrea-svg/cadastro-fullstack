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
            if (!res.ok) throw new Error("Não foi possível carregar os clientes")

            const dados = await res.json()
            msg.replaceChildren()
            msg.className = "listagem"

            const titulo = document.createElement("h2")
            titulo.textContent = "Clientes cadastrados"
            msg.appendChild(titulo)

            if (dados.length === 0) {
                const vazio = document.createElement("p")
                vazio.textContent = "Nenhum cliente cadastrado ainda."
                msg.appendChild(vazio)
                return
            }

            const lista = document.createElement("ul")
            lista.className = "lista-clientes"

            dados.forEach((cliente) => {
                const item = document.createElement("li")
                item.className = "cliente-item"

                const id = document.createElement("span")
                id.className = "cliente-id"
                id.textContent = `#${cliente.cod_cli}`

                const nome = document.createElement("span")
                nome.className = "cliente-nome"
                nome.textContent = `${cliente.nome} ${cliente.sobrenome ?? ""}`.trim()

                item.append(id, nome)
                lista.appendChild(item)
            })

            msg.appendChild(lista)
        } catch (error){
            msg.textContent = "Erro de conexão"
            msg.className = "erro"
            msg.style.color = "red"
            alert(error)
        }
    }
)
