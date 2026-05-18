const OPENAI_API_KEY = "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";

document.getElementById('btnVivificar').addEventListener('click', async () => {
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
    feedback.innerText = "A inteligência DALL-E 3 está criando sua imagem personalizada...";

    // Prompt otimizado para Educação Especial (TEA/TGD)
    // O DALL-E 3 entende português perfeitamente, então não precisamos traduzir.
    const promptFinal = `Ilustração educacional didática, estilo desenho 3D suave ou vetor limpo, fundo branco sólido, alto contraste, sem sombras complexas. Tema: ${textoEntrada}. IMPORTANTE: A imagem deve ser puramente visual. NÃO escreva nenhuma palavra, letra ou texto dentro da imagem.`;

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: promptFinal,
                n: 1,
                size: "1024x1024",
                quality: "standard"
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const urlGerada = data.data[0].url;
        imagem.src = urlGerada;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração profissional gerada com sucesso!";
        };

    } catch (error) {
        console.error("Erro na OpenAI:", error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: Verifique seu saldo na OpenAI ou a chave.";
    }
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
