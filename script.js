// Substitua pelo seu token que você pegou no Hugging Face
const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar hoje?");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Hugging Face está criando sua ilustração...";

    // Prompt otimizado para o Stable Diffusion (Focado em Educação)
    const promptFinal = `High-quality educational illustration, clean 2D vector style, white background, vibrant colors. Subject: ${textoEntrada}. Professional graphic design, no text, no blurry parts.`;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify({ inputs: promptFinal }),
            }
        );

        if (!response.ok) {
            throw new Error("Aguarde um momento, a IA está acordando...");
        }

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração pronta para a aula!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "A IA está carregando. Tente novamente em 30 segundos.";
    }
});

// Mantivemos a função de voz para acessibilidade
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
