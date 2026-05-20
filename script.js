document.addEventListener('DOMContentLoaded', () => {

    // 1. Configuração da API
    const API_URL = "https://api.deepinfra.com/v1/inference/stabilityai/stable-diffusion-xl-base-1.0"; 
    const API_KEY = "QyqmCsVv8M46n2o19XS5hgNmwLHvI5op"; 

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    // 2. Função de Gerar Imagem (OLHE O ASYNC AQUI ABAIXO)
    btnVivificar.addEventListener('click', async () => {
        const textoParaGerar = textoEntrada.value.trim();

        if (!textoParaGerar) {
            alert("Por favor, digite o que você aprendeu hoje.");
            return;
        }

        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Conectando ao servidor de arte...";

        try {
            const promptFinal = `High quality educational illustration of ${textoParaGerar}, vibrant colors, white background, 4k, simple style, no text.`;

            // O "await" aqui só funciona porque colocamos "async" lá em cima!
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    input: promptFinal,
                    prompt: promptFinal
                })
            });

            if (!response.ok) {
                const erroData = await response.json();
                throw new Error(erroData.detail?.error || "O servidor está ocupado.");
            }

            const data = await response.json();
            const urlImagem = data.images?.[0] || data.output?.[0] || data[0];

            if (!urlImagem) {
                throw new Error("A imagem não foi encontrada na resposta da IA.");
            }

            imagemGerada.src = urlImagem;
            
            imagemGerada.onload = () => {
                if (loader) loader.classList.add('hidden');
                imagemGerada.classList.remove('hidden');
                feedback.innerText = "Imagem vivificada com sucesso!";
            };

        } catch (error) {
            console.error("Erro completo:", error);
            if (loader) loader.classList.add('hidden');
            feedback.innerText = "Ops! Tente novamente em alguns segundos. Erro: " + error.message;
        }
    });

    // 3. Função de Voz
    btnOuvir.addEventListener('click', () => {
        const texto = textoEntrada.value;
        if (texto) {
            window.speechSynthesis.cancel();
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            fala.rate = 0.9;
            window.speechSynthesis.speak(fala);
        } else {
            alert("Escreva algo para eu ler!");
        }
    });
});
