function buscarEndereco() {
    const cep = document.getElementById("ceptxt").value;

    if (!cep || cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("CEP não encontrado.");
            }
            return response.json();
        })
        .then((data) => {
            preencherFormulario(data);
        })
        .catch((error) => {
            alert("Erro ao buscar o CEP: " + error.message);
        });
}

function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.street || "";
    document.getElementById("bairro").value = endereco.neighborhood || "";
    document.getElementById("cidade").value = endereco.city || "";
    document.getElementById("estado").value = endereco.state || "Selecione";
}



        
