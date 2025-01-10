const url = "http://localhost:3000/livros";
const ulElemento = document.querySelector("#filmes");
const elementoInputTitle = document.querySelector("input[name='titulo']");
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
  li.textContent = filme.titulo;
  li.id = filme.id;
  selecionarFilme(li);

  ulElemento.appendChild(li);
};

const selecionarFilme = async (li) => {
  li.addEventListener("click", (event) => {
    idSelecionado = event.target.id;
    elementoInputTitle.value = event.target.textContent;
    console.log(idSelecionado);
  });
};

const cadastrarFilme = async (event) => {
  event.preventDefault();
  const resposta = await axios.post(url, {
    titulo: elementoInputTitle.value,
  });
  console.log(resposta);
};

const alterarFilme = async (event) => {
  if (!idSelecionado) {
    return;
  }
  const resposta = await axios.put(`${url}/${idSelecionado}`, {
    titulo: elementoInputTitle.value,
  });
};
