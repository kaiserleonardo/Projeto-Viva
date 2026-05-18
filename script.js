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
    feedback.innerText = "Conectando ao servidor VIP do V.I.V.A...";

    // 1. Prompt reforçado para Português e Alta Qualidade
    // O Pollinations lê a chave também via parâmetro na URL em alguns casos, vamos garantir:
    const promptFinal = `educational illustration, simple flat design, white background, high contrast, Brazilian Portuguese labels. Topic: ${textoEntrada}`;
    const seed = Math.floor(Math.random() * 99999);

    // 2. Montagem da URL com o modelo FLUX
    // Adicionamos a chave direto na URL para testar a aceitação do servidor
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=768&height=768&seed=${seed}&nologo=true&model=flux&key=${POLLINATIONS_API_KEY}`;

    // 3. Carregamento Direto (Evita o erro de "Conexão" do Fetch)
    imagem.src = url;

    imagem.onload = () => {
        loader.classList.add('hidden');
        imagem.classList.remove('hidden');
        feedback.innerText = "Ilustração gerada com sucesso!";
    };

    imagem.onerror = () => {
        loader.classList.add('hidden');
        feedback.innerText = "O servidor demorou a responder. Tente clicar novamente.";
    };
});

// Acessibilidade Áudio
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
