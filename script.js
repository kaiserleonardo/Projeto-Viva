// 1. Configuração (Substitua pela URL e Key da nova API escolhida)
const API_URL = https://gen.pollinations.ai/image/a%20cat%20in%20space?model=flux ; 
const API_KEY = sk_4soEPmFACFCtPVWdDoE7wJkZcoAJfH64;

// 2. Função Principal
document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o tema da aula.");
        return;
    }

    // Preparação visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "IA preparando a imagem educativa...";

    // Prompt otimizado para educação inclusiva
    const promptFinal = `Educational illustration of ${textoEntrada}, high quality, vibrant colors, white background, simple style for kids, no text.`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: promptFinal,
                n: 1,
                size: "512x512"
            })
        });

        if (!response.ok) {
            const erroDetalhado = await response.json();
            throw new Error(erroDetalhado.error?.message || "Erro na API");
        }

        const data = await response.json();
        
        // A maioria das APIs retorna um campo 'url' ou 'image_url'
        const urlImagem = data.url || data.images[0].url || data.data[0].url;

        imagem.src = urlImagem;
        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Imagem carregada com sucesso!";
        };

    } catch (error) {
        console.error("Erro na requisição:", error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: " + error.message;
    }
});

// 3. Função de Voz (Esta parte está perfeita!)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
