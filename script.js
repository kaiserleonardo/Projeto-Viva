const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o tema da aula.");
        return;
    }

    // Preparação visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Conectando ao servidor VIP (Pólen)...";

    // 1. MINI-TRADUTOR AUTOMÁTICO (Para a IA não errar o desenho)
    let conceitoIA = textoEntrada.toLowerCase()
        .replace(/célula/g, "biological cell")
        .replace(/corpo humano/g, "human body anatomy")
        .replace(/sistema solar/g, "solar system")
        .replace(/coração/g, "human heart")
        .replace(/plantas/g, "plants")
        .replace(/egito/g, "ancient egypt");

    // 2. PROMPT DE ENGENHARIA "SEM TEXTO" (Blindado)
    // Pedimos a ilustração perfeita, mas proibimos qualquer texto interno.
    // Assim, removemos o problema de palavras em inglês ou erradas.
    const promptFinal = `High-quality educational 2D vector illustration, simple flat design, white background, high contrast. Topic: ${conceitoIA}. NO TEXT, NO LABELS, NO LETTERS inside the image. Only clean visuals.`;
    
    const seed = Math.floor(Math.random() * 999999);

    // 3. URL DIRETA (Modelo VIP FLUX)
    const urlGeradora = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=800&height=800&seed=${seed}&model=flux&nologo=true`;

    // 4. CARREGAMENTO
    imagem.src = urlGeradora;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração VIP gerada (Sem legendas erradas)!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "O servidor demorou. Clique novamente.";
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
