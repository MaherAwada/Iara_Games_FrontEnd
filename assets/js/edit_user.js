document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();

    document.getElementById("editarForm").addEventListener("submit", function (event) {
        event.preventDefault();
        salvarEdicao();
    });
});

function carregarUsuarios() {
    fetch("http://localhost:8080/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            const lista = document.getElementById("usuariosLista");
            lista.innerHTML = "";

            usuarios.forEach(usuario => {
                const item = document.createElement("li");
                item.classList.add("list-group-item");
                item.innerHTML = `
                    <p><strong>Nome:</strong> ${usuario.name}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Senha:</strong> ${usuario.password}</p>
                    <button class="btn btn-warning btn-sm" onclick='preencherFormulario(${JSON.stringify(usuario)})'>Editar</button>
                    <button class="btn btn-danger btn-sm" onclick='deletarUsuario(${usuario.id})'>Excluir</button>
                `;
                lista.appendChild(item);
            });
        });
}

function preencherFormulario(usuario) {
    document.getElementById("editUserName").value = usuario.name;
    document.getElementById("editUserEmail").value = usuario.email;
    document.getElementById("editUserPassword").value = usuario.password;
    document.getElementById("editarForm").setAttribute("data-id", usuario.id);
}

function salvarEdicao() {
    const id = document.getElementById("editarForm").getAttribute("data-id");

    const userAtualizado = {
        name: document.getElementById("editUserName").value,
        email: document.getElementById("editUserEmail").value,
        password: document.getElementById("editUserPassword").value
    };

    fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAtualizado)
    })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao atualizar");
            alert("Usuário atualizado com sucesso!");
            document.getElementById("editarForm").reset();
            document.getElementById("editarForm").removeAttribute("data-id");
            carregarUsuarios();
        })
        .catch(error => {
            console.error("Erro ao atualizar:", error);
        });
}

function deletarUsuario(id) {
    fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao deletar");
            carregarUsuarios();
        })
        .catch(error => {
            console.error("Erro ao deletar:", error);
        });
}
