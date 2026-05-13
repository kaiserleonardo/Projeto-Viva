document.getElementById('btnVivificar').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!texto) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // 1. Mostra que está carregando
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "IA criando imagem pedagógica...";

    // 2. O segredo do Pollinations: a gente monta a URL
    // Adicionamos "digital illustration" para a imagem ficar bonita e educativa
    const promptParaIA = `digital illustration, simple style, clean background, ${texto}`;
    
    // Esse link abaixo é o que faz a mágica. Ele envia o texto direto para o servidor deles.
    const urlMagica = `https://pollinations.ai/p/${encodeURIComponent(promptParaIA)}?width=1024&height=1024&nologo=true`;

    // 3. Colocamos o link na imagem
    imagem.src = urlMagica;

    // 4. Quando a IA terminar de desenhar, ela avisa o navegador e a imagem aparece
    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Pronto! Imagem gerada do zero.";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao gerar. Tente novamente.";
    };
});

// Botão de Áudio (Acessibilidade)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const som = new SpeechSynthesisUtterance(texto);
        som.lang = 'pt-BR';
        window.speechSynthesis.speak(som);
    }
});
