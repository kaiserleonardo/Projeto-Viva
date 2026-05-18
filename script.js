// Sua chave de Pólen do Pollinations
const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o conteúdo da aula.");
        return;
    }

    // Preparação visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Conectando ao modelo FLUX (VIP)...";

    // 1. Melhorando o prompt para educação (fundo branco e alta definição)
    // Forçamos a IA a não escrever textos para evitar aquelas letras estranhas.
    const promptFinal = `Professional educational illustration, 3D render style, clean white background, high contrast, vibrant colors. Topic: ${textoEntrada}. (No text, no labels, no words)`;
    
    const seed = Math.floor(Math.random() * 999999);

    // 2. URL configurada para o modelo pago (FLUX)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    try {
        // 3. Chamada da API usando seus PÓLENS
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro na conexão com os Pólens.");

        // 4. Recebe a imagem e exibe no site
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        
        imagem.src = objectURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração VIP gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro ao conectar. Verifique se seus Pólens estão ativos.";
    }
});

// Acessibilidade: Função de Voz
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
