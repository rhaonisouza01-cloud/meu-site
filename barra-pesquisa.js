let termoPesquisa = "";

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        termoPesquisa = this.value.toLowerCase().trim();

        renderProdutos();

    });

}

function produtoCorrespondePesquisa(produto){

    if(termoPesquisa === "") return true;

    return (
        (produto.nome || "").toLowerCase().includes(termoPesquisa) ||
        (produto.categoria || "").toLowerCase().includes(termoPesquisa) ||
        (produto.descricao || "").toLowerCase().includes(termoPesquisa) ||
        (produto.versiculo || "").toLowerCase().includes(termoPesquisa) ||
        (produto.badge || "").toLowerCase().includes(termoPesquisa)
    );

}