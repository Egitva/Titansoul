var b0;
const Нело = [
    "Муж",
    "Мафия",
    "Нет",
    "Огонь",
    "1",
    "184",
    "Неизвестно",
    "О.М.П и Н.С",
];
const Кейкен = [
    "Муж",
    "Мафия",
    "Нет",
    "Луна/Ускорение",
    "1",
    "2207",
    "Гелу",
    "Понятие Звёзд",
];
function Randomer() {
    let randomIndex = Math.floor(Math.random() * 2); // 0 или 1
    b0 = randomIndex === 0 ? Нело : Кейкен;
}

document.getElementById("submitGuess").addEventListener("click", function() {
    const userGuess = document.getElementById("guessInput").value;
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = ""; // Очищаем предыдущие результаты
    
    if (userGuess.toLowerCase() === "нело") {
        for (let i = 0; i < Нело.length; i++) {
            if (Нело[i] === b0[i]) {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "кейкен") {
        for (let i = 0; i < Кейкен.length; i++) {
            if (Кейкен[i] === b0[i]) {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "red";
            }
        }
    }
});

Randomer();