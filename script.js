const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement) =>{
    const API_URL='https://api.openai.com/v1/chat/completions ';
    const messageElement = incomingChatLI.querySelector("p");

    const requestOptions = {
        method:"POST", 
        headers:{
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": userMessage}]
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        console.log(data);
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch((error) =>{
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong";
        console.log(error);
    }).finally(() =>{
        chatbox.scrollTo(0, chatbox.scrollHeight); 
    })
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    console.log(userMessage);

    if(!userMessage) return;
    chatInput.value = "";
    chatInput.computedStyleMap.height = `${inputInitHeight}px`
    //append user msg to the chatbox
    chatbox.appenChild(createChatLi (userMessage, "outgoing")) ;
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() =>{
        const incomingChatLI = createChatLi("Thinking..", "incoming")
        chatbox.appendChild(incomingChatLI);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        generateResponse(incomingChatLI);
    },600);
}
chatInput.addEventListener("input", ()=>{
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;

});
chatInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);
