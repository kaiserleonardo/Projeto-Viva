try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: promptFinal,
                num_inference_steps: 4 // Deixa mais rápido para redes lentas
            })
        });

        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            const erroCorpo = await response.json();
            console.error("Erro da API:", erroCorpo);
            throw new Error(erroCorpo.detail || "Erro desconhecido na API");
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);
        
        // Ajuste de segurança para capturar a imagem em diferentes formatos
        const urlImagem = data.images ? data.images[0] : (data.output ? data.output[0] : null);

        if (!urlImagem) {
            throw new Error("A IA não devolveu uma imagem válida.");
        }

        imagemGerada.src = urlImagem;
        
        imagemGerada.onload = () => {
            if (loader) loader.classList.add('hidden');
            imagemGerada.classList.remove('hidden');
            feedback.innerText = "Vivificado!";
        };

    } catch (error) {
        console.error("Erro detalhado no Console:", error);
        if (loader) loader.classList.add('hidden');
        
        // Se o erro for de conexão (Failed to fetch), avisa sobre o bloqueio
        if (error.message.includes("fetch")) {
            feedback.innerText = "A rede da escola bloqueou a conexão. Use o 4G do celular.";
        } else {
            feedback.innerText = "Erro: " + error.message;
        }
    }
