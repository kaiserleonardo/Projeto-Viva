document.addEventListener('DOMContentLoaded', () => {

    // 1. Configuração da API DeepInfra
    const API_URL = "https://api.deepinfra.com/v1/inference/black-forest-labs/FLUX.1-schnell"; 
    const API_KEY = "QyqmCsVv8M46n2o19XS5hgNmwLHvI5op"; 

    // Mapeamento dos elementos do seu HTML
    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    // 2. Função Principal: Gerar Imagem
    btnVivificar.addEventListener('click', async () => {
        const textoEntradaValor = textoEntrada.value.trim();

        if (!textoEntradaValor) {
            alert("Por favor, digite o que você aprendeu hoje.");
            return;
        }

        // Interface: Mostra que está carregando
        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "A inteligência artificial está criando sua imagem...";

        // Criando o prompt focado em educação
        const promptFinal = `A simple, colorful educational illustration of ${textoEntradaValor}, high quality, vibrant colors, white background, no text, child-friendly style.`;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: promptFinal
                })
            });

            if (!response.ok) {
                const erroDados = await response.json();
                throw new Error(erroDados.error || "Erro na conexão com a DeepInfra");
            }

            const data = await response.json();
            
            // Na DeepInfra, a imagem vem dentro do array 'images'
            const urlImagem = data.images[0]; 

            // Atribui a imagem ao elemento <img>
            imagemGerada.src = urlImagem;
            
            imagemGerada.onload = () => {
                if (loader) loader.classList.add('hidden');
                imagemGerada.classList.remove('hidden');
                feedback.innerText = "Imagem gerada com sucesso!";
            };

        } catch (error) {
            console.error("Erro detalhado:", error);
            if (loader) loader.classList.add('hidden');
            feedback.innerText = "Erro: " + error.message;
            alert("Houve um problema ao gerar a imagem. Verifique se você ainda tem créditos na DeepInfra ou se a rede do colégio bloqueou o acesso.");
        }
    });

    // 3. Função de Voz (Acessibilidade)
    btnOuvir.addEventListener('click', () => {
        const texto = textoEntrada.value;
        if (texto) {
            window.speechSynthesis.cancel();
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            fala.rate = 0.9; // Velocidade mais calma para facilitar a compreensão
            window.speechSynthesis.speak(fala);
        } else {
            alert("Digite algo para eu ler!");
        }
    });
});
