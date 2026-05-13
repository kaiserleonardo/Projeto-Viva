// Chave da sua API Pixabay
const API_KEY = '55845704-c55765e7328651ac8184f054a'; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const campoTexto = document.getElementById('textoEntrada');
    const texto = campoTexto.value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!texto) {
        feedback.innerText = "⚠️ Por favor, digite algo para ilustrar.";
        return;
    }

    // Início do carregamento visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "O V.I.V.A está processando a melhor imagem...";

    // --- LÓGICA DE TRATAMENTO DE TEXTO ---
    // Remove pontuação e palavras que "atrapalham" a busca da IA
    const stopWords = ["para", "com", "uma", "sobre", "pelo", "pela", "mais", "está", "estão", "coisa"];
    let palavras = texto.toLowerCase()
        .replace(/[.,!?;:]/g, "") 
        .split(/\s+/)
        .filter(p => p.length > 3 && !stopWords.includes(p));

    // Define o termo de busca (tenta usar as duas primeiras palavras importantes)
    let termoBusca = palavras.length > 0 ? palavras.slice(0, 2).join(" ") : texto.split(" ")[0];

    try {
        // 1ª TENTATIVA: Busca Ilustração (Melhor para TEA/TGD)
        let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(termoBusca)}&image_type=illustration&lang=pt&safesearch=true&category=education`;
        let response = await fetch(url);
        let data = await response.json();

        // 2ª TENTATIVA: Se não achou desenho, busca Foto Real
        if (!data.hits || data.hits.length === 0) {
            url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(termoBusca)}&image_type=photo&lang=pt&safesearch=true`;
            response = await fetch(url);
            data = await response.json();
        }

        // 3ª TENTATIVA: Se ainda não achou, simplifica a busca para apenas UMA palavra
        if ((!data.hits || data.hits.length === 0) && palavras.length > 1) {
            termoBusca = palavras[0];
            url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(termoBusca)}&image_type=illustration&lang=pt`;
            response = await fetch(url);
            data = await response.json();
        }

        if (data.hits && data.hits.length > 0) {
            const linkImagem = data.hits[0].largeImageURL;
            
            // Garante que a imagem carregou antes de mostrar na tela
            const imgTemp = new Image();
            imgTemp.src = linkImagem;
            imgTemp.onload = () => {
                imagem.src = linkImagem;
                imagem.classList.remove('hidden');
                loader.classList.add('hidden');
                feedback.innerText = `Mostrando resultado para: ${termoBusca.toUpperCase()}`;
            };
        } else {
            throw new Error("Nada encontrado");
        }

    } catch (error) {
        loader.classList.add('hidden');
        feedback.innerText = "❌ Não encontramos uma imagem. Tente usar termos simples (ex: Célula, Vulcão, Brasil).";
        console.error("Erro na busca:", error);
    }
});

// Função de voz (Acessibilidade Auditiva)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel(); 
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.85; 
        window.speechSynthesis.speak(fala);
    }
});
