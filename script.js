document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = "sk_jhTai3EahV5pzEac6pOofn27cG9N608m"; 
    const MODELO = "nanobanana"; 

    const btnVivificar = document.getElementById('btnVivificar');
    const btnOuvir = document.getElementById('btnOuvir');
    const textoEntrada = document.getElementById('textoEntrada');
    const imagemGerada = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');
    const loader = document.getElementById('loader');

    btnVivificar.addEventListener('click', () => {
        const promptRaw = textoEntrada.value.trim();

        if (!promptRaw) {
            alert("Por favor, digite o tema da aula!");
            return;
        }

        if (loader) loader.classList.remove('hidden');
        imagemGerada.classList.add('hidden');
        feedback.innerText = "Gastando pólens... A IA nanobanana está trabalhando!";

        const promptFinal = `Educational illustration of ${promptRaw}, high definition, vibrant colors, masterpiece style, white background, no text`;
        const seed = Math.floor(Math.random() * 100000);

        // O link mágico que fura bloqueios e usa seus pólens
        const novaUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(promptFinal)}?model=${MODELO}&width=1024&height=1024&seed=${seed}&key=${API_KEY}`;

        imagemGerada.src = novaUrl;

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
