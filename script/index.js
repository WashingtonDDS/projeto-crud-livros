const url = "http://localhost:3000/livros";
const ulElemento = document.querySelector("#filmes");

const listarLivros = async () => {
  const resposta = await axios.get(url);
  resposta.data.forEach((filme) => {
    criarFilme(filme);
  });
};

const criarLiFilme = (filme) => {
  const li = document.createElement("li");
  li.textContent = filme.titulo;
  ulElemento.appendChild(li);
};
listarLivros();
