// edit_jogos.js - atualizado para usar API REST em vez de localStorage

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editGameForm");
    const id = localStorage.getItem("editJogoId");

    if (!id) {
        alert("Jogo não encontrado para edição.");
        window.location.href = "jogos_listados.html";
        return;
    }

    fetch(`http://localhost:8080/jogos/${id}`)
        .then(res => res.json())
        .then(jogo => {
            document.getElementById("gameName").value = jogo.name;
            document.getElementById("gameGenre").value = jogo.genre;
            document.getElementById("releaseDate").value = jogo.releaseDate;
            document.getElementById("gameProducer").value = jogo.producer;
            document.getElementById("gameImage").value = jogo.image || "";
        })
        .catch(() => {
            alert("Erro ao carregar jogo para edição.");
            window.location.href = "jogos_listados.html";
        });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const jogoAtualizado = {
            name: document.getElementById("gameName").value,
            genre: document.getElementById("gameGenre").value,
            releaseDate: document.getElementById("releaseDate").value,
            producer: document.getElementById("gameProducer").value,
            image: document.getElementById("gameImage").value || ""
        };

        fetch(`http://localhost:8080/jogos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jogoAtualizado)
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao atualizar jogo");
                alert("Jogo atualizado com sucesso!");
                localStorage.removeItem("editJogoId");
                window.location.href = "jogos_listados.html";
            })
            .catch(error => {
                console.error("Erro ao atualizar:", error);
                alert("Erro ao atualizar o jogo.");
            });
    });
});