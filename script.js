document.addEventListener('DOMContentLoaded', () => {

    // 1. Configuração SiliconFlow com a sua chave
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
            alert("Por favor, digite o tema da aula para vivificar!");
            return;
        }

        // Interface: Mostra carregamento
        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "A IA está desenhando sua aula...";

        try {
            // Prompt otimizado para o projeto V.I.V.A
            const promptFinal = `Educational illustration of ${promptRaw}, vibrant colors, simple shapes, white background, high quality, 4k, digital art style, no text.`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "black-forest-labs/FLUX.1-schnell", // O modelo mais rápido da atualidade
                    prompt: promptFinal,
                    batch_size: 1,
                    width: 1024,
                    height: 1024
                })
            });

            if (!response.ok) {
                const erroData = await response.json();
                console.error("Detalhes do erro:", erroData);
                throw new Error(erroData.message || "Erro na conexão com a SiliconFlow");
            }

            const data = await response.json();
            console.log("Resposta recebida:", data);

            // Na SiliconFlow, a URL costuma vir em data.images[0].url
            const urlImagem = data.images[0].url || data.images[0];

            if (!urlImagem) throw new Error("Imagem não encontrada na resposta.");

            // Atribui a imagem ao elemento HTML
            imagemGerada.src = urlImagem;
            
            imagemGerada.onload = () => {
                if (loader) loader.classList.add('hidden');
                imagemGerada.classList.remove('hidden');
                feedback.innerText = "Aula vivificada com sucesso!";
            };

        } catch (error) {
            console.error("Erro completo:", error);
            if (loader) loader.classList.add('hidden');
            
            // Se der erro de rede (bloqueio da escola), avisa o usuário
            if (error.message.includes("fetch") || error.message.includes("Network")) {
                feedback.innerText = "A rede da escola bloqueou a IA. Tente usar o roteador do celular.";
            } else {
                feedback.innerText = "Erro: " + error.message;
            }
        }
    });

    // 3. Função de Voz (Acessibilidade)
    btnOuvir.addEventListener('click', () => {
        const texto = textoEntrada.value;
        if (texto) {
            window.speechSynthesis.cancel();
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            fala.rate = 0.9; 
            window.speechSynthesis.speak(fala);
        } else {
            alert("Escreva algo para eu ler primeiro!");
        }
    });
});
