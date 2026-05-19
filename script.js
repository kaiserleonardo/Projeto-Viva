document.getElementById('btnVivificar').addEventListener('click', () => {
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
    feedback.innerText = "Buscando ilustração didática...";

    // Engenharia de Prompt: Forçamos termos de fotografia e clareza
    // Isso ajuda a evitar aquelas letras e desenhos "derretidos"
    const promptFocado = `Educational 3D render of ${textoEntrada}, solid white background, high quality, sharp lines, isometric view, bright colors, masterpiece, no text, no blur.`;
    
    const seed = Math.floor(Math.random() * 999999);
    
    // Usaremos a URL direta que não costuma dar erro de bloqueio
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFocado)}?width=1024&height=1024&seed=${seed}&nologo=true`;

    // Atribuir a URL diretamente ao SRC da imagem mata 90% dos problemas de conexão
    imagem.src = url;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração carregada!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao carregar. Tente novamente.";
    };
});

// Voz
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
