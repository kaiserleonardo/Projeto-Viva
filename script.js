const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Tela de carregamento
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Gerando ilustração e adaptando para Português do Brasil...";

    // Comando rigoroso para a IA: O texto deve ser em PT-BR
    const promptFinal = `educational illustration, simple flat design, white background, high contrast. Topic: "${textoEntrada}". IMPORTANT: Any written text, labels, or titles inside the image MUST be strictly in Brazilian Portuguese (PT-BR). Do not use English words.`;
    const seed = Math.floor(Math.random() * 99999);

    // Link do modelo FLUX com a nova regra de idioma
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true&model=flux`;

    try {
        // Envia a sua chave VIP
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro na chave ou servidor");

        // Transforma a resposta em imagem na tela
        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso em PT-BR!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao conectar. Verifique seus pólens.";
    }
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
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Tela de carregamento
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Gerando ilustração com prioridade VIP...";

    // Limpa os acentos para não quebrar o link
    const promptLimpo = textoEntrada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Comando para a IA desenhar no estilo educativo
    const promptFinal = `educational illustration, simple flat design, white background, high contrast, ${promptLimpo}`;
    const seed = Math.floor(Math.random() * 99999);

    // Link do modelo FLUX (O melhor que eles têm)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true&model=flux`;

    try {
        // Envia a sua chave secreta para furar a fila
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro na chave ou servidor");

        // Transforma a resposta em imagem na tela
        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao conectar. Verifique seus pólens.";
    }
});

// Botão de Áudio
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
