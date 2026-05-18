// CHAVE DE PÓLEN (Pollinations) - NÃO USE A DA OPENAI AQUI
const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Usando seus Pólens: Gerando imagem VIP com FLUX...";

    // Prompt otimizado para não vir com textos errados
    const promptFinal = `High-quality educational 3D illustration, professional textbook style, clean white background, high contrast. Topic: ${textoEntrada}. (Strictly no text, no letters, no labels inside the image)`;
    
    const seed = Math.floor(Math.random() * 999999);

    // URL configurada para o modelo FLUX (o melhor do Pollinations)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    try {
        // Fazendo a conexão VIP usando sua chave de Pólens
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro de saldo ou conexão nos Pólens.");

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso via Pólens!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: " + error.message;
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
});// CHAVE DE PÓLEN (Pollinations) - NÃO USE A DA OPENAI AQUI
const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Usando seus Pólens: Gerando imagem VIP com FLUX...";

    // Prompt otimizado para não vir com textos errados
    const promptFinal = `High-quality educational 3D illustration, professional textbook style, clean white background, high contrast. Topic: ${textoEntrada}. (Strictly no text, no letters, no labels inside the image)`;
    
    const seed = Math.floor(Math.random() * 999999);

    // URL configurada para o modelo FLUX (o melhor do Pollinations)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    try {
        // Fazendo a conexão VIP usando sua chave de Pólens
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro de saldo ou conexão nos Pólens.");

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso via Pólens!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: " + error.message;
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
