// Hayvan ikonları listesinden rastgele bir hayvan seçmek için fonksiyon
function getRandomAnimalIcon() {
    const animalIcons = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐯", "🐸", "🐵", "🐧", "🐦", "🐤", "🐴", "🦄"];
    const randomIndex = Math.floor(Math.random() * animalIcons.length);
    return animalIcons[randomIndex];
}

// Görev ekleme fonksiyonu
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Lütfen bir görev girin.");
        return;
    }

    addTaskToList(taskValue);
    taskInput.value = ""; // Giriş alanını temizleme
    saveTasks(); // Görevleri kaydet
}

// Görev düzenleme fonksiyonu
function editTask(taskTextElement) {
    const currentText = taskTextElement.textContent;
    const newText = prompt("Görevi düzenle:", currentText);

    if (newText && newText.trim() !== "") {
        taskTextElement.textContent = newText.trim();
        saveTasks(); // Düzenlemeyi kaydet
    }
}

// Görevleri listeye ekleme fonksiyonu
function addTaskToList(taskValue, completed = false) {
    const taskList = document.getElementById("taskList");

    const listItem = document.createElement("li");

    // Rastgele bir hayvan ikonu ekleme
    const animalIcon = document.createElement("span");
    animalIcon.textContent = getRandomAnimalIcon();
    animalIcon.classList.add("animal-icon");
    listItem.appendChild(animalIcon);

    // Görev metnini ekleme
    const taskText = document.createElement("span");
    taskText.textContent = taskValue;
    listItem.appendChild(taskText);

    // Görev metnini düzenleme
    taskText.addEventListener("click", function () {
        editTask(taskText);
    });

    // Görevi tamamla butonu
    const completeButton = document.createElement("button");
    completeButton.textContent = "Tamamla";
    completeButton.onclick = function () {
        listItem.classList.toggle("completed");
        saveTasks(); // Görev durumu değişince kaydet
    };

    // Görev silme butonu
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.onclick = function () {
        listItem.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => {
            taskList.removeChild(listItem);
            saveTasks(); // Görev silindiğinde kaydet
            checkEmptyList(); // Liste boşsa mesajı tekrar göster
        }, 500);
    };

    // Butonları göreve ekleme
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    if (completed) {
        listItem.classList.add("completed");
    }

    // Görevi listeye ekleme
    taskList.appendChild(listItem);
}

// Liste boşsa uyarı mesajı gösterme fonksiyonu
function checkEmptyList() {
    const taskList = document.getElementById("taskList");
    if (taskList.children.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Henüz hiçbir görev eklenmedi.";
        emptyMessage.classList.add("empty-message");
        taskList.appendChild(emptyMessage);
    }
}

// Görevleri kaydetme
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span:not(.animal-icon)").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görevleri yükleme
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    }
}

// Başlangıçta liste boşsa bir mesaj göster ve görevleri yükle
window.onload = function () {
    checkEmptyList();
    loadTasks(); // Görevleri yükle
};
