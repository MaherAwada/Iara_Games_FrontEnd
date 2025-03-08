document.addEventListener("DOMContentLoaded", function() {
    carregarUsuarios();
});

function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const lista = document.getElementById('usuariosLista');
    lista.innerHTML = '';

    if (usuarios.length === 0) {
        lista.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
        return;
    }

    usuarios.forEach((usuario, index) => {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Senha:</strong> ${usuario.senha}</p>
            <button class="btn btn-warning btn-sm" onclick="preencherFormulario(${index})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarUsuario(${index})">Deletar</button>
        `;
        lista.appendChild(item);
    });
}

function preencherFormulario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    document.getElementById('nome').value = usuarios[index].nome;
    document.getElementById('email').value = usuarios[index].email;
    document.getElementById('senha').value = usuarios[index].senha;
    document.getElementById('editarForm').setAttribute('data-index', index);
}

function salvarEdicao() {
    const index = document.getElementById('editarForm').getAttribute('data-index');
    if (index === null) return alert("Selecione um usuário para editar.");
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios[index] = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
    document.getElementById('editarForm').reset();
    document.getElementById('editarForm').removeAttribute('data-index'); 
    alert("Usuário atualizado com sucesso!");
}

function deletarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
}