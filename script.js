document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conceito que deseja ilustrar.");
        return;
    }

    // Estado visual de carregamento
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "A inteligência artificial está desenhando...";

    // 1. Tratamento do Texto: Remove acentos para evitar erro na URL
    const promptLimpo = textoEntrada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // 2. Engenharia de Prompt: Forçamos um estilo didático e limpo
    // Isso garante que a IA não crie algo confuso, focando em alunos com TEA/TGD
    const promptFinal = `simple educational illustration, flat design, white background, high contrast, ${promptLimpo}`;

    // 3. Semente aleatória: Garante que cada clique gere uma imagem inédita
    const seed = Math.floor(Math.random() * 999999);
    
    // 4. URL de Geração (IA Generativa Direta)
    const urlGeradora = `https://pollinations.ai/p/${encodeURIComponent(promptFinal)}?width=1024&height=1024&nologo=true&seed=${seed}`;

    // 5. Atribuição e verificação de carregamento
    imagem.src = urlGeradora;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração exclusiva gerada por IA!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao processar imagem. Tente uma palavra mais simples.";
    };
});

// Botão de Áudio (Acessibilidade)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
