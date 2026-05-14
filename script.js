const OPENAI_API_KEY = "SUA_CHAVE_AQUI"; // Substitua pela sua chave da OpenAI

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Digite o que deseja gerar.");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "A inteligência mais avançada está criando sua imagem...";

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3", // O modelo mais potente
                prompt: `Ilustração educacional em estilo flat design, traços claros, fundo branco, alta qualidade, tema: ${textoEntrada}`,
                n: 1,
                size: "1024x1024"
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const urlGerada = data.data[0].url;
        imagem.src = urlGerada;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Imagem gerada com DALL-E 3!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: Verifique seus créditos ou a chave da API.";
    }
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
