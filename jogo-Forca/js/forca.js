let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;
let senha = "1@#$4";


carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length)

    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] == undefined) {
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else {
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }
        else {
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
        }
    }
}

function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla, condicao) {
    if (condicao == false) {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else {
        document.getElementById(tecla).style.background = "#80f205";
        document.getElementById(tecla).style.color = "#ffffff";
    }


}

function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra)
    if (pos < 0) {
        tentativas--
        carregaImagemForca();

        if (tentativas == 0) {
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else {
        mudarStyleLetra("tecla-" + letra, true);
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] == letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] != listaDinamica[i]) {
            vitoria = false;
        }
    }

    if (vitoria == true) {

        abreModal("PARABÉNS!", "A senha para o proximo nivel é:   A#CYU",)
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo) {
    return new Promise(x => setTimeout(x, tempo))
}

function carregaImagemForca() {
    switch (tentativas) {
        case 5:
            document.getElementById("imagem").style.background = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem) {
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function () {
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica() { // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if (jogoAutomatico == false) { // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";

    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function () {
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function () {
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

window.onclick = function () {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";
    }
}

function carregaListaAutomatica() {
    palavras = [
        palavra001 = {
            nome: "IRLANDA",
            categoria: "LUGARES"
        },
        palavra002 = {
            nome: "EQUADOR",
            categoria: "LUGARES"
        },
        palavra003 = {
            nome: "CHILE",
            categoria: "LUGARES"
        },
        palavra004 = {
            nome: "INDONESIA",
            categoria: "LUGARES"
        },
        palavra005 = {
            nome: "SAARA",
            categoria: "LUGARES"
        },
        palavra006 = {
            nome: "INGLATERRA",
            categoria: "LUGARES"
        },
        palavra007 = {
            nome: "NORUEGA",
            categoria: "LUGARES"
        },
        palavra008 = {
            nome: "VIETNA",
            categoria: "LUGARES"
        },
        palavra009 = {
            nome: "HAITI",
            categoria: "LUGARES"
        },
        palavra010 = {
            nome: "CROACIA",
            categoria: "LUGARES"
        },
        palavra011 = {
            nome: "JAVA",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra012 = {
            nome: "PYTHON",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra013 = {
            nome: "JAVASCRIPT",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra014 = {
            nome: "FUNCAO",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra015 = {
            nome: "COMPUTADOR",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra016 = {
            nome: "INTERNET",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra017 = {
            nome: "REDE",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra018 = {
            nome: "SOFTWARE",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra019 = {
            nome: "HARDWARE",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra020 = {
            nome: "CLOUD",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra021 = {
            nome: "DADOS",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra022 = {
            nome: "SEGURANCA",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra023 = {
            nome: "INOVACAO",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra024 = {
            nome: "VARIAVEL",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra025 = {
            nome: "FUNCAO",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra026 = {
            nome: "CLASSE",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra027 = {
            nome: "EVENTO",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra028 = {
            nome: "LOOP",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra029 = {
            nome: "OBJETO",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra030 = {
            nome: "ARRAY",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra031 = {
            nome: "SCRIPT",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra032 = {
            nome: "JAVASCRIPT",
            categoria: "TECNOLOGIA E PROGRAMAÇÃO"
        },
        palavra033 = {
            nome: "ESFIRRA",
            categoria: "ALIMENTOS"
        },
        palavra034 = {
            nome: "GOROROBA",
            categoria: "ALIMENTOS"
        },
        palavra035 = {
            nome: "PAO",
            categoria: "ALIMENTOS"
        },
        palavra036 = {
            nome: "SOPA",
            categoria: "ALIMENTOS"
        },
        palavra037 = {
            nome: "FEIJOADA",
            categoria: "ALIMENTOS"
        },
        palavra038 = {
            nome: "LASANHA",
            categoria: "ALIMENTOS"
        },
        palavra039 = {
            nome: "MIOJO",
            categoria: "ALIMENTOS"
        },
        palavra040 = {
            nome: "BRIGADEIRO",
            categoria: "ALIMENTOS"
        },
        palavra040 = {
            nome: "MACACO",
            categoria: "ANIMAIS"
        },
        palavra041 = {
            nome: "GALINHA",
            categoria: "ANIMAIS"
        },
        palavra042 = {
            nome: "PAVAO",
            categoria: "ANIMAIS"
        },
        palavra043 = {
            nome: "CAMELO",
            categoria: "ANIMAIS"
        },
        palavra044 = {
            nome: "PERU",
            categoria: "ANIMAIS"
        },
        palavra045 = {
            nome: "ZEBRA",
            categoria: "ANIMAIS"
        },
        palavra046 = {
            nome: "DROMEDARIO",
            categoria: "ANIMAIS"
        },
        palavra047 = {
            nome: "CALOPSITA",
            categoria: "ANIMAIS"
        },
        palavra048 = {
            nome: "SAGUI",
            categoria: "ANIMAIS"
        },
        palavra049 = {
            nome: "LAGARTIXA",
            categoria: "ANIMAIS"
        },
        palavra050 = {
            nome: "HIPOPOTAMO",
            categoria: "ANIMAIS"
        }
    ];
}

function adicionarPalavra() {
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO", " Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);
    sortear();

    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input) {
    return !input || !input.trim();
}

function sortear() {
    if (jogoAutomatico == true) {
        location.reload();
    }
    else {
        if (palavras.length > 0) {
            listaDinamica = [];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas() {
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) => {
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar) {
    if (querJogar) {
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else {
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


