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
    feedback.innerText = "Autenticando VIP... Forçando gasto de Pólen no FLUX...";

    // Prompt médico blindado
    const promptFinal = `Professional medical atlas illustration, 3D anatomical model, highly detailed, clean white background, textbook style. Topic: ${textoEntrada}. NO text, NO labels.`;
    const seed = Math.floor(Math.random() * 9999999);

    // URL sem a chave (a chave vai no cabeçalho agora)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    try {
        // O PULO DO GATO: Mandando a chave do jeito certo (Headers)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro do servidor: ${response.status}`);
        }

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Sucesso! Pólen gasto e imagem VIP gerada.";
        };

    } catch (error) {
        console.error("Erro na API:", error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao autenticar a chave. Abra o F12 para ver os detalhes.";
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
