// Sua chave de Pólen do Pollinations
const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Usando seus Pólens para gerar imagem em Alta Definição...";

    // 1. Prompt "Blindado": Mandamos ordens em inglês para a IA não se confundir
    // mas pedimos um estilo de livro didático 3D e SEM TEXTO.
    const promptFinal = `High-quality 3D educational illustration, professional textbook style, clean white background, high contrast. Topic: ${textoEntrada}. (No text, no labels, no words, no letters inside the image)`;
    
    const seed = Math.floor(Math.random() * 999999);

    // 2. A URL que ativa o modelo FLUX e envia sua chave
    // O segredo para a qualidade é o "&model=flux"
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux&key=${POLLINATIONS_API_KEY}`;

    // 3. Carregamento Direto (Evita o erro de conexão do navegador)
    imagem.src = url;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração VIP gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao carregar imagem. Verifique seu saldo de Pólens.";
    };
});

// Botão de Áudio (Acessibilidade)
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
