const url = "http://localhost:3000/livros";
const ulElemento = document.querySelector("#filmes");
const elementoInputTitle = document.querySelector("input[name='titulo']");
const elementoBotaoAlterar = document.querySelector(".botao-alterar");
const elementoBotaoCadastra = document.querySelector(".botao-cadastrar");
let idSelecionado = null;

const listarLivros = async () => {
  const resposta = await axios.get(url);
  resposta.data.forEach((filme) => {
    criarLiFilme(filme);
  });
};

listarLivros();

const criarLiFilme = (filme) => {
  const li = document.createElement("li");
  const botaoExcluir = document.createElement("button");
  const spanTitulo = document.createElement("span");

  botaoExcluir.textContent = "Excluir";
  selecionarFilmeParaExcluir(botaoExcluir);

  spanTitulo.textContent = filme.titulo;
  li.appendChild(spanTitulo);
  li.appendChild(botaoExcluir);
  li.id = filme.id;
  selecionarFilme(li);

  ulElemento.appendChild(li);
};

const selecionarFilmeParaExcluir = (botaoExcluir) => {
  botaoExcluir.addEventListener("click", (event) => {
    event.stopPropagation();
    const idFilme = event.target.parentElement.id;
    deletarFilme(idFilme);
  });
};

const selecionarFilme = async (li) => {
  li.addEventListener("click", (event) => {
    const elemento = event.target;

    if (elemento.nodeName === "LI") {
      const spanTitulo = elemento.querySelector("span");
      elementoInputTitle.value = spanTitulo.textContent;
      idSelecionado = elemento.id;
    } else if (elemento.nodeName === "SPAN") {
      elementoInputTitle.value = event.target.textContent;
      idSelecionado = elemento.parentElement.id;
    } else {
      return;
    }

    elementoBotaoAlterar.disabled = false;
    elementoBotaoCadastra.disabled = "disabled";
  });
};

const cadastrarFilme = async (event) => {
  event.preventDefault();
  const resposta = await axios.post(url, {
    titulo: elementoInputTitle.value,
  });
};

const alterarFilme = async (event) => {
  if (!idSelecionado) {
    return;
  }
  const resposta = await axios.put(`${url}/${idSelecionado}`, {
    titulo: elementoInputTitle.value,
  });
};

const deletarFilme = async (idFilme) => {
  if (!idFilme) {
    return;
  }
  const resposta = await axios.delete(`${url}/${idFilme}`);
};
