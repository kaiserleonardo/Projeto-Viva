const DEEPAI_API_KEY = "hmMTTRIw.nZK9GzankyONxemC9wzwD8ILh3tehwnW";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Estado visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "A DeepAI está gerando sua imagem do zero...";

    try {
        // A DeepAI pede os dados em formato FormData
        const formData = new FormData();
        formData.append('text', `educational illustration, simple flat design, white background, ${textoEntrada}`);
        formData.append('grid_size', '1');

        const response = await fetch("https://api.deepai.org/api/text2img", {
            method: "POST",
            headers: {
                "api-key": DEEPAI_API_KEY
            },
            body: formData
        });

        const data = await response.json();

        if (data.output_url) {
            imagem.src = data.output_url;

            imagem.onload = () => {
                loader.classList.add('hidden');
                imagem.classList.remove('hidden');
                feedback.innerText = "Imagem gerada com sucesso pela DeepAI!";
            };
        } else {
            throw new Error("Falha na resposta da API.");
        }

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: Verifique seus créditos na DeepAI ou a conexão.";
    }
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
