const url = "https://localhost:8080/jogos"


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gameForm");
    const gameListContainer = document.getElementById("gameList");
    const consultButton = document.getElementById("consultButton");
    const successMessage = document.getElementById("successMessage");

    // Função para cadastrar um novo jogo
    function registerGame(event) {
        event.preventDefault(); // Evita o recarregamento da página

        const name = document.getElementById("gameName").value;
        const genre = document.getElementById("gameGenre").value;
        const releaseDate = document.getElementById("releaseDate").value;
        const producer = document.getElementById("gameProducer").value;

        const newGame = { name, genre, releaseDate, producer, image: "" };

        let games = JSON.parse(localStorage.getItem("games")) || [];
        games.push(newGame);
        localStorage.setItem("games", JSON.stringify(games));

        successMessage.style.display = "block";
        setTimeout(() => successMessage.style.display = "none", 3000);

        form.reset();
    }

    // Função para exibir os jogos na listagem
    function displayGames() {
        let games = JSON.parse(localStorage.getItem("games")) || [];
        gameListContainer.innerHTML = "";

        if (games.length === 0) {
            gameListContainer.innerHTML = "<p style='color: white;'>Nenhum jogo cadastrado ainda.</p>";
            return;
        }

        games.forEach((game, index) => {
            const gameItem = document.createElement("div");
            gameItem.classList.add("jogo-item");

            gameItem.innerHTML = `
    <div style="display: flex; align-items: center; gap: 15px;">
        ${game.image ? `<img src="${game.image}" width="100" style="border-radius: 8px;">` : ""}
        <div>
            <h3>${game.name}</h3>
            <p><strong>Gênero:</strong> ${game.genre}</p>
            <p><strong>Lançamento:</strong> ${game.releaseDate}</p>
            <p><strong>Produtora:</strong> ${game.producer}</p>
        </div>
    </div>
    <button class="btn btn-warning btn-sm" onclick="editGame(${index})">Editar</button>
    <button class="btn btn-danger btn-sm" onclick="deleteGame(${index})">Excluir</button>
`;

            gameListContainer.appendChild(gameItem);
        });
    }

    // Função para excluir um jogo
    window.deleteGame = function(index) {
        let games = JSON.parse(localStorage.getItem("games")) || [];
        games.splice(index, 1);
        localStorage.setItem("games", JSON.stringify(games));
        displayGames();
    };

    // Função para editar um jogo (leva para a página de edição)
    window.editGame = function(index) {
        localStorage.setItem("editIndex", index);
        window.location.href = "edit_jogos.html";
    };

    if (form) {
        form.addEventListener("submit", registerGame);
    }

    if (gameListContainer) {
        displayGames();
    }

    if (consultButton) {
        consultButton.addEventListener("click", () => {
            window.location.href = "jogos_listados.html";
        });
    }
});