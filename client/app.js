// Conectar ao servidor Socket.IO
const socket = io();

// Configuração do vídeo
const configModal = document.getElementById('configModal');
const videoURLInput = document.getElementById('videoURL');
const setVideoBtn = document.getElementById('setVideoBtn');
const videoFrame = document.getElementById('videoFrame');

setVideoBtn.addEventListener('click', () => {
  const url = videoURLInput.value.trim();
  if (url === "") {
    alert("Por favor, insira uma URL válida.");
    return;
  }
  videoFrame.src = url;
  configModal.style.display = "none";
  addLog("Vídeo configurado: " + url);
});

// Controles de reprodução
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', () => {
  socket.emit('play', { command: 'play' });
  addLog("Você acionou PLAY");
});

pauseBtn.addEventListener('click', () => {
  socket.emit('pause', { command: 'pause' });
  addLog("Você acionou PAUSE");
});

// Chat
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg === "") return;
  socket.emit('chatMessage', { text: msg });
  chatInput.value = "";
}

// Recepção de mensagens do chat
socket.on('chatMessage', (data) => {
  const p = document.createElement('p');
  p.textContent = data.text;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Recepção de comandos do player
socket.on('play', (data) => {
  addLog("Comando PLAY recebido de outro usuário");
  // Em uma integração real, aqui seria implementada a lógica de sincronização
});
socket.on('pause', (data) => {
  addLog("Comando PAUSE recebido de outro usuário");
});

// Função para adicionar mensagens na área de log
function addLog(message) {
  const logDiv = document.getElementById('log');
  const p = document.createElement('p');
  p.textContent = message;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}