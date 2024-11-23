const revealBtn = document.getElementById("reveal-btn");
const selectedCard = document.getElementById("selected-card");
const cardBack = document.getElementById("card-back");
const missionText = document.getElementById("mission-text");
const concluidasList = document.getElementById("concluidas-list");
const detailsModal = document.getElementById("details-modal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");
const completeTaskBtn = document.getElementById("complete-task-btn");
const closeDetailsBtn = document.getElementById("close-details-btn");
const closeModalIcon = document.querySelector(".close-modal");

const tarefas = [
  {
    tarefa: "Arrumar a lavanderia",
    detalhes: "Organize os produtos de limpeza em prateleiras. Certifique-se de separar os itens por categoria (sabão, amaciantes, etc.). Varra e passe pano no chão."
  },
  {
    tarefa: "Limpar em cima da coluna do banheiro",
    detalhes: "Use um pano úmido com um pouco de desinfetante. Certifique-se de remover poeira acumulada e seque bem para evitar manchas."
  },
  {
    tarefa: "Limpar teto da cozinha",
    detalhes: "Com uma escada, use um pano embebido em água morna e detergente para remover gordura. Passe um pano seco para finalizar."
  },
  {
    tarefa: "Colocar bucal da lâmpada do quarto do Chico",
    detalhes: "Certifique-se de desligar a energia. Coloque o bucal no encaixe, conecte os fios corretamente e parafuse. Teste antes de ligar novamente."
  },
  {
    tarefa: "Arrumar baú da cama",
    detalhes: "Retire todos os itens do baú. Organize roupas ou objetos por categoria antes de recolocá-los de forma ordenada."
  },
  {
    tarefa: "Trocar torneiras",
    detalhes: "Desligue o registro de água. Desrosqueie a torneira antiga e coloque a nova com fita veda-rosca. Aperte bem para evitar vazamentos."
  }
];

// Recupera as missões concluídas e a carta atual do LocalStorage
const loadProgress = () => {
  const concluidas = JSON.parse(localStorage.getItem('concluidas')) || [];
  const tarefaAtualIndex = localStorage.getItem('tarefaAtualIndex');

  // Exibe as missões concluídas
  concluidas.forEach(tarefa => {
    const taskItem = document.createElement("div");
    taskItem.textContent = tarefa;
    concluidasList.appendChild(taskItem);
  });

  // Se há uma carta atualmente selecionada, exibe a missão na carta
  if (tarefaAtualIndex) {
    const selectedTask = tarefas[tarefaAtualIndex];
    missionText.textContent = selectedTask.tarefa;
    modalTitle.textContent = selectedTask.tarefa;
    modalDetails.textContent = selectedTask.detalhes;
    completeTaskBtn.dataset.index = tarefaAtualIndex;
    cardBack.style.transform = "rotateY(180deg)";
    selectedCard.classList.remove("hidden");
  }
};

// Salva as missões concluídas no LocalStorage
const saveProgress = () => {
  const concluidas = [];
  document.querySelectorAll("#concluidas-list div").forEach(item => {
    concluidas.push(item.textContent);
  });
  localStorage.setItem('concluidas', JSON.stringify(concluidas));
};

// Revela a próxima carta de missão
function revealCard() {
  if (!selectedCard.classList.contains("hidden")) return;

  // Evita que o mesmo índice seja usado novamente
  const randomIndex = Math.floor(Math.random() * tarefas.length);

  cardBack.style.transform = "rotateY(180deg)";
  selectedCard.classList.remove("hidden");
  missionText.textContent = tarefas[randomIndex].tarefa;

  // Atualiza os detalhes da tarefa no modal
  modalTitle.textContent = tarefas[randomIndex].tarefa;
  modalDetails.textContent = tarefas[randomIndex].detalhes;

  // Salva índice para conclusão posterior
  completeTaskBtn.dataset.index = randomIndex;

  // Salva a carta atual no LocalStorage
  localStorage.setItem('tarefaAtualIndex', randomIndex);
  detailsModal.classList.add("show");
}

// Conclui a tarefa e move para as concluídas
function completeTask() {
  const index = parseInt(completeTaskBtn.dataset.index, 10);
  const completedTask = tarefas.splice(index, 1)[0];

  // Adiciona à lista de concluídas
  const taskItem = document.createElement("div");
  taskItem.textContent = completedTask.tarefa;
  concluidasList.appendChild(taskItem);

  // Salva a missão concluída no LocalStorage
  saveProgress();

  // Fecha o modal e reseta a carta
  detailsModal.classList.remove("show");
  resetCard();
}

// Reseta a carta e esconde
function resetCard() {
  cardBack.style.transform = "rotateY(0deg)";
  selectedCard.classList.add("hidden");
  missionText.textContent = "";

  // Remove a carta atual do LocalStorage
  localStorage.removeItem('tarefaAtualIndex');
}

revealBtn.addEventListener("click", revealCard);
closeDetailsBtn.addEventListener("click", () => detailsModal.classList.remove("show"));
closeModalIcon.addEventListener("click", () => detailsModal.classList.remove("show"));
completeTaskBtn.addEventListener("click", completeTask);

// Carrega o progresso quando a página for carregada
window.addEventListener("load", loadProgress);
