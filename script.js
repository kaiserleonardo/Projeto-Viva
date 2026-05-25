document.addEventListener('DOMContentLoaded', () => {

    const API_URL = "https://api.siliconflow.cn/v1/images/generations"; 
    const API_KEY = "sk-ullcbuqyyyhbedlsnmgvlbitomdrskfmchfneihlibklnzls"; 

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    btnVivificar.addEventListener('click', async () => {
        const promptRaw = textoEntrada.value.trim();
        if (!promptRaw) return alert("Digite algo!");

        loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Tentando conexão com a IA...";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // MODELO V1.5: O mais rápido e estável para redes lentas
                    model: "stabilityai/stable-diffusion-v1-5", 
                    prompt: `Educational drawing of ${promptRaw}, simple, colorful, white background`,
                    batch_size: 1
                })
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.message || "Servidor ocupado.");
            }

            const data = await response.json();
            const urlImagem = data.images[0].url || data.images[0];

            imagemGerada.src = urlImagem;
            imagemGerada.onload = () => {
                loader.classList.add('hidden');
                imagemGerada.classList.remove('hidden');
                feedback.innerText = "Sucesso!";
            };

        } catch (error) {
            console.error(error);
            loader.classList.add('hidden');
            
            // Diagnóstico certeiro
            if (error.message.includes("fetch") || error.name === "TypeError") {
                feedback.innerText = "BLOQUEIO DE REDE: O Wi-Fi da escola não permite o acesso. Use o 4G do celular.";
            } else {
                feedback.innerText = "Erro: " + error.message;
            }
        }
    });

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
