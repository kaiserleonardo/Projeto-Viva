console.log("V.I.V.A. Carregado com Sucesso!");

// 1. Configuração da Chave
const HF_TOKEN = "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"; 

// 2. Função Principal
const geradorDeImagem = async () => {
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
    feedback.innerText = "IA processando... aguarde.";

    const promptFinal = `Educational illustration of ${textoEntrada}, high quality, vibrant colors, white background, no text.`;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { 
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ inputs: promptFinal }),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "Servidor acordando... tentando de novo em 5s.";
            setTimeout(geradorDeImagem, 5000);
            return;
        }

        if (!response.ok) throw new Error("Erro na API");

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Pronto!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro. Tente clicar em Vivificar de novo.";
    }
};

// 3. Ouvintes de Eventos (Botões)
document.getElementById('btnVivificar').addEventListener('click', geradorDeImagem);

document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
