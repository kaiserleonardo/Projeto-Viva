// 1. Configuração da Chave
const HF_TOKEN = "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"; 

// 2. Função Principal (Gerar Imagem)
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
    feedback.innerText = "IA preparando a imagem...";

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
            feedback.innerText = "Servidor ligando... aguarde 5 segundos.";
            await new Promise(res => setTimeout(res, 5000));
            return buscarImagem(dados);
        }

        if (!response.ok) throw new Error("Erro na conexão.");
        return await response.blob();
    }

    try {
        const blob = await buscarImagem({ inputs: promptFinal });
        imagem.src = URL.createObjectURL(blob);
        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Imagem carregada!";
        };
    } catch (error) {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao carregar. Tente novamente.";
    }
});

// 3. Função de Voz
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});

// FIM DO ARQUIVO - Certifique-se de copiar até esta linha!
