document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();

    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault();
     
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
     
        const novoUsuario = { name, email, password };
     
        fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUsuario)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao cadastrar");
            alert("Usuário cadastrado com sucesso!");
            document.getElementById("cadastroForm").reset();
            carregarUsuarios(); // atualiza a lista sem sair da página
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar usuário.");
        });
    });
});

function carregarUsuarios() {
    fetch("http://localhost:8080/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            const lista = document.getElementById("usuariosLista");
            lista.innerHTML = "";

            usuarios.forEach(usuario => adicionarUsuarioNaLista(usuario));
        });
}

function adicionarUsuarioNaLista(usuario) {
    const lista = document.getElementById("usuariosLista");
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.innerHTML = `
        <strong>Nome:</strong> ${usuario.name}<br>
        <strong>Email:</strong> ${usuario.email}<br>
        <strong>Senha:</strong> ${usuario.password}<br>
    `;
    lista.appendChild(item);
}
