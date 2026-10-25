# Equipe Róka — sem login

Versão estática para GitHub Pages. Não exige Node.js, servidor de autenticação, senha ou sessões.

Foram preservadas as duas páginas separadas, a abertura com áudio original, a cabeça animada, o botão Pular abertura na mesma aba, o título Equipe Róka, o mesmo favicon, as tonalidades e a arte original, os dois temas, as 28 molduras, as fichas, o menu, Sobre, o carrossel e os links. O ® permanece no cabeçalho da equipe. A página de login foi retirada.

## Substituir a versão anterior

Extraia o ZIP em uma pasta NOVA, sem misturar os arquivos com a versão de login. Para publicar, use os arquivos desta nova pasta. A estrutura principal é:

```text
assets/
equipe/
.gitignore
.nojekyll
app.js
head-loop.js
index.html
README.md
style.css
```

No repositório GitHub, substitua a versão anterior por essa estrutura. Os arquivos antigos `server.cjs`, `password.cjs`, `configurar-login.cjs`, `package.json`, `Dockerfile`, `.dockerignore`, os guias antigos de Node.js e as pastas `auth/`, `public/` e `test/` não são usados. A página inicial agora fica diretamente na raiz, não dentro de `public/`. Nunca envie `.auth.json` ou `.env`.

Se preferir conservar o projeto anterior no GitHub, crie outro repositório para esta versão estática e envie somente os arquivos desta nova pasta. Não é necessário apagar a cópia anterior do seu computador.

## Ativar GitHub Pages

1. Envie os ARQUIVOS EXTRAÍDOS para a raiz do repositório, preservando `assets/` e `equipe/`. Inclua `.nojekyll`. Guardar apenas o ZIP não publica as páginas.
2. Vá a **Settings → Pages**.
3. Em **Source**, selecione **Deploy from a branch**.
4. Escolha **main**, pasta **/(root)** e clique em **Save**.
5. Aguarde a publicação; o endereço aparecerá nessa página, no formato `https://seu-usuario.github.io/Equipe-Roka/`.

No GitHub Free, Pages exige repositório público. Assim, o código e os arquivos do repositório serão públicos. Sem login, as páginas e mídias também ficam acessíveis aos visitantes. Não é necessário Render para esta versão.

## Conteúdo e áudio

Edite nomes, cargos, fotos, fichas, Sobre e links em `equipe/conteudo.js`. Preserve a arte `equipe/assets/artwork/tonalidade-aprovada.png` e as orientações visuais em `equipe/AGENTS.md` e `equipe/TONALIDADE.md`.

O som tenta começar automaticamente. Se o navegador bloquear, um clique ou toque na abertura libera o áudio. O botão de volume continua removido. Pular abertura leva diretamente a `equipe/index.html`, na mesma aba.

Referências: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Configurar a origem da publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
