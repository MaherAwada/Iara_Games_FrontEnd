document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gameForm");
    const gameListContainer = document.getElementById("gameList");
    const successMessage = document.getElementById("successMessage");

    function registerGame(event) {
        event.preventDefault();

        const name = document.getElementById("gameName").value;
        const genre = document.getElementById("gameGenre").value;
        const releaseDate = document.getElementById("releaseDate").value;
        const producer = document.getElementById("gameProducer").value;

        const newGame = { name, genre, releaseDate, producer, image: "" };

        fetch("http://localhost:8080/jogos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao cadastrar jogo");
            return response.json();
        })
        .then(data => {
            successMessage.style.display = "block";
            setTimeout(() => successMessage.style.display = "none", 3000);
            form.reset();
            displayGames(); // atualiza a lista após cadastro
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar jogo.");
        });
    }

    function displayGames() {
        gameListContainer.innerHTML = "";

        fetch("http://localhost:8080/jogos")
            .then(response => response.json())
            .then(games => {
                if (games.length === 0) {
                    gameListContainer.innerHTML = "<p style='color: white;'>Nenhum jogo cadastrado ainda.</p>";
                    return;
                }

                games.forEach((game) => {
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
                        <button class="btn btn-warning btn-sm" onclick="editGame(${game.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteGame(${game.id})">Excluir</button>
                    `;

                    gameListContainer.appendChild(gameItem);
                });
            })
            .catch(error => {
                console.error("Erro ao buscar jogos:", error);
            });
    }

    window.deleteGame = function(id) {
        fetch(`http://localhost:8080/jogos/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao deletar jogo");
            displayGames();
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao deletar jogo.");
        });
    };

    if (form) form.addEventListener("submit", registerGame);
    if (gameListContainer) displayGames();
});

window.editGame = function(id) {
    localStorage.setItem("editGameId", id);
    window.location.href = "edit_jogo.html";
};
