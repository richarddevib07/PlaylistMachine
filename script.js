const produtos = [
    {
        codigo: "MP01",
        nome: "MPB",
        genero: "Música Popular Brasileira",
        capa: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
        spotify: "https://open.spotify.com/search/MPB/playlists"
    },
    {
        codigo: "LF02",
        nome: "Lo-Fi",
        genero: "Relaxamento e estudos",
        capa: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
        spotify: "https://open.spotify.com/search/lofi/playlists"
    },
    {
        codigo: "CL03",
        nome: "Clássica",
        genero: "Música clássica",
        capa: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400",
        spotify: "https://open.spotify.com/search/musica%20classica/playlists"
    },
    {
        codigo: "FK04",
        nome: "Funk",
        genero: "Funk brasileiro",
        capa: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
        spotify: "https://open.spotify.com/search/funk%20brasileiro/playlists"
    },
    {
        codigo: "GP05",
        nome: "Gospel",
        genero: "Louvor e adoração",
        capa: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400",
        spotify: "https://open.spotify.com/search/gospel/playlists"
    },
    {
        codigo: "PK06",
        nome: "Punk",
        genero: "Punk rock",
        capa: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400",
        spotify: "https://open.spotify.com/search/punk%20rock/playlists"
    },
    {
        codigo: "MT07",
        nome: "Metal",
        genero: "Heavy metal",
        capa: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400",
        spotify: "https://open.spotify.com/search/heavy%20metal/playlists"
    },
    {
        codigo: "RK08",
        nome: "Rock",
        genero: "Rock internacional",
        capa: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
        spotify: "https://open.spotify.com/search/rock/playlists"
    },
    {
        codigo: "IN09",
        nome: "Indie",
        genero: "Indie alternativo",
        capa: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
        spotify: "https://open.spotify.com/search/indie/playlists"
    }
];


const vitrine = document.getElementById("produtos");
const codigoInput = document.getElementById("codigo");

const displayText = document.getElementById("displayText");
const displayStatus = document.getElementById("displayStatus");

const erro = document.getElementById("erro");
const compartimento = document.getElementById("compartimento");

let produtoSelecionado = null;


function carregarProdutos() {

    vitrine.innerHTML = "";

    produtos.forEach(produto => {

        const card = document.createElement("div");

        card.className = "produto";

        card.innerHTML = `
            <img src="${produto.capa}" alt="Capa de ${produto.nome}">

            <h3>${produto.nome}</h3>

            <span class="codigo-produto">
                ${produto.codigo}
            </span>

            <p class="genero">
                ${produto.genero}
            </p>
        `;

        // VITRINE SOMENTE PARA VISUALIZAÇÃO
        vitrine.appendChild(card);
    });

    document.getElementById("contador").textContent =
        `${produtos.length} PRODUTOS`;
}

// SELECIONAR PRODUTO PELO CÓDIGO
function selecionarProduto(produto) {

    produtoSelecionado = produto;

    displayText.textContent = produto.codigo;

    displayStatus.textContent = "CÓDIGO CONFIRMADO";

    erro.textContent = "";

}

function confirmarCodigo() {

    const codigo = codigoInput.value.trim().toUpperCase();

    const produto = produtos.find(
        item => item.codigo === codigo
    );

    if (!produto) {

        produtoSelecionado = null;

        erro.textContent = "Código inválido. Tente novamente.";

        displayText.textContent = "ERRO 404";

        displayStatus.textContent = "PRODUTO NÃO ENCONTRADO";

        compartimento.innerHTML = `
            <div class="porta">
                <span>♫</span>
                <p>RETIRE SUA PLAYLIST</p>
            </div>
        `;

        document.getElementById("ledRetirada").style.background = "#32e69a";

        return;
    }

    selecionarProduto(produto);

    liberarPremio();

}


function liberarPremio() {

    if (!produtoSelecionado) {

        erro.textContent = "Digite um código válido.";

        return;
    }

    const produto = produtoSelecionado;

    displayText.textContent = "LIBERANDO...";

    displayStatus.textContent = "AGUARDE SEU PRÊMIO";

    compartimento.innerHTML = `
        <div class="premio">

            <img src="${produto.capa}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <a
                href="${produto.spotify}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ♫ OUVIR NO SPOTIFY
            </a>

        </div>
    `;

    document.getElementById("ledRetirada").style.background = "#00aaff";

    displayText.textContent = "PRÊMIO LIBERADO!";

    displayStatus.textContent = produto.nome.toUpperCase();

}


document.getElementById("confirmar").addEventListener(
    "click",
    confirmarCodigo
);


codigoInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        confirmarCodigo();
    }

});


document.querySelectorAll("[data-num]").forEach(botao => {

    botao.addEventListener("click", () => {

        codigoInput.value += botao.dataset.num;

        codigoInput.focus();

    });

});


document.getElementById("limpar").addEventListener("click", () => {

    codigoInput.value = "";

    erro.textContent = "";

    produtoSelecionado = null;

    displayText.textContent = "AGUARDANDO...";

    displayStatus.textContent = "INSIRA UM CÓDIGO";

});


document.getElementById("apagar").addEventListener("click", () => {

    codigoInput.value = codigoInput.value.slice(0, -1);

    codigoInput.focus();

});


carregarProdutos();
