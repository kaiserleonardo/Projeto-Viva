// TOKEN ATUALIZADO
const HF_TOKEN = "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";

document.getElementById('btnVivificar').onclick = async function() {
    const entrada = document.getElementById('textoEntrada');
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!entrada.value.trim()) {
        alert("Opa! Digita o que você quer ver primeiro.");
        return;
    }

    // Preparar visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Conectando com a IA...";

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: entrada.value.trim() }),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "IA acordando... tente de novo em 5 segundos.";
            loader.classList.add('hidden');
            return;
        }

        if (!response.ok) {
            throw new Error("Servidor fora do ar");
        }

        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        
        imagem.src = objectURL;
        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Sucesso!";
        };

    } catch (error) {
        console.error("Erro completo:", error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro de conexão. Tente usar o 4G do celular.";
    }
};

// FUNÇÃO DE VOZ
document.getElementById('btnOuvir').onclick = function() {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
};
