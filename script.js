const HF_TOKEN = "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";

async function geradorDeImagem() {
    const entrada = document.getElementById('textoEntrada');
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!entrada.value.trim()) {
        alert("Digite um tema!");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Processando...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
            headers: { 
                "Authorization": "Bearer " + HF_TOKEN,
                "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify({ inputs: entrada.value.trim() })
        });

        if (response.status === 503) {
            feedback.innerText = "IA acordando... aguarde.";
            setTimeout(geradorDeImagem, 5000);
            return;
        }

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);
        
        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Pronto!";
        };
    } catch (e) {
        loader.classList.add('hidden');
        feedback.innerText = "Erro na rede.";
    }
}

document.getElementById('btnVivificar').onclick = geradorDeImagem;

document.getElementById('btnOuvir').onclick = function() {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
};
