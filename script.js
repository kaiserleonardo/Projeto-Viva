// CONFIGURAÇÃO VIP POLLINATIONS
const POLLINATIONS_API_KEY = "sk_Nqx1YGWzxsCvXumU8OVgKypzc7s2r77E";

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("Por favor, digite o tema da aula.");
        return;
    }

    // Reset de Interface
    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Processando via FLUX Engine (Alta Precisão)...";

    // ENGENHARIA DE PROMPT BLINDADA
    // Adicionamos termos técnicos que forçam a IA a usar bancos de dados científicos.
    const instrucoesFixas = "Professional medical atlas illustration, 3D anatomical model, high detail, sharp focus, clean white background, high contrast, textbook style, scientific accuracy.";
    const proibicoes = "NO text, NO labels, NO letters, NO blurry parts, NO artistic filters.";
    
    const promptFinal = `${instrucoesFixas} Topic: ${textoEntrada}. ${proibicoes}`;
    
    const seed = Math.floor(Math.random() * 9999999);

    // URL OTIMIZADA: Aumentamos a resolução para o máximo do FLUX (1024)
    // Passamos a chave diretamente para garantir o uso dos Pólens
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptFinal)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux&key=${POLLINATIONS_API_KEY}`;

    try {
        // Validação da conexão com os Pólens
        const response = await fetch(url);

        if (!response.ok) throw new Error("Falha na conexão com o servidor VIP.");

        // Carregamento da Imagem como Blob (mais estável para o navegador)
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        
        imagem.src = imageObjectURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração Gerada com Sucesso!";
        };

    } catch (error) {
        console.error("Erro técnico:", error);
        loader.classList.add('hidden');
        feedback.innerText = "Erro: " + error.message + ". Tente gerar novamente.";
    }
});

// ACESSIBILIDADE: VOZ
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9; // Um pouco mais lento para clareza
        window.speechSynthesis.speak(fala);
    }
});
