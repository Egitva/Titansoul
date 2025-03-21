const correctWord = "example";
const Нело = [
    a1 = "Муж",
    a2 = "Мафия",
    a3 = "Нет",
    a4 = "Огонь",
    a5 = "1",
    a6 = "184",
    a7 = "Неизвестно",
    a8 = "О.М.П и Н.С",
]
const Кейкен = [
    a1 = "Муж",
    a2 = "Мафия",
    a3 = "Нет",
    a4 = "Луна/Ускорение",
    a5 = "1",
    a6 = "2207",
    a7 = "Гелу",
    a8 = "Понятие Звёзд",
]
const Char = [
    b0 = randomIndex = Math.floor(Math.random() * Nelo.length),
    b1 = b0.a1,
    b2 = b0.a2,
]

document.getElementById("submitGuess").addEventListener("click", function() {
    const userGuess = document.getElementById("guessInput").value;
    const feedbackElement = document.getElementById("feedback");

    if (userGuess.toLowerCase() === correctWord.toLowerCase()) {
        feedbackElement.textContent += " a ";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent += " a ";
        feedbackElement.style.color = "red";
    }
});
