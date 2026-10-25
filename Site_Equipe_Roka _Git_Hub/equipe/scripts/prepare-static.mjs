// Prepara uma cópia para hospedagem Sites. Para GitHub Pages, use a raiz diretamente.
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
await mkdir(`${root}dist`, { recursive: true });
// Mantém a pasta para preservar a conexão do servidor de prévia.
for (const item of await readdir(`${root}dist`)) {
  await rm(`${root}dist/${item}`, { recursive: true, force: true });
}
for (const file of ['index.html', 'styles.css', 'app.js', 'conteudo.js', 'assets', '.nojekyll']) {
  await cp(`${root}${file}`, `${root}dist/${file}`, { recursive: true });
}
console.log('Arquivos estáticos preparados.');
