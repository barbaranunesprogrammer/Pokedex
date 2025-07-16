# 📖 Pokédex

Este é um projeto de uma Pokédex simples, desenvolvido com HTML, CSS e JavaScript puro. A aplicação consome a [PokéAPI](https://pokeapi.co/) para exibir uma lista de Pokémon e seus detalhes. Este projeto foi criado como parte do bootcamp de JavaScript da [Digital Innovation One](https://www.dio.me/).

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://via.placeholder.com/400x300.png?text=Página+Principal" alt="Página Principal da Pokédex"></td>
    <td><img src="https://via.placeholder.com/400x300.png?text=Página+de+Detalhes" alt="Página de Detalhes do Pokémon"></td>
  </tr>
  <tr>
    <td align="center">Página Principal</td>
    <td align="center">Página de Detalhes</td>
  </tr>
</table>

**Observação:** Substitua as URLs das imagens acima por capturas de tela reais do seu projeto para uma melhor apresentação.

## ✨ Funcionalidades

- **Listagem de Pokémon:** Exibe uma lista inicial de Pokémon.
- **Carregar Mais:** Um botão "Load More" permite carregar mais Pokémon na lista de forma paginada.
- **Página de Detalhes:** Ao clicar em um Pokémon, o usuário é redirecionado para uma página com informações detalhadas, incluindo:
  - Imagem Oficial
  - Altura e Peso
  - Habilidades
  - Lista de Movimentos
  - Tipos
  - Experiência Base
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **API:** [PokéAPI (v2)](https://pokeapi.co/)

## 🚀 Como Executar o Projeto

Como este é um projeto front-end estático, não há necessidade de instalar dependências.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/barbaranunesprogrammer/Pokedex.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd seu-repositorio-pokedex
    ```
3.  **Abra o arquivo `index.html` no seu navegador de preferência.**

E pronto! A Pokédex estará funcionando localmente.

## 📂 Estrutura do Projeto

```
pokedex/
├── assets/
│   ├── css/      # Arquivos de estilo
│   └── js/       # Scripts da aplicação
│       ├── main.js             # Lógica da página principal (listagem e botão)
│       ├── poke.js             # Lógica da página de detalhes do Pokémon
│       ├── poke-api.js         # Módulo para fazer as requisições à PokéAPI
│       └── pokemon-models.js   # Modelo de classe `Pokemon`
├── index.html                  # Página principal (listagem)
└── pokedex.html                # Página de detalhes
```

## 📄 Licença

Este projeto está sob a licença ISC.