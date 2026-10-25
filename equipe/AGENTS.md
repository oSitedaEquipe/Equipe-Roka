# Referência visual deste projeto

Leia [TONALIDADE.md](TONALIDADE.md) antes de alterar a apresentação visual.

O usuário definiu assets/artwork/tonalidade-aprovada.png como a tonalidade oficial do título e dos subtítulos para todas as alterações futuras. Reutilize a própria arte e as janelas SVG de index.html. Ajustes de layout devem preservar seus pixels e cores; não regenere ou recolora as letras automaticamente. Só proponha outra tonalidade ou outra arte quando o usuário pedir explicitamente, apresentando uma prévia antes da aplicação.

Os dois vãos abaixo dos subtítulos continuam usando a mesma variável --subtitle-gap. Preserve os 28 quadrados e as linhas 6, 5, 4, 3, 2, 1 da pirâmide, salvo pedido do usuário.

O usuário aprovou todas as 28 molduras do mesmo tamanho: 150 × 150 px no computador, com redução uniforme nas telas menores. Fotos de perfis usam object-fit: contain para aparecerem inteiras, mantendo a proporção e as margens necessárias.

As fichas individuais foram aprovadas: foto ampliada, nome, sexo, cargo e sobre, com edição independente em conteudo.js. Preserve o visual dos dois temas e a arte aprovada reutilizada no cabeçalho da ficha. Não publique dados de exemplo como se fossem informações reais.

O layout Sobre foi aprovado: janela ampla, cabeçalho com a arte original, título Sobre, linha fina e história em parágrafos, com rolagem para textos maiores. O conteúdo real vem de sobre.texto em conteudo.js; não publique os textos de orientação usados nas prévias como história real.

A imagem opcional abaixo da história também foi aprovada. Ela é apenas exibida: não adicione link, redirecionamento, ação ao clicar ou instrução para clicar/escanear. O usuário edita sobre.imagem e sobre.descricaoImagem em conteudo.js. O bloco fica oculto quando não há arquivo válido. Não publique o QR Code nem o link de exemplo das prévias.
