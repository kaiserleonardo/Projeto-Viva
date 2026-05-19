// CHAVE API HUGGING FACE
const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o tema da aula.");
        return;
    }

    // Preparação da interface
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Solicitando imagem ao Hugging Face...";

    // Prompt otimizado: Simples e direto para evitar confusão da IA
    const promptFinal = `Professional educational illustration of ${textoEntrada}, high quality, 3D render style, clean white background, vibrant colors, sharp focus, no text, no labels.`;

    async function buscarImagem(dados) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { 
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(dados),
            }
        );

        // Se o modelo estiver carregando (Erro 503), ele tenta de novo em 5 segundos
        if (response.status === 503) {
            feedback.innerText = "O servidor está ligando... aguarde 5 segundos.";
            await new Promise(res => setTimeout(res, 5000));
            return buscarImagem(dados);
        }

        if (!response.ok) {
            const erroJson = await response.json();
            throw new Error(erroJson.error || "Erro na API");
        }

        return await response.blob();
    }

    try
