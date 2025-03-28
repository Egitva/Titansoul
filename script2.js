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
    "Луна/Ускорение/Гура",
    "2207",
    "191",
    "Гелу",
    "Понятие Звёзд",
];
const Холден = [
    "Муж",
    "The Evil Mountians",
    "Тело/Аура",
    "Мастер Тенто",
    "а+а",
    "282",
    "Гелу",
    "Несуществующие Зубы",
];
const ДуоЛуо = [
    "Муж",
    "Мафия",
    "Призыв",
    "Мастер Тенто",
    "1 262 558 032 573 905 771 000 000 000 000 000 000 000 000",
    "256",
    "Гелу",
    "О.М.П и Н.С",
];
const Росса = [
    "Жен",
    "Мафия",
    "Тело",
    "Огонь/Гура",
    "3000",
    "171",
    "Гелу",
    "Понятие Звёзд",
];
const Лола = [
    "Жен",
    "The Evil Mountians",
    "Аура",
    "Неон",
    "1000",
    "185",
    "Нулл",
    "Несуществующие Зубы",
];
const Рене = [
    "Муж",
    "The Evil Mountians",
    "Мир",
    "Молния",
    "224",
    "186",
    "Неизвестно",
    "Сын Священника",
];
const Шенми = [
    "Муж",
    "Мафия",
    "Аура",
    "Тьма",
    "79850",
    "Неизвестно",
    "Гелу",
    "О.М.П и Н.С",
];
const Фокси = [
    "Муж",
    "The Evil Mountians",
    "Тело",
    "Гура",
    "300000",
    "178",
    "Санни",
    "Сын Священника",
];
const Наро = [
    "Муж",
    "Церковь",
    "Душа Титана",
    "Свет",
    "Неизвестно",
    "202",
    "Неизвестно",
    "Сын Священника",
];
const Нэй = [
    "Муж",
    "Церковь",
    "Аура",
    "Луна",
    "4000",
    "177",
    "Гелу",
    "Сын Священника",
];
function Randomer() {
    let randomIndex = Math.floor(Math.random() * 11); // 0 или 1
    if (randomIndex === 0) {
        b0 = Нело;
    }
    else if (randomIndex === 1) {
        b0 = Кейкен;
    }
    else if (randomIndex === 2) {
        b0 = Холден;
    }
    else if (randomIndex === 3) {
        b0 = ДуоЛуо;
    }
    else if (randomIndex === 4) {
        b0 = Росса;
    }
    else if (randomIndex === 5) {
        b0 = Лола;
    }
    else if (randomIndex === 6) {
        b0 = Рене;
    }
    else if (randomIndex === 7) {
        b0 = Шенми;
    }
    else if (randomIndex === 8) {
        b0 = Фокси;
    }
    else if (randomIndex === 9) {
        b0 = Наро;
    }
    else if (randomIndex === 10) {
        b0 = Нэй;
    }
}

document.getElementById("submitGuess").addEventListener("click", function() {
    const userGuess = document.getElementById("guessInput").value;
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = ""; // Очищаем предыдущие результаты
    
    if (userGuess.toLowerCase() === "нело") {
        for (let i = 0; i < Нело.length; i++) {
            if (Нело[i] === b0[i]) {
                feedbackElement.textContent += Нело[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Нело[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "кейкен") {
        for (let i = 0; i < Кейкен.length; i++) {
            if (Кейкен[i] === b0[i]) {
                feedbackElement.textContent += Кейкен[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Кейкен[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "холден") {
        for (let i = 0; i < Холден.length; i++) {
            if (Холден[i] === b0[i]) {
                feedbackElement.textContent += Холден[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Холден[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "дуолуо") {
        for (let i = 0; i < ДуоЛуо.length; i++) {
            if (ДуоЛуо[i] === b0[i]) {
                feedbackElement.textContent += ДуоЛуо[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += ДуоЛуо[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "росса") {
        for (let i = 0; i < Росса.length; i++) {
            if (Росса[i] === b0[i]) {
                feedbackElement.textContent += Росса[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Росса[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "лола") {
        for (let i = 0; i < Лола.length; i++) {
            if (Лола[i] === b0[i]) {
                feedbackElement.textContent += Лола[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Лола[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "рене") {
        for (let i = 0; i < Рене.length; i++) {
            if (Рене[i] === b0[i]) {
                feedbackElement.textContent += Рене[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Рене[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "шенми") {
        for (let i = 0; i < Шенми.length; i++) {
            if (Шенми[i] === b0[i]) {
                feedbackElement.textContent += Шенми[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Шенми[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "фокси") {
        for (let i = 0; i < Фокси.length; i++) {
            if (Фокси[i] === b0[i]) {
                feedbackElement.textContent += Фокси[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Фокси[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "наро") {
        for (let i = 0; i < Наро.length; i++) {
            if (Наро[i] === b0[i]) {
                feedbackElement.textContent += Наро[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Наро[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
    else if (userGuess.toLowerCase() === "нэй") {
        for (let i = 0; i < Нэй.length; i++) {
            if (Нэй[i] === b0[i]) {
                feedbackElement.textContent += Нэй[i] + " + ";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent += Нэй[i] + " - ";
                feedbackElement.style.color = "red";
            }
        }
    }
});

Randomer();