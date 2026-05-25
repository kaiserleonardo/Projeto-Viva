document.addEventListener('DOMContentLoaded', () => {

    // 1. Configurações da API Premium (Myceli / Pollinations)
    const API_URL = "https://api.pollinations.ai/v1/images/generations"; 
    const API_KEY = "sk_jhTai3EahV5pzEac6pOofn27cG9N608m"; 
    const MODELO = "nanobanana"; // A IA específica que você escolheu

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    // 2. Função para Gerar Imagem usando Pólens
    btnVivificar.addEventListener('click', async () => {
        const promptRaw = textoEntrada.value.trim();

        if (!promptRaw) {
            alert("Por favor, digite o que você quer vivificar!");
            return;
        }

        // Interface: Carregando
        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Usando pólens para gerar imagem premium...";

        try {
            // Prompt otimizado para o modelo nanobanana
            const promptFinal = `Educational illustration of ${promptRaw}, high definition, vibrant colors, child-friendly, masterpiece style, white background.`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: MODELO,
                    prompt: promptFinal,
                    n: 1,
                    size: "1024x1024"
                })
            });

            if (!response.ok) {
                const erroData = await response.json();
                throw new Error(erroData.error?.message || "Erro ao gastar pólens");
            }

            const data = await response.json();
            
            // A resposta premium costuma vir em data.data[0].url
            const urlImagem = data.data[0].url;

            // Exibe o resultado
            imagemGerada.src = urlImagem;
            
            imagemGerada.onload = () => {
                if (loader) loader.classList.add('hidden');
                imagemGerada.classList.remove('hidden');
                feedback.innerText = "Vivificado com nanobanana (Premium)!";
            };

        } catch (error) {
            console.error("Erro:", error);
            if (loader) loader.classList.add('hidden');
            
            // Se os pólens acabarem, ele avisará aqui
            feedback.innerText = "Erro: " + error.message;
            alert("Verifique se seus pólens não acabaram ou se a chave está ativa.");
        }
    });

    // 3. Função de Voz (Mantida)
    btnOuvir.addEventListener('click', () => {
