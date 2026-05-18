// CHAVE DE PÓLEN (Pollinations)
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

    // Reset visual
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "STATUS V.I.V.A: Gerando com Pólens (Modelo FLUX)...";

    // Criando o comando para a IA
    const promptFinal = `Professional educational 3D illustration, clean white background, high resolution. Topic: ${textoEntrada}. No text.`;
    const seed = Math.floor(Math.random() * 999999);

    // URL formatada para usar seus créditos
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    try {
        // Tentativa de conexão VIP
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${POLLINATIONS_API_KEY}`
            }
        });

        if (!response.ok) throw new Error("Erro de saldo nos Pólens ou conexão.");

        const blob = await response.blob();
        imagem.src = URL.createObjectURL(blob);

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração Gerada com Sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        // Se este erro aparecer, saberemos que é problema de conexão ou saldo de pólen
        feedback.innerText = "ERRO DE PÓLEN: " + error.message;
    }
});

// Acessibilidade: Voz
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
