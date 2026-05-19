// CONFIGURAÇÃO DO NOVO MOTOR (Hugging Face)
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

    // Reset de Interface
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Conectando com a IA... (Isso pode levar 30s na primeira vez)";

    // Prompt Otimizado para Multimatérias (Focado em TEA/TGD: Limpo e Direto)
    const promptFinal = `High-quality educational 2D vector illustration, clean minimalist style, white background, vibrant colors. Subject: ${textoEntrada}. Professional graphic design, NO text, NO words, NO blurry lines.`;

    // Função para tentar carregar a IA (com sistema de espera)
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        // Se a IA estiver "acordando", ela retorna erro 503
        if (response.status === 503) {
            feedback.innerText = "A IA está ligando os motores... Aguarde um instante...";
            await new Promise(r => setTimeout(r, 5000)); // Espera 5 segundos
            return query(data); // Tenta de novo automaticamente
        }

        if (!response.ok) throw new Error("Erro na conexão com o servidor.");

        const result = await response.blob();
        return result;
    }

    try {
        const imageBlob = await query({ inputs: promptFinal });
        const imageURL = URL.createObjectURL(imageBlob);
        
        imagem.src = imageURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração pronta! Use para apoiar seu aprendizado.";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Servidor ocupado. Clique em 'Vivificar' novamente em instantes.";
    }
});

// FUNÇÃO DE VOZ (ACESSIBILIDADE)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9; 
        window.speechSynthesis.speak(fala);
    }
});
