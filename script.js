document.addEventListener('DOMContentLoaded', () => {

    // 1. Suas credenciais Premium
    const API_KEY = "sk_jhTai3EahV5pzEac6pOofn27cG9N608m"; 
    const MODELO = "nanobanana"; // Modelo premium escolhido

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    // 2. Gerador Premium (Via Link Direto)
    btnVivificar.addEventListener('click', () => {
        const promptRaw = textoEntrada.value.trim();

        if (!promptRaw) {
            alert("Por favor, digite o tema da aula!");
            return;
        }

        // Interface: Carregando
        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Gastando pólens... A IA nanobanana está trabalhando!";

        // Criamos o prompt em inglês para melhor qualidade
        const promptFinal = `Educational illustration of ${promptRaw}, high definition, vibrant colors, masterpiece style, white background, no text`;
        
        // Semente aleatória para nunca repetir a imagem
        const seed = Math.floor(Math.random() * 100000);

        // A MÁGICA AQUI: O novo endpoint gen.pollinations que aceita a chave na URL
        const novaUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(promptFinal)}?model=${MODELO}&width=1024&height=1024&seed=${seed}&key=${API_KEY}`;

        // Carrega a imagem diretamente (fura o bloqueio da escola)
        imagemGerada.src = novaUrl;

        // Quando a imagem terminar de carregar do servidor premium:
        imagemGerada.onload = () => {
            if (loader) loader.classList.add('hidden');
            imagemGerada.classList.remove('hidden');
            feedback.innerText = "Incrível! Aula vivificada em qualidade Premium.";
        };

        imagemGerada.onerror = () => {
            if (loader) loader.classList.add('hidden');
            feedback.innerText = "Erro ao carregar. Verifique seus pólens no site!";
        };
    });

    // 3. Função de Voz
    btnOuvir.addEventListener('click', () => {
        const texto = textoEntrada.value;
        if (texto) {
            window.speechSynthesis.cancel();
            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            window.speechSynthesis.speak(fala);
        } else {
            alert("Escreva algo para eu ler!");
        }
    });
});
