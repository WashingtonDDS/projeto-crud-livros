const url = "http://localhost:3000/livros";
const ulElemento = document.querySelector("#filmes");
const elementoInputTitle = document.querySelector("input[name='titulo']");

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
  ulElemento.appendChild(li);
};

const cadastrarFilme = async (event) => {
  event.preventDefault();
  const resposta = await axios.post(url, {
    titulo: elementoInputTitle.value,
  });
  console.log(resposta);
};
