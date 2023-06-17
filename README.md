<h1><br>
<p align="center">
Frameworks/Bibliotecas utilizadas
</p>
</h1>

`NextJs`</br>
O Next.js é um framework de código aberto, criado com React e permite o desenvolvimento de aplicações tanto front-end quanto back-end. O React é uma biblioteca Javascript para construção de interfaces e o Next é considerado um framework pois adiciona várias funcionalidades em cima do React. O Next.js por sua vez, busca reunir diversas funcionalidades a fim de manter o foco total em sua produtividade e eficiência. Totalmente pré-configurado, fornece toda estrutura para a criação de projetos com maior facilidade, trazendo para o desenvolvedor maior agilidade na criação de suas aplicações. Além disso, o Next.js permite que suas aplicações sejam renderizadas no lado do servidor (SSR), diminuindo o tempo de carregamento da aplicação, já que o esforço fica por conta do servidor, não do dispositivo do cliente, além de consumir menos recursos.

`Material-UI`</br>
Material Design é um sistema de design apoiado em código-fonte aberto que auxilia as equipes a criarem experiências digitais de alta qualidade padronizando todas as suas interfaces gráficas. o Material Design tem o princípio de ser simples, direto, chamativo, amigável e intuitivo, então cada elemento da interface deve se encaixar nessas características, além de ser muito bem documentada, ativamente mantida, com vários cases de sucesso, muito customizável, facilitando a criação de componentes com comportamentos padrões, como modals, formulários, além disso existe a possibilidade de customizar com CSS utilizando o padrão recomendado pela própria biblioteca.

`ESLint`</br>
É uma ferramenta de linting para código JavaScript que auxilia os desenvolvedores a identificar e corrigir problemas comuns no código-fonte. Ele analisa o código JavaScript em busca de padrões problemáticos, erros de sintaxe, práticas desencorajadas e outros problemas, fornecendo um feedback útil para melhorar a qualidade e a legibilidade do código, além de que é altamente configurável, permitindo que você personalize as regras de linting de acordo com as necessidades e preferências do seu projeto. Você pode especificar quais regras aplicar, quais regras ignorar, definir estilos de codificação, habilitar ou desabilitar plugins e muito mais. No geral, é uma ferramenta essencial para o desenvolvimento JavaScript, pois ajuda a melhorar a qualidade do código, evita erros comuns e promove boas práticas de programação.

`Eslint-plugin-import-helpers`</br>
É um plugin para o Eslint, uma ferramenta popular de linting de código JavaScript. Esse plugin específico fornece regras e funcionalidades extras relacionadas à importação de módulos e à organização de declarações de import. Com isso, você pode manter um padrão consistente nas importações do seu código, o que melhora a legibilidade e a manutenibilidade do mesmo. Ele oferece várias regras configuráveis para ajudar a evitar importações desorganizadas e garantir uma estrutura coerente nas declarações de import, além de que é uma ferramenta valiosa para equipes de desenvolvimento que desejam manter um código limpo e consistente. Ele ajuda a evitar problemas comuns relacionados à importação de módulos, promovendo boas práticas e padronização dentro do código JavaScript.

`Eslint-plugin-unused-imports`</br>
É um plugin para o Eslint, uma ferramenta popular de linting de código JavaScript. Esse plugin específico é projetado para ajudar a identificar e remover importações não utilizadas em seu código. Com ele você pode garantir que todas as importações em seu código sejam realmente usadas, evitando importações desnecessárias e reduzindo o tamanho do bundle do seu aplicativo, além de que você pode manter seu código mais limpo e livre de importações desnecessárias, o que contribui para uma melhor manutenibilidade e desempenho do seu aplicativo JavaScript.

`RTL React Testing Library`</br>
É uma biblioteca de testes para React que oferece uma abordagem user-centric (centrada no usuário) para testes de componentes. Ela é baseada na React Testing Library, mas com suporte e recursos adicionais para testar aplicativos que têm suporte a idiomas RTL (Right-to-Left). Essa biblioteca permite testar componentes React de forma mais realista, simulando a interação do usuário e verificando se o comportamento esperado está sendo exibido corretamente na interface do usuário. Com a RTL React Testing Library, você pode escrever testes que se concentram em como os componentes são usados pelos usuários finais, em vez de se concentrarem nos detalhes de implementação internos.

`Commitizen`</br>
É uma ferramenta de linha de comando que facilita a criação de mensagens de commit padronizadas e semânticas. Ele visa promover uma boa prática de mensagens de commit, seguindo convenções definidas, como o [Conventional Commits](https://www.conventionalcommits.org/), que ajuda a manter um histórico de commit mais legível, organizado e compreensível.

Com o `commitizen`, você pode usar uma interface interativa para criar mensagens de commit seguindo um formato específico, incluindo o tipo de alteração, o escopo, uma descrição concisa e outras informações opcionais. Isso ajuda a fornecer contexto sobre as mudanças realizadas no código e facilita a navegação e a compreensão do histórico de commits além de que é uma ferramenta útil para equipes que desejam adotar uma abordagem padronizada e semântica para mensagens de commit, tornando mais fácil rastrear e entender as alterações em um projeto.

<h1><br>
<p align="center">
Importante para Executar a aplicação
</p>
</h1>

```bash
# Instalação de pacotes
$ npm install
# ou
$ yarn

# Modo desenvolvimento com (Hot Reload)
$ npm run dev
# ou
$ yarn dev

# Gerando o build e testando local (Sem Hot Reload)
# Fica mais rápido o teste no navegador por ser o build
$ npm run build:start
# ou
$ yarn build:start

# Testando local (Com Hot Reload)
$ npm run dev
# ou
$ yarn dev
```
