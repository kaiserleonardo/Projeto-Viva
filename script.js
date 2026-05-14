document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conceito da aula.");
        return;
    }

    // Estado visual de carregamento
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    
    // Aviso sincero para o usuário não achar que travou
    feedback.innerText = "A IA está desenhando... Isso pode levar de 10 a 20 segundos!";

    // 1. Limpa o texto (remove acentos para o link não quebrar)
    const promptLimpo = textoEntrada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // 2. Monta o comando focado em TGD/TEA (simples e direto)
    const promptFinal = `simple educational illustration, flat design, white background, ${promptLimpo}`;

    // 3. NOVO ENDPOINT (Muito mais rápido e não trava o navegador)
    const seed = Math.floor(Math.random() * 99999);
    const urlGeradora = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true`;

    // 4. Carrega a imagem
    imagem.src = urlGeradora;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "O servidor da IA falhou. Clique em Vivificar novamente.";
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
