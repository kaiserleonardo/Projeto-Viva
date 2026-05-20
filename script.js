document.addEventListener('DOMContentLoaded', () => {

    // 1. Configuração SiliconFlow (Usando SDXL que é mais estável)
    const API_URL = "https://api.siliconflow.cn/v1/images/generations"; 
    const API_KEY = "sk-ullcbuqyyyhbedlsnmgvlbitomdrskfmchfneihlibklnzls"; 

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    // 2. Função de Gerar Imagem
    btnVivificar.addEventListener('click', async () => {
        const promptRaw = textoEntrada.value.trim();

        if (!promptRaw) {
            alert("Por favor, digite o tema da aula!");
            return;
        }

        // Interface: Mostra carregamento
        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Conectando ao servidor estável...";

        try {
            const promptFinal = `Educational illustration, ${promptRaw}, vibrant colors, white background, simple for kids, high quality.`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // Trocamos para o SDXL que raramente fica "indisponível"
                    model: "stabilityai/stable-diffusion-xl-base-1.0",
                    prompt: promptFinal,
                    batch_size: 1,
                    image_size: "1024x1024" 
                })
            });

            if (!response.ok) {
                const erroData = await response.json();
                console.error("Erro detalhado:", erroData);
                // Se der erro de modelo, o código vai cair no catch
                throw new Error(erroData.message || "Servidor ocupado");
            }

            const data = await response.json();
            
            // Pega a URL da imagem (padrão SiliconFlow)
            const urlImagem = data.images[0].url;

            if (!urlImagem) throw new Error("URL da imagem não encontrada.");

            imagemGerada.src = urlImagem;
            
            imagemGerada.onload = () => {
                if (loader) loader.classList.add('hidden');
                imagemGerada.classList.remove('hidden');
                feedback.innerText = "Aula vivificada!";
            };

        } catch (error) {
            console.error("Erro capturado:", error);
            if (loader) loader.classList.add('hidden');
            
            // Mensagem personalizada para te ajudar
            if (error.message.includes("Model is not available")) {
                feedback.innerText = "A IA está em manutenção. Tente novamente em 1 minuto.";
            } else {
                feedback.innerText = "Erro: " + error.message;
            }
        }
    });

    // 3. Função de Voz
    btnOuvir.addEventListener('click', () => {
        const texto = textoEntrada.value;
        if (texto) {
            window.speechSynthesis.cancel();
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            window.speechSynthesis.speak(fala);
        }
    });
});
