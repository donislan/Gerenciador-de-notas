const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const caminhoPasta = path.join(__dirname, "notas");

function mostrarMenu() {
  console.log(`\nEscolha uma das opções abaixo:`);
  console.log(`1 - Criar uma nova anotação`);
  console.log(`2 - Listar todos os arquivos salvos`);
  console.log(`3 - Ler uma anotação específica`);
  console.log(`4 - Excluir uma anotação`);
  console.log(`5 - Sair`);
}

function criarPasta() {
  if (!fs.existsSync(caminhoPasta)) {
    fs.mkdirSync(caminhoPasta, { recursive: true });
  }
}

function criarAnotacao() {
  rl.question("Digite o nome do arquivo: ", (answer) => {
    const nomeArquivo = answer + ".txt";
    const caminhoArquivo = path.join(caminhoPasta, nomeArquivo);
    rl.question("Digite o conteúdo da anotação: ", (conteudo) => {
      fs.writeFileSync(caminhoArquivo, conteudo, "utf-8");
      console.log("Arquivo criado com sucesso!");
      iniciarPrograma();
    });
  });
}

function listarAnotacoes() {
  const arquivos = fs.readdirSync(caminhoPasta);
  if (arquivos.length === 0) {
    console.log("Nenhuma anotação encontrada");
  } else {
    console.log("Anotações salvas:");
    arquivos.forEach((arquivo, index) =>
      console.log(`${index + 1} - ${arquivo}`)
    );
  }
  iniciarPrograma();
}

function lerAnotacao() {
  rl.question("Digite o nome do arquivo: ", (answer) => {
    const nomeArquivo = answer + ".txt";
    const caminhoArquivo = path.join(caminhoPasta, nomeArquivo);
    if (fs.existsSync(caminhoArquivo)) {
      const conteudo = fs.readFileSync(caminhoArquivo, "utf-8");
      console.log(`\nConteúdo da anotação:\n${conteudo}`);
    } else {
      console.log("Arquivo não encontrado");
    }
    iniciarPrograma();
  });
}

function excluirAnotacao() {
  rl.question("Digite o nome do arquivo: ", (answer) => {
    const nomeArquivo = answer + ".txt";
    const caminhoArquivo = path.join(caminhoPasta, nomeArquivo);
    if (fs.existsSync(caminhoArquivo)) {
      fs.unlinkSync(caminhoArquivo);
      console.log("Arquivo excluído com sucesso!");
    } else {
      console.log("Arquivo não encontrado.");
    }
    iniciarPrograma();
  });
}

function iniciarPrograma() {
  mostrarMenu();
  rl.question("Qual ação você deseja executar? ", (answer) => {
    switch (answer.trim()) {
      case "1":
        criarAnotacao();
        break;
      case "2":
        listarAnotacoes();
        break;
      case "3":
        lerAnotacao();
        break;
      case "4":
        excluirAnotacao();
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida. Por favor, tente novamente.");
        iniciarPrograma();
    }
  });
}

criarPasta();
iniciarPrograma();
