const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Preparação visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Ativando modelo FLUX (Modo VIP)...";

    // 1. Prompt reforçado (Forçando a IA a ser inteligente)
    // O Pollinations funciona melhor se o prompt for em inglês, então o código traduz o básico:
    const promptBase = textoEntrada.toLowerCase()
        .replace(/célula/g, "biological cell")
        .replace(/corpo humano/g, "human anatomy")
        .replace(/sistema solar/g, "solar system planets")
        .replace(/coração/g, "human heart structure");

    const promptFinal = `High-quality educational 3D render, textbook style, white background. Topic: ${promptBase}. NO TEXT inside the image.`;
    const seed = Math.floor(Math.random() * 999999);

    // 2. A URL MÁGICA: Aqui a gente passa a chave e o modelo FLUX (que gasta pólen)
    // O segredo está no parâmetro &model=flux e no nologo=true
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux&key=${POLLINATIONS_API_KEY}`;

    // 3. Carregamento Direto (Não dá erro de conexão!)
    imagem.src = url;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração de alta qualidade gerada!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao usar pólens. Tente novamente em instantes.";
    };
});

// Acessibilidade Áudio
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
