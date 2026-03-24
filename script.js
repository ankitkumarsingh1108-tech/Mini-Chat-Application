const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let messages = JSON.parse(localStorage.getItem("chat")) || [];

function getTime() {
  const d = new Date();
  return d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0");
}

function renderMessages() {
  messagesDiv.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = `message ${msg.sender}`;
    div.innerHTML = `
      ${msg.text}
      <div class="time">${msg.time}</div>
    `;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function botReply() {
  const replies = [
    "Hello 👋",
    "How can I help you?",
    "Nice to chat with you 😊",
    "That's interesting!",
    "Tell me more 🤔"
  ];
  const text = replies[Math.floor(Math.random() * replies.length)];
  messages.push({ sender: "bot", text, time: getTime() });
  saveMessages();
}

function saveMessages() {
  localStorage.setItem("chat", JSON.stringify(messages));
  renderMessages();
}

sendBtn.onclick = () => {
  if (input.value.trim() === "") return;

  messages.push({
    sender: "user",
    text: input.value,
    time: getTime()
  });

  input.value = "";
  saveMessages();

  setTimeout(botReply, 800);
};
document.getElementById("clearLastBtn").onclick = () => {
  // remove bot message
  messages.pop();

  // remove user message
  messages.pop();

  saveMessages();
};


renderMessages();
