document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Estado visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "O V.I.V.A está interpretando sua frase completa...";

    // 1. Tratamento de texto: Mantém a frase toda, só tira os acentos
    // Exemplo: "Célula animal procarionte" vira "Celula animal procarionte"
    const fraseSemAcento = textoEntrada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // 2. Monta o Prompt com a frase INTEIRA
    const promptFinal = `educational illustration, simple flat design, white background, ${fraseSemAcento}`;

    // 3. Link da IA (Gerador de imagem real)
    const seed = Math.floor(Math.random() * 99999);
    const urlGeradora = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true`;

    // 4. Carrega a imagem no site
    imagem.src = urlGeradora;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao processar. Tente novamente.";
    };
});

// Acessibilidade: Lê o texto completo para o aluno
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
