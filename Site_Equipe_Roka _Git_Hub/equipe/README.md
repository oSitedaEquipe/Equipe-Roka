# Equipe Róka

Versão navegável do layout aprovado, em HTML, CSS e JavaScript, com temas claro/noturno, menu lateral, carrossel, 28 quadrados de fotos, fichas individuais de membros e rodapé.

## Abrir e publicar

Para visualizar localmente, abra **index.html** no navegador. Não é necessário instalar dependências.

Para GitHub Pages, envie à raiz do repositório: **index.html**, **styles.css**, **app.js**, **conteudo.js**, **assets/** e **.nojekyll**. Em Settings → Pages, publique a branch main a partir de /(root). Os caminhos relativos também funcionam quando o site está dentro de uma subpasta de repositório.

O script **scripts/prepare-static.mjs** prepara a pasta dist usada na hospedagem Sites. O GitHub Pages pode publicar diretamente a raiz.

## Trocar a foto de um membro

1. Coloque a foto em **assets/fotos/**.
2. Abra **conteudo.js** e localize o ID do quadrado.
3. Preencha o campo foto com o caminho relativo e salve.

Exemplo de um perfil:

    { id: "adm-01", grupo: "administracao", linha: 1, nome: "Nome", sexo: "Não informado", sobre: "Apresentação deste membro.", cargo: "ADM", foto: "assets/fotos/adm-01.jpg", posicao: "center", descricao: "" }

Envie o arquivo da foto e o arquivo de conteúdo atualizado ao GitHub. Cada objeto é independente. Todas as 28 molduras têm 150 × 150 px no computador e diminuem juntas em telas menores. As fotos aparecem inteiras, sem cortes ou distorção; imagens verticais ou horizontais podem deixar margens dentro do quadrado. O campo posicao aceita center, top ou bottom para alinhar a imagem. Deixe foto vazio para preservar o espaço sem fotografia.

| IDs | Posição | Quantidade |
| --- | --- | --- |
| deus | DEUS | 1 |
| fundador | FUNDADOR | 1 |
| adm-01 a adm-05 | ADM | 5 |
| membro-01 a membro-21 | Membros não Oficiais | 21 |

A pirâmide mantém as seis linhas de 6, 5, 4, 3, 2 e 1 quadrados. Todos os IDs devem ser únicos. Os quadrados abrem fichas com foto ampliada, nome, sexo, cargo e sobre. Os campos de cada perfil são independentes e editados em conteudo.js. Deixe sexo e sobre vazios quando não quiser adicionar esses dados; a ficha informa que ainda não foram adicionados. O campo descricao antigo é aceito como alternativa a sobre. No texto de sobre, use \n\n para separar parágrafos. As fichas fecham pelo X, pela tecla Esc ou ao clicar fora, e devolvem o foco à foto selecionada.

## Colocar imagens no carrossel

Coloque os arquivos em **assets/carrossel/** e edite a lista carrossel em **conteudo.js**:

    { id: "slide-01", foto: "assets/carrossel/imagem-01.jpg", descricao: "Descrição da imagem", posicao: "center" }

Há cinco posições vazias na versão inicial, conforme a prévia. É possível adicionar ou remover objetos dessa lista: as setas e os indicadores acompanham a quantidade automaticamente. As imagens não trocam sozinhas. Setas, indicadores, teclado e gesto horizontal no celular permitem navegar.

JPG, PNG e WebP são adequados para fotografias. Use nomes sem espaços e confira a extensão e as letras maiúsculas/minúsculas. Caminhos inválidos mantêm a moldura vazia.

## Sobre e links

O menu tem exatamente Membros, Membros não Oficiais e Sobre. Os dois primeiros levam às seções; Sobre abre uma janela ampla com a arte aprovada no cabeçalho e espaço para a história do grupo. O campo **sobre.texto** em **conteudo.js** está vazio, pronto para receber seu texto, sem conteúdo inventado. Use \n\n entre parágrafos; acentos e quebras de linha são preservados. Não há limite de caracteres definido pelo site: textos maiores rolam dentro da janela, mantendo o botão de fechar acessível.

Para adicionar uma imagem abaixo da história, coloque o arquivo em **assets/sobre/** e preencha **sobre.imagem** com o caminho relativo, por exemplo **assets/sobre/imagem.jpg**. Preencha **sobre.descricaoImagem** com uma descrição para acessibilidade. A imagem aparece inteira, com proporções e cores preservadas, e serve apenas para exibição. Ela não tem link nem ação de navegação. Quando imagem estiver vazio ou o arquivo não carregar, o bloco não aparece.

Os três destinos do rodapé ficam em **links** no mesmo arquivo:

- YouTube: https://www.youtube.com/@EquipeRK
- Róka Hub: https://i.pinimg.com/1200x/14/64/ac/1464ac9770f67c298f5ec8ae7db65cf0.jpg
- Discord: https://discord.gg/sdbYBYmmz

O botão de sol/lua no topo troca o tema e guarda a preferência neste navegador. Os ícones e as molduras acompanham o tema.

## Ajustar seus parâmetros

As variáveis no começo de **styles.css** controlam os valores principais:

| Variável | Controla |
| --- | --- |
| --title-width | Largura do título, com proporções preservadas |
| --intro-distance | Espaço entre o título e Membros, com o carrossel no meio |
| --subtitle-gap | Distância abaixo de AMBOS os subtítulos |
| --profile-size | Tamanho único dos 28 quadrados (máximo de 150 px) |
| --member-gap | Espaço entre os quadrados da pirâmide |
| --footer-space | Espaço entre o último quadrado e o rodapé |

O espaço abaixo de Membros e abaixo de Membros não Oficiais usa exatamente a mesma variável. A referência máxima do espaço inicial é 30 cm em CSS, com adaptação para telas menores. Medidas em cm no navegador são unidades de layout e não garantem o mesmo tamanho físico em cada monitor ou zoom.

Os títulos usam a própria imagem de tonalidade aprovada, recortada por seis janelas SVG no HTML. Alterar a largura do título preserva a personalidade, as cores e a textura das letras. O símbolo de registrado é separado e acompanha a cor do tema. A referência para as próximas alterações está em **TONALIDADE.md**.

## Manutenção das imagens

Esta versão mantém a edição manual pelos arquivos do projeto, compatível com hospedagem estática. Não inclui painel administrativo ou upload persistente por servidor. Para cadastrar imagens, edite os caminhos no arquivo de conteúdo e publique os arquivos. Um painel de upload com armazenamento compartilhado seria uma implementação adicional.

## Estrutura

- index.html — página, menu, carrossel, títulos e rodapé.
- styles.css — temas, medidas, espaçamentos e adaptação para celular.
- app.js — navegação, carrossel, tema, quadrados e fichas individuais.
- conteudo.js — dados editáveis de fotos, slides, texto e links.
- assets/artwork/tonalidade-aprovada.png — referência oficial das cores e letras, nos dois fundos.
- TONALIDADE.md — padrão visual aprovado para as próximas alterações.
- assets/fotos/ — fotografias dos membros.
- assets/carrossel/ — imagens em destaque.
- assets/sobre/ — imagem opcional abaixo da história do grupo.
