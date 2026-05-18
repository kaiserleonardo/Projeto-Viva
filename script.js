const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o tema da aula.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Acessando modelo VIP de alta qualidade...";

    // 1. Tradutor automático
    let conceitoIA = textoEntrada.toLowerCase()
        .replace(/célula/g, "biological cell structure")
        .replace(/corpo humano/g, "human anatomy")
        .replace(/sistema solar/g, "solar system planets")
        .replace(/coração/g, "human heart anatomy")
        .replace(/plantas/g, "plant biology")
        .replace(/egito/g, "ancient egypt pyramids");

    // 2. Novo Prompt: Focado no ponto forte do FLUX (3D, super detalhado, sem texto)
    const promptFinal = `High-end 3D educational render, ultra-detailed textbook illustration, clean white background, high resolution, cinematic lighting. Topic: ${conceitoIA}. STRICTLY NO TEXT, NO WORDS, NO LABELS in the image.`;
    
    const seed = Math.floor(Math.random() * 999999);

    // 3. O link original do Pollinations
    const urlOriginal = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

    // 4. O Túnel Proxy (Isso evita que o navegador bloqueie a sua chave)
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(urlOriginal)}`;

    try {
        // Agora fazemos o envio da chave pelo túnel!
        const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro na conexão VIP.");

        // Converte e exibe a imagem
        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração 3D VIP gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao conectar. Tente novamente.";
    }
});

// Acessibilidade: Voz
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
