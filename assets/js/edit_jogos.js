document.addEventListener("DOMContentLoaded", () => {
    const editForm = document.getElementById("editGameForm");
    const editIndex = localStorage.getItem("editIndex");

    if (editIndex === null) {
        window.location.href = "jogos_listados.html";
        return;
    }

    let games = JSON.parse(localStorage.getItem("games")) || [];
    let game = games[editIndex];

    document.getElementById("editGameName").value = game.name;
    document.getElementById("editGameGenre").value = game.genre;
    document.getElementById("editReleaseDate").value = game.releaseDate;
    document.getElementById("editGameProducer").value = game.producer;

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        game.name = document.getElementById("editGameName").value;
        game.genre = document.getElementById("editGameGenre").value;
        game.releaseDate = document.getElementById("editReleaseDate").value;
        game.producer = document.getElementById("editGameProducer").value;

        const fileInput = document.getElementById("gameImage");
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                game.image = e.target.result;
                games[editIndex] = game;
                localStorage.setItem("games", JSON.stringify(games));
                window.location.href = "jogos_listados.html";
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            games[editIndex] = game;
            localStorage.setItem("games", JSON.stringify(games));
            window.location.href = "jogos_listados.html";
        }
    });
});