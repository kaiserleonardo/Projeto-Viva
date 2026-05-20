// 1. Configuração da Nova Chave
const HF_TOKEN = "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"; 

// 2. Função de Geração de Imagem
document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar agora?");
        return;
    }

    // Reset da Interface
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "IA processando seu pedido...";

    // Prompt Otimizado (Traduzido para contexto educacional)
    const promptFinal = `High quality educational illustration of ${textoEntrada}, vibrant colors, white background, clean lines, 3D style, no text, no words.`;

    async function buscarImagem(dados) {
        const response = await fetch(
            "
