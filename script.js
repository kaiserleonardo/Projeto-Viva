// TOKEN NOVO ATUALIZADO
const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar hoje?");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Iniciando motor criativo... (Aguarde alguns segundos)";

    // Prompt focado em clareza para todas as matérias
    const promptFinal = `Educational illustration, clean 2D flat design, white background, vibrant colors, high resolution. Subject: ${textoEntrada}. No text, no words, simple shapes.`;

    async function query(data) {
        // Mudamos para o modelo 1.5 que é mais rápido e estável
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "A IA está carregando os dados... Quase pronto!";
            await new Promise(r => setTimeout(r, 5000));
            return query(data); 
        }

        if (!response.ok) throw new Error("Servidor em manutenção. Tente novamente.");

        return await response.blob();
    }

    try {
        const imageBlob = await query({ inputs: promptFinal });
        const imageURL = URL.createObjectURL(imageBlob);
        
        imagem.src = imageURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Ocorreu um erro. Clique em Vivificar novamente.";
    }
});

// VOZ PARA ACESSIBILIDADE
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});// TOKEN NOVO ATUALIZADO
const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar hoje?");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Iniciando motor criativo... (Aguarde alguns segundos)";

    // Prompt focado em clareza para todas as matérias
    const promptFinal = `Educational illustration, clean 2D flat design, white background, vibrant colors, high resolution. Subject: ${textoEntrada}. No text, no words, simple shapes.`;

    async function query(data) {
        // Mudamos para o modelo 1.5 que é mais rápido e estável
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "A IA está carregando os dados... Quase pronto!";
            await new Promise(r => setTimeout(r, 5000));
            return query(data); 
        }

        if (!response.ok) throw new Error("Servidor em manutenção. Tente novamente.");

        return await response.blob();
    }

    try {
        const imageBlob = await query({ inputs: promptFinal });
        const imageURL = URL.createObjectURL(imageBlob);
        
        imagem.src = imageURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Ocorreu um erro. Clique em Vivificar novamente.";
    }
});

// VOZ PARA ACESSIBILIDADE
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});// TOKEN NOVO ATUALIZADO
const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar hoje?");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Iniciando motor criativo... (Aguarde alguns segundos)";

    // Prompt focado em clareza para todas as matérias
    const promptFinal = `Educational illustration, clean 2D flat design, white background, vibrant colors, high resolution. Subject: ${textoEntrada}. No text, no words, simple shapes.`;

    async function query(data) {
        // Mudamos para o modelo 1.5 que é mais rápido e estável
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "A IA está carregando os dados... Quase pronto!";
            await new Promise(r => setTimeout(r, 5000));
            return query(data); 
        }

        if (!response.ok) throw new Error("Servidor em manutenção. Tente novamente.");

        return await response.blob();
    }

    try {
        const imageBlob = await query({ inputs: promptFinal });
        const imageURL = URL.createObjectURL(imageBlob);
        
        imagem.src = imageURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Ocorreu um erro. Clique em Vivificar novamente.";
    }
});

// VOZ PARA ACESSIBILIDADE
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});// TOKEN NOVO ATUALIZADO
const HF_TOKEN = "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"; 

document.getElementById('btnVivificar').addEventListener('click', async () => {
    const textoEntrada = document.getElementById('textoEntrada').value.trim();
    const loader = document.getElementById('loader');
    const imagem = document.getElementById('imagemGerada');
    const feedback = document.getElementById('feedback-txt');

    if (!textoEntrada) {
        alert("O que vamos estudar hoje?");
        return;
    }

    loader.classList.remove('hidden');
    imagem.classList.add('hidden');
    feedback.innerText = "Iniciando motor criativo... (Aguarde alguns segundos)";

    // Prompt focado em clareza para todas as matérias
    const promptFinal = `Educational illustration, clean 2D flat design, white background, vibrant colors, high resolution. Subject: ${textoEntrada}. No text, no words, simple shapes.`;

    async function query(data) {
        // Mudamos para o modelo 1.5 que é mais rápido e estável
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (response.status === 503) {
            feedback.innerText = "A IA está carregando os dados... Quase pronto!";
            await new Promise(r => setTimeout(r, 5000));
            return query(data); 
        }

        if (!response.ok) throw new Error("Servidor em manutenção. Tente novamente.");

        return await response.blob();
    }

    try {
        const imageBlob = await query({ inputs: promptFinal });
        const imageURL = URL.createObjectURL(imageBlob);
        
        imagem.src = imageURL;

        imagem.onload = () => {
            loader.classList.add('hidden');
            imagem.classList.remove('hidden');
            feedback.innerText = "Ilustração gerada com sucesso!";
        };

    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        feedback.innerText = "Ocorreu um erro. Clique em Vivificar novamente.";
    }
});

// VOZ PARA ACESSIBILIDADE
document.getElementById('btnOuvir').addEventListener('click', () => {
    const texto = document.getElementById('textoEntrada').value;
    if (texto) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        window.speechSynthesis.speak(fala);
    }
});
