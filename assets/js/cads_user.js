document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length >= 3) {
        alert("Limite de três usuários atingido.");
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    window.location.href = 'edit_user.html';
});