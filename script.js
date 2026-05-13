document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoInput = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoInput) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Reset visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "A IA está desenhando agora...";

    // 1. Simplifica o texto para a IA não bugar (remove acentos e caracteres especiais)
    const textoSimples = textoInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 2. Monta o Prompt focado em Educação Especial (TEA/TGD)
    // Usamos termos em inglês internamente porque a IA entende 10x melhor
    const promptIA = `simple school sticker style, ${textoSimples}, white background, high resolution, vector art`;

    // 3. URL do Pollinations com parâmetros de segurança
    const seed = Math.floor(Math.random() * 9999);
    const url = `https://pollinations.ai/p/${encodeURIComponent(promptIA)}?width=512&height=512&seed=${seed}&model=flux`;

    // 4. Tenta carregar a imagem com um sistema de detecção de erro melhor
    imagem.src = url;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Imagem gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        // Plano B: Se a IA falhar, ele tenta buscar uma imagem pronta do Unsplash
        feedback.innerText = "A IA demorou muito. Tentando busca alternativa...";
        imagem.src = `https://source.unsplash.com/512x512/?${encodeURIComponent(textoSimples)},illustration`;
        imagem.classList.remove('hidden');
    };
});

// Botão de Áudio
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
