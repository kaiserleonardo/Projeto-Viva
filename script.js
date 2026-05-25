document.addEventListener('DOMContentLoaded', () => {

    // 1. Configurações Premium com Grok-Imagine
    const API_KEY = "sk_jhTai3EahV5pzEac6pOofn27cG9N608m"; 
    const MODELO = "grok-imagine"; // Mudança para o modelo Grok

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    btnVivificar.addEventListener('click', () => {
        const promptRaw = textoEntrada.value.trim();

        if (!promptRaw) {
            alert("Por favor, digite o tema da aula!");
            return;
        }

        // Interface: Carregando
        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Solicitando ao Grok-Imagine... (Consumindo Pólens)";

        // O Grok entende muito bem prompts detalhados
        const promptFinal = `High-quality educational 3D render or illustration of ${promptRaw}, vivid cinematic colors, clear details, white background, classroom friendly style`;
        
        const seed = Math.floor(Math.random() * 999999);

        // URL para o modelo Grok usando sua chave premium
        const novaUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(promptFinal)}?model=${MODELO}&width=1024&height=1024&seed=${seed}&key=${API_KEY}`;

        // Atribui a URL à imagem
        imagemGerada.src = novaUrl;

        // Sucesso no carregamento
        imagemGerada.onload = () => {
            if (loader) loader.classList.add('hidden');
            imagemGerada.classList.remove('hidden');
            feedback.innerText = "Vivificado com Grok-Imagine!";
        };

        // Caso ocorra erro (Ex: Pólens acabaram ou rede bloqueada)
        imagemGerada.onerror = () => {
            if (loader) loader.classList.add('hidden');
            feedback.innerText = "Erro ao carregar o Grok. Verifique seus créditos ou a conexão.";
        };
    });

    // Função de Voz (Mantida para acessibilidade)
    btnOuvir.addEventListener('click', () => {
        const texto = textoEntrada.value;
        if (texto) {
            window.speechSynthesis.cancel();
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            window.speechSynthesis.speak(fala);
        }
    });
});
