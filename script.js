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
    feedback.innerText = "Usando seus créditos de Pólen para gerar imagem VIP...";

    // 1. Tratamento do texto
    const promptLimpo = textoEntrada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const promptFinal = `educational illustration, simple flat design, white background, ${promptLimpo}`;
    const seed = Math.floor(Math.random() * 99999);

    // 2. URL da API (usando o modelo Flux que é o melhor)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true&model=flux`;

    try {
        // 3. Fazendo a requisição com a sua CHAVE NOVA
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro na API ou chave inválida");

        // 4. Transforma a resposta em um link que o HTML entenda
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        imagem.src = objectURL;
        
        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Imagem gerada com sucesso (Modo Pago)!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: Verifique se seus pólens caíram na conta.";
    }
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
