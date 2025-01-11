```markdown
# Projeto de Cadastro de Filmes

Este projeto é uma aplicação web simples para cadastrar, listar, alterar e excluir filmes. Ele utiliza HTML, CSS e JavaScript, juntamente com a biblioteca Axios para fazer requisições HTTP.

## Estrutura do Projeto
```

.vscode/
settings.json

db.json

index.html

README.md

script/
index.js

````

### Arquivos

- **.vscode/settings.json**: Configurações do Visual Studio Code para o servidor ao vivo.
- **db.json**: Banco de dados simulado com uma lista de filmes.
- **index.html**: Página HTML principal da aplicação.
- **README.md**: Documentação do projeto.
- **script/index.js**: Script JavaScript que contém a lógica da aplicação.

## [`index.html`](index.html )

Este arquivo contém a estrutura HTML da aplicação. Ele inclui um formulário para cadastrar filmes, uma lista para exibir os filmes cadastrados e botões para cadastrar e alterar filmes.

### Estrutura

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Livros</title>
    <style>
      li {
        padding: 8px;
      }
      li button {
        margin-left: 16px;
      }
    </style>
  </head>
  <body>
    <h1>Filmes</h1>
    <form onsubmit="cadastrarFilme(event)">
      <input type="text" name="titulo" />
      <button class="botao-cadastrar">Cadastrar</button>
      <button
        type="button"
        onclick="alterarFilme()"
        class="botao-alterar"
        disabled="disabled"
      >
        Alterar
      </button>
    </form>
    <ul id="filmes"></ul>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="./script/index.js"></script>
  </body>
</html>
````

## [`script/index.js`](script/index.js)

Este arquivo contém a lógica da aplicação, incluindo funções para listar, cadastrar, alterar e excluir filmes.

### Funções

- **listarLivros**: Faz uma requisição GET para listar todos os filmes.
- **criarLiFilme**: Cria um elemento `<li>` para cada filme na lista.
- **selecionarFilmeParaExcluir**: Adiciona um evento de clique para excluir um filme.
- **selecionarFilme**: Adiciona um evento de clique para selecionar um filme para alteração.
- **cadastrarFilme**: Faz uma requisição POST para cadastrar um novo filme.
- **alterarFilme**: Faz uma requisição PUT para alterar um filme existente.
- **deletarFilme**: Faz uma requisição DELETE para excluir um filme.

### Código

```js
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
```

## [`db.json`](db.json)

Este arquivo contém os dados dos filmes cadastrados.

### Estrutura

```json
{
  "livros": [
    {
      "titulo": "Maze Runner 3",
      "id": "96a2"
    },
    {
      "id": "3518",
      "titulo": "Asoka thano"
    },
    {
      "id": "c4c2",
      "titulo": "Harry Potter Pedra Filosofal"
    },
    {
      "id": "eefc",
      "titulo": "Jogos Vorazes"
    },
    {
      "id": "6cf7",
      "titulo": "Transformers"
    }
  ]
}
```

## [`.vscode/settings.json`](.vscode/settings.json)

Este arquivo contém as configurações do Visual Studio Code para o servidor ao vivo.

### Estrutura

```json
{
  "liveServer.settings.port": 5501
}
```

## Como Executar

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Instale o JSON Server globalmente:
   ```sh
   npm install -g json-server
   ```
3. Inicie o JSON Server:
   ```sh
   json-server --watch db.json --port 3000
   ```
4. Abra o arquivo [`index.html`](index.html) no seu navegador ou utilize a extensão Live Server do Visual Studio Code para iniciar um servidor ao vivo.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.
