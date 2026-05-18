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
    // Traduzimos termos comuns para que a IA entenda o conceito perfeitamente
    let conceitoIA = textoEntrada.toLowerCase()
        .replace(/célula/g, "biological cell")
        .replace(/corpo humano/g, "human body")
        .replace(/sistema solar/g, "solar system")
        .replace(/coração/g, "human heart")
        .replace(/plantas/g, "plants")
        .replace(/egito/g, "ancient egypt");

    // 2. PROMPT DE ENGENHARIA (Forçando o idioma e a qualidade)
    // Pedimos para a IA rotular as coisas em Português do Brasil
    const promptFinal = `High-quality educational 2D vector illustration, white background, high contrast. Topic: ${conceitoIA}. Any text labels must be in BRAZILIAN PORTUGUESE.`;
    
    const seed = Math.floor(Math.random() * 999999);

    // 3. URL DIRETA (Evita o erro de "Conexão" do navegador)
    // Passamos a chave na URL e forçamos o modelo FLUX
    const urlGeradora = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=800&height=800&seed=${seed}&model=flux&nologo=true&enhance=true`;

    // 4. TENTATIVA DE CARREGAMENTO
    imagem.src = urlGeradora;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração VIP gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Servidor ocupado. Tente clicar novamente em 5 segundos.";
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
