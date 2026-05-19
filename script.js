document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar hoje?");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Criando material didático visual...";

    // PROMPT QUE SE ADAPTA A QUALQUER MATÉRIA
    // O segredo aqui é o "vector art" e "clean style", que as IAs erram menos.
    const promptFinal = `Clean educational 2D vector illustration, bright colors, minimalist design, white background. Subject: ${textoEntrada}. High quality, simple shapes, no text, no words.`;
    
    const seed = Math.floor(Math.random() * 10000);

    // ALTERNATIVA: Usaremos o Pollinations com o modelo "TURBO", que é melhor para desenhos simples que o modelo padrão
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=turbo`;

    try {
        // Carregamento direto
        imagem.src = url;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Imagem gerada! Veja como ajuda no aprendizado.";
        };

        imagem.onerror = () => {
            throw new Error();
        };

    } catch (error) {
        loader.classList.add('hidden');
        feedback.innerText = "Houve um probleminha. Tente outro tema!";
    }
});

// Voz mantida para acessibilidade
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
