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

    // Início do carregamento
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "O V.I.V.A está processando sua imagem...";

    // 1. Limpeza de texto: pega a palavra mais significativa
    const conectores = ["para", "com", "uma", "sobre", "pelo", "pela", "mais"];
    let palavras = texto.toLowerCase()
        .replace(/[.,!?;:]/g, "") // Remove pontuação
        .split(/\s+/)
        .filter(p => p.length > 3 && !conectores.includes(p));

    // Se o filtro limpar tudo, pega a maior palavra do texto original
    let termoBusca = palavras.length > 0 ? palavras[0] : texto.split(" ").sort((a,b) => b.length - a.length)[0];

    try {
        // TENTATIVA 1: Buscar Ilustração (Estilo desenho para TEA)
        let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(termoBusca)}&image_type=illustration&lang=pt&safesearch=true`;
        let response = await fetch(url);
        let data = await response.json();

        // TENTATIVA 2: Se não achar ilustração, busca foto real
        if (!data.hits || data.hits.length === 0) {
            url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(termoBusca)}&image_type=photo&lang=pt&safesearch=true`;
            response = await fetch(url);
            data = await response.json();
        }

        if (data.hits && data.hits.length > 0) {
            const linkImagem = data.hits[0].largeImageURL;
            
            // Pré-carregamento da imagem para evitar erro de exibição
            const imgTemp = new Image();
            imgTemp.src = linkImagem;
            imgTemp.onload = () => {
                imagem.src = linkImagem;
                imagem.classList.remove('hidden');
                loader.classList.add('hidden');
                feedback.innerText = `Sucesso! Mostrando: ${termoBusca}`;
            };
        } else {
            throw new Error("Nada encontrado");
        }

    } catch (error) {
        loader.classList.add('hidden');
        feedback.innerText = "❌ Não encontramos uma imagem para esse termo. Tente uma palavra mais simples.";
    }
});

// Botão Ouvir (Sintetizador de Voz)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel(); // Para o que estiver falando
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9; 
        window.speechSynthesis.speak(fala);
    }
});