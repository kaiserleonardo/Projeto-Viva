document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim().toLowerCase();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Traduzindo e desenhando...";

    // --- DICIONÁRIO DE TRADUÇÃO PEDAGÓGICA ---
    // Isso garante que a IA entenda termos complexos em português
    let promptTraduzido = textoEntrada
        .replace(/célula/g, "biological cell")
        .replace(/corpo humano/g, "human body anatomy")
        .replace(/sistema solar/g, "solar system")
        .replace(/planetas/g, "planets")
        .replace(/coração/g, "human heart")
        .replace(/pulmão/g, "lungs")
        .replace(/plantas/g, "plants")
        .replace(/animais/g, "animals")
        .replace(/vulcão/g, "volcano")
        .replace(/egito/g, "ancient egypt")
        .replace(/história/g, "history")
        .replace(/matemática/g, "math")
        .replace(/geometria/g, "geometry shapes");

    // Estilo fixo para Acessibilidade (TEA/TGD)
    const estiloAcessibilidade = "educational simple flat illustration, white background, high contrast, clear lines";
    
    // Monta a frase final para a IA
    const promptFinal = `${estiloAcessibilidade}, ${promptTraduzido}`;

    // Link do servidor estável
    const seed = Math.floor(Math.random() * 99999);
    const urlGeradora = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true`;

    imagem.src = urlGeradora;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Imagem gerada com alta precisão!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao gerar. Tente usar palavras mais simples.";
    };
});

// Acessibilidade: Voz em Português
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
