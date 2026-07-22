// ==========================
// CARRINHO MONALU
// ==========================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContador() {
    const contador = document.getElementById("cartCount");

    if (contador) {
        contador.textContent = carrinho.reduce((t, p) => t + p.quantidade, 0);
    }
}

function adicionarAoCarrinho(id, event){

    const produto = PRODUTOS.find(p => p.id === id);

    if(!produto) return;

    let tamanho = "";

    if(produto.tamanhos){

        const select = document.getElementById("tam-"+id);

        tamanho = select.value;

        if(!tamanho){

            alert("Escolha um tamanho.");

            return;

        }

    }

    const existente = carrinho.find(item =>
        item.id===id &&
        item.tamanho===tamanho
    );

    if(existente){

        existente.quantidade++;

    }else{

        carrinho.push({

            ...produto,

            tamanho,

            quantidade:1

        });

    }

    salvarCarrinho();

    atualizarCarrinho();

    atualizarContador();
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");

cartIcon.classList.remove("cart-bounce");
void cartIcon.offsetWidth;
cartIcon.classList.add("cart-bounce");

cartCount.classList.remove("count-pop");
void cartCount.offsetWidth;
cartCount.classList.add("count-pop");

const botao = event.target;
const textoOriginal = botao.innerHTML;

botao.innerHTML = "✓ Adicionado";
botao.classList.add("success");

setTimeout(() => {
    botao.innerHTML = textoOriginal;
    botao.classList.remove("success");
}, 1000);
}
function removerProduto(id){

    carrinho = carrinho.filter(p=>p.id!==id);

    salvarCarrinho();

    atualizarContador();

    atualizarCarrinho();

}

function aumentarQtd(id){

    const item = carrinho.find(p=>p.id===id);

    if(!item) return;

    item.quantidade++;

    salvarCarrinho();

    atualizarCarrinho();

    atualizarContador();

}

function diminuirQtd(id){

    const item = carrinho.find(p=>p.id===id);

    if(!item) return;

    item.quantidade--;

    if(item.quantidade<=0){

        removerProduto(id);

        return;

    }

    salvarCarrinho();

    atualizarCarrinho();

    atualizarContador();

}
function atualizarCarrinho() {

    const lista = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");

    if (!lista || !total) return;

    lista.innerHTML = "";

    let soma = 0;

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p style="text-align:center;color:#999;margin-top:30px;">
                Seu carrinho está vazio.
            </p>
        `;

        total.textContent = "R$ 0,00";

        return;
    }

    carrinho.forEach(produto => {

        const valor = Number(
            produto.preco
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
        );

        soma += valor * produto.quantidade;

        lista.innerHTML += `
            <div class="cart-item">

                <img src="${produto.imagem}" class="cart-thumb">

                <div class="cart-info">

                    <strong>${produto.nome}</strong>
                    ${produto.tamanho ? `
                <div style="font-size:13px;color:#bbb;">
                        Tamanho: ${produto.tamanho}
                </div>
                ` : ""}

                    <div>${produto.preco}</div>

                    <div class="qtd">

                        <button onclick="diminuirQtd('${produto.id}')">−</button>

                        <span>${produto.quantidade}</span>

                        <button onclick="aumentarQtd('${produto.id}')">+</button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removerProduto('${produto.id}')">

                    🗑

                </button>

            </div>
        `;

    });

    total.textContent =
        "R$ " + soma.toFixed(2).replace(".", ",");

}
document.addEventListener("DOMContentLoaded", () => {

    atualizarContador();

    atualizarCarrinho();

    const btn = document.getElementById("checkoutBtn");

    if(btn){

        btn.addEventListener("click", finalizarPedido);

    }

});
function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    let mensagem = "🛒 *Novo Pedido - MonaLu Modas*%0A%0A";

    let total = 0;

    carrinho.forEach(produto => {

        const valor = Number(
            produto.preco
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
        );

        total += valor * produto.quantidade;

        mensagem += `• *${produto.nome}*%0A`;

        if (produto.tamanho) {
            mensagem += `Tamanho: ${produto.tamanho}%0A`;
        }

        mensagem += `Quantidade: ${produto.quantidade}%0A`;
        mensagem += `Preço: ${produto.preco}%0A%0A`;

    });

    mensagem += `💰 *Total:* R$ ${total.toFixed(2).replace(".", ",")}`;

    window.open(
        `https://wa.me/5511954880569?text=${mensagem}`,
        "_blank"
    );

}
const cartIcon = document.getElementById("cartIcon");

const cartPanel = document.getElementById("cartPanel");

const fecharCarrinho = document.getElementById("fecharCarrinho");

cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("open");
});

fecharCarrinho.addEventListener("click", () => {
    cartPanel.classList.remove("open");
});