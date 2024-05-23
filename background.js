chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((message) => {
        const question = message.question;
        getResponse(question).then(async (answer) => {
            const resRead = answer.getReader();
            while (true) {
                const { done, value } = await resRead.read();
                if (done) break;
                if (done === undefined || value === undefined) {
                    port.postMessage('ERROR');
                } else {
                    const data = new TextDecoder().decode(value);
                    port.postMessage(data);
                }
            }
        }).catch((e) => {
            port.postMessage(e);
            console.error("Error in processing message:", e);
        });
    });
});



const getResponse = async (question) => {
    const openai_api_key = process.env.OPENAI_API_KEY
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${openai_api_key}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a chatbot that explains content of the user message with 100 words max." },
                        { role: "user", content: question }
                    ]
                })
            });
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const data = await response.json();
            resolve(data.choices[0].message.content);
        } catch (e) {
            console.error("Error in getResponse:", e);
        }
    });
};
