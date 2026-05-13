document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoInput = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoInput) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "IA está interpretando e desenhando...";

    // --- MINI TRADUTOR E REFINADOR DE PROMPT ---
    // Isso ajuda a IA a entender termos comuns de escola em português
    let promptRefinado = textoInput.toLowerCase()
        .replace("célula", "biological cell")
        .replace("árvore", "tree")
        .replace("corpo humano", "human body anatomy")
        .replace("sistema solar", "solar system planets")
        .replace("escola", "school building")
        .replace("animal", "animal")
        .replace("planta", "plant")
        .replace("água", "water cycle");

    // Adicionamos comandos de estilo para a imagem ficar clara e didática
    // "High contrast, flat design, white background" evita imagens confusas
    const estiloAcessibilidade = "simple flat vector illustration, high contrast, white background, educational clip art, clear boundaries";
    const promptFinal = `${estiloAcessibilidade}, ${promptRefinado}`;

    // Gerador de semente (seed) para não repetir a mesma imagem sempre
    const seed = Math.floor(Math.random() * 9999);
    
    // URL da Pollinations (Sem login, sem frescura)
    const url = `https://pollinations.ai/p/${encodeURIComponent(promptFinal)}?width=1024&height=1024&nologo=true&seed=${seed}`;

    // Tenta carregar a imagem
    imagem.src = url;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração inclusiva gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro na geração. Tente uma palavra mais simples.";
    };
});

// Botão de Áudio (Sintetizador de Voz)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9;
        window.speechSynthesis.speak(fala);
    }
});
