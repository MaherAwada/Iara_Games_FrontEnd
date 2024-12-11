

function buscarEndereco() {

    var cep = document.getElementById("ceptxt").value; 

    var url = "https://brasilapi.com.br/api/cep/v2/" + cep;

    fetch(url)
        .then(res => res.json()) 
        .then(res => {
            montarResultado(res);
        })
} 

function montarResultado (objetoEndereco){

    var dados = "<dados>";
    
    dados += "nome" + objetoEndereco.street;
    dados += "bairro" + objetoEndereco.neighborhood;
    dados += "cidade" + objetoEndereco.city;
    
    dados += "</dados>";

    document.getElementById("dados").innerHTML = dados;

}


        
