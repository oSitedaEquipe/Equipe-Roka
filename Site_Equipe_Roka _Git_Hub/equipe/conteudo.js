/**
 * EQUIPE RÓKA — ARQUIVO EDITÁVEL
 * Cada objeto representa um quadrado independente da planilha.
 *
 * COMO ADICIONAR UMA FOTO:
 * 1. Coloque a imagem em assets/fotos/ (ex.: assets/fotos/caio.jpg).
 * 2. No perfil desejado, troque foto: "" por foto: "assets/fotos/caio.jpg".
 * 3. Preencha nome, sexo, cargo e sobre para a ficha que abre ao clicar.
 *    No campo sobre, use \n\n para separar parágrafos. Salve e envie ao GitHub.
 *
 * Os nomes dos arquivos diferenciam maiúsculas e minúsculas no GitHub.
 * Use caminhos relativos, sem barra inicial, para funcionar em qualquer repositório.
 * Grupos: base, fundador, administracao, membros.
 * Linha: preserva a organização em pirâmide no computador (6, 5, 4, 3, 2, 1).
 * Mantenha os IDs únicos. Novos IDs geram novos quadrados automaticamente.
 */
window.ROKA_CONTEUDO = {
  versao: 4,
  // Um objeto por posição; preencha foto com o caminho de cada imagem.
  carrossel: [
    { id: "slide-01", foto: "", descricao: "", posicao: "center" },
    { id: "slide-02", foto: "", descricao: "", posicao: "center" },
    { id: "slide-03", foto: "", descricao: "", posicao: "center" },
    { id: "slide-04", foto: "", descricao: "", posicao: "center" },
    { id: "slide-05", foto: "", descricao: "", posicao: "center" }
  ],
  // A imagem aparece abaixo da história. Deixe imagem vazio para ocultar.
  sobre: { titulo: "Sobre", texto: "", imagem: "", descricaoImagem: "" },
  links: {
    youtube: "https://www.youtube.com/@EquipeRK",
    rokaHub: "https://i.pinimg.com/1200x/14/64/ac/1464ac9770f67c298f5ec8ae7db65cf0.jpg",
    discord: "https://discord.gg/sdbYBYmmz"
  },
  perfis: [
    // DEUS — quadrado com "?" no arquivo original
    { id: "deus", grupo: "base", linha: 1, nome: "Deus", sexo: "", sobre: "", cargo: "DEUS", foto: "", posicao: "center", descricao: "" },

    // FUNDADOR
    { id: "fundador", grupo: "fundador", linha: 1, nome: "", sexo: "", sobre: "", cargo: "FUNDADOR", foto: "", posicao: "center", descricao: "" },

    // ADMINISTRAÇÃO — cinco quadrados independentes
    { id: "adm-01", grupo: "administracao", linha: 1, nome: "", sexo: "", sobre: "", cargo: "ADM", foto: "", posicao: "center", descricao: "" },
    { id: "adm-02", grupo: "administracao", linha: 1, nome: "", sexo: "", sobre: "", cargo: "ADM", foto: "", posicao: "center", descricao: "" },
    { id: "adm-03", grupo: "administracao", linha: 1, nome: "", sexo: "", sobre: "", cargo: "ADM", foto: "", posicao: "center", descricao: "" },
    { id: "adm-04", grupo: "administracao", linha: 1, nome: "", sexo: "", sobre: "", cargo: "ADM", foto: "", posicao: "center", descricao: "" },
    { id: "adm-05", grupo: "administracao", linha: 1, nome: "", sexo: "", sobre: "", cargo: "ADM", foto: "", posicao: "center", descricao: "" },

    // MEMBROS NÃO OFICIAIS — linha 1: seis quadrados
    { id: "membro-01", grupo: "membros", linha: 1, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-02", grupo: "membros", linha: 1, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-03", grupo: "membros", linha: 1, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-04", grupo: "membros", linha: 1, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-05", grupo: "membros", linha: 1, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-06", grupo: "membros", linha: 1, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    // Linha 2: cinco quadrados
    { id: "membro-07", grupo: "membros", linha: 2, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-08", grupo: "membros", linha: 2, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-09", grupo: "membros", linha: 2, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-10", grupo: "membros", linha: 2, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-11", grupo: "membros", linha: 2, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    // Linha 3: quatro quadrados
    { id: "membro-12", grupo: "membros", linha: 3, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-13", grupo: "membros", linha: 3, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-14", grupo: "membros", linha: 3, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-15", grupo: "membros", linha: 3, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    // Linha 4: três quadrados
    { id: "membro-16", grupo: "membros", linha: 4, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-17", grupo: "membros", linha: 4, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-18", grupo: "membros", linha: 4, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    // Linha 5: dois quadrados
    { id: "membro-19", grupo: "membros", linha: 5, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    { id: "membro-20", grupo: "membros", linha: 5, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" },
    // Linha 6: um quadrado
    { id: "membro-21", grupo: "membros", linha: 6, nome: "", sexo: "", sobre: "", cargo: "Membro não oficial", foto: "", posicao: "center", descricao: "" }
  ]
};
