const userGuess = document.getElementById("guessInput").value;
const feedbackElement = document.getElementById("feedback");
let b0;
const Нело = [
    "Муж",
    "Мафия",
    "Нет",
    "Огонь",
    "1",
    "184",
    "Неизвестно",
    "О.М.П и Н.С",
]
const Кейкен = [
    "Муж",
    "Мафия",
    "Нет",
    "Луна/Ускорение",
    "1",
    "2207",
    "Гелу",
    "Понятие Звёзд",
]
function penis() {
    let randomIndex = Math.floor(Math.random() * 2);
    if (randomIndex === 0) {
        b0 = Нело;
    } else if (randomIndex === 1) {
        b0 = Кейкен;
    }
    return b0
}
penis();
document.getElementById("submitGuess").addEventListener("click", function() {
    feedbackElement.textContent = "";
    if (userGuess.toLowerCase() === "нело" || userGuess === "Нело") {
        for (let i = 0; i <= 7; i++) {
            if (Нело[i] === b0[i]) {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "red";
            }
        }
    }
    if (userGuess.toLowerCase() === "кейкен" || userGuess === "Кейкен") {
        for (let i = 0; i <= 7; i++) {
            if (Нело[i] === b0[i]) {
                feedbackElement.textContent += " a ";
                feedbackElement.style.color = "green";
            } 
            else {
                feedbackElement.textContent += " b ";
                feedbackElement.style.color = "red";
            }
        }
    }
});