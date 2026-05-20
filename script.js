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

    // Reset de Interface
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Conectando ao Hugging Face...";

    // Prompt Otimizado
    const promptFinal = `Educational illustration of ${textoEntrada}, high quality, vibrant colors, white background, no text, no labels.`;

    async function buscarImagem(dados) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { 
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(dados),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "IA acordando... aguarde 5 segundos.";
            await new Promise(res => setTimeout(res, 5000));
            return buscarImagem(dados);
        }

        if (!response.ok) {
            throw new Error("Erro na conexão com o servidor.");
        }

        return await response.blob();
    }

    try {
        const blob = await buscarImagem({ inputs: promptFinal });
        const urlFinal = URL.createObjectURL(blob);
        
        imagem.src = urlFinal;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Imagem gerada!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao carregar. Tente novamente.";
    }
});

// FUNÇÃO DE VOZ
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
