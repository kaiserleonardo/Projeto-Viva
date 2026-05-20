const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Digite um tema!");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Conectando ao servidor reserva...";

    // Prompt simplificado para o modelo 1.5
    const promptFinal = `Educational illustration, ${textoEntrada}, high quality, vibrant colors, white background, no text.`;

    async function query(data) {
        // Usando o modelo v1.5 que é MUITO mais estável para contas gratuitas
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (response.status === 429) {
            throw new Error("Limite de uso atingido. Espere alguns minutos.");
        }

        if (response.status === 503) {
            feedback.innerText = "Servidor acordando... tentando novamente...";
            await new Promise(r => setTimeout(r, 5000));
            return query(data);
        }

        if (!response.ok) throw new Error("Erro no servidor.");

        return await response.blob();
    }

    try {
        const blob = await query({ inputs: promptFinal });
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Pronto!";
        };
    } catch (error) {
        loader.classList.add('hidden');
        feedback.innerText = error.message;
        console.error(error);
    }
});
