var b0;
//var divnum;
var otveti; 
var otvtag;
var otvetistr;
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
const Фолл = [
    "Жен",
    "Феи",
    "Нет",
    "Звёздная",
    "Нет",
    "187",
    "Гелу",
    "Специальный выпуск",
];
const Альфа = [
    "Жен",
    "Мафия",
    "Нет",
    "Мастер Тенто",
    "10000",
    "165",
    "Гелу",
    "Специальный выпуск",
];
const Лойд = [
    "Муж",
    "Мафия",
    "Призыв",
    "Молния",
    "8138",
    "194",
    "Гелу",
    "Несуществующие Зубы",
];
const Кифер = [
    "Муж",
    "The Evil Mountians",
    "Тело",
    "Нет",
    "800",
    "174",
    "Гелу",
    "Несуществующие Зубы",
];
const Ями = [
    "Муж",
    "Рыцарь",
    "Аура",
    "Луна",
    "250000",
    "210",
    "Гелу",
    "Сын Священника",
];
const Дарио = [
    "Муж",
    "Мафия",
    "Аура",
    "Ускорение",
    "200000",
    "141",
    "Гелу",
    "О.М.П и Н.С",
];
const Данте = [
    "Муж",
    "The Evil Mountians",
    "Аура",
    "Тьма",
    "400",
    "177",
    "Имбер",
    "Несуществующие Зубы",
];
const Гелан = [
    "Муж",
    "Мафия",
    "Аура",
    "Земля",
    "11000",
    "122",
    "Неизвестно",
    "О.М.П и Н.С",
];
const Айвори = [
    "Жен",
    "The Evil Mountians",
    "Мир",
    "Огонь",
    "110000",
    "160",
    "Нулл",
    "О.М.П и Н.С",
];
const Агио = [
    "Жен",
    "Нет",
    "Неизвестно",
    "Неизвестно",
    "Неизвестно",
    "189",
    "Неизвестно",
    "О.М.П и Н.С",
];
function Randomer() {
    let randomIndex = Math.floor(Math.random() * 21); // 0 или 1
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
    else if (randomIndex === 11) {
        b0 = Фолл;
    }
    else if (randomIndex === 12) {
        b0 = Альфа;
    }
    else if (randomIndex === 13) {
        b0 = Лойд;
    }
    else if (randomIndex === 14) {
        b0 = Кифер;
    }
    else if (randomIndex === 15) {
        b0 = Ями;
    }
    else if (randomIndex === 16) {
        b0 = Дарио;
    }
    else if (randomIndex === 17) {
        b0 = Данте;
    }
    else if (randomIndex === 18) {
        b0 = Гелан;
    }
    else if (randomIndex === 19) {
        b0 = Айвори;
    }
    else if (randomIndex === 20) {
        b0 = Агио;
    }
}

document.getElementById("submitGuess").addEventListener("click", function() {
    const userGuess = document.getElementById("guessInput").value;
    //feedbackElement.textContent = "";
    otveti += "1";
    otvtag = "otv" + otveti;
    document.getElementById('feedback').innerHTML+=`<div class='otvetis' id='${otvtag}'>`+`</div>`;
    //document.getElementById(otvtag).style.color = "green";
    if (userGuess.toLowerCase() === "нело") {
        for (let i = 0; i < Нело.length; i++) {
            if (Нело[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Нело[i]}<p>`
                //document.getElementById(otvtag).textContent += Нело[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Нело[i]}<p>`
                //document.getElementById(otvtag).textContent += Нело[i]}<p>`;
                //
            }
        }
    }
    else if (userGuess.toLowerCase() === "кейкен") {
        for (let i = 0; i < Кейкен.length; i++) {
            if (Кейкен[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Кейкен[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Кейкен[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "холден") {
        for (let i = 0; i < Холден.length; i++) {
            if (Холден[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Холден[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Холден[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "дуолуо") {
        for (let i = 0; i < ДуоЛуо.length; i++) {
            if (ДуоЛуо[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${ДуоЛуо[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${ДуоЛуо[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "росса") {
        for (let i = 0; i < Росса.length; i++) {
            if (Росса[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Росса[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Росса[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "лола") {
        for (let i = 0; i < Лола.length; i++) {
            if (Лола[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Лола[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Лола[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "рене") {
        for (let i = 0; i < Рене.length; i++) {
            if (Рене[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Рене[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Рене[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "шенми") {
        for (let i = 0; i < Шенми.length; i++) {
            if (Шенми[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Шенми[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Шенми[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "фокси") {
        for (let i = 0; i < Фокси.length; i++) {
            if (Фокси[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Фокси[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Фокси[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "наро") {
        for (let i = 0; i < Наро.length; i++) {
            if (Наро[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Наро[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Наро[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "нэй") {
        for (let i = 0; i < Нэй.length; i++) {
            if (Нэй[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Нэй[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Нэй[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "фолл") {
        for (let i = 0; i < Фолл.length; i++) {
            if (Фолл[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Фолл[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Фолл[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "альфа") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Альфа[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Альфа[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Альфа[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "лойд") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Лойд[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Лойд[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Лойд[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "кифер") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Кифер[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Кифер[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Кифер[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "ями") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Ями[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Ями[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Ями[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "дарио") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Дарио[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Дарио[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Дарио[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "данте") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Данте[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Данте[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Данте[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "гелан") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Гелан[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Гелан[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Гелан[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "айвори") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Айвори[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Айвори[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Айвори[i]}<p>`;
                
            }
        }
    }
    else if (userGuess.toLowerCase() === "агио") {
        for (let i = 0; i < Альфа.length; i++) {
            if (Агио[i] === b0[i]) {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="true">${Агио[i]}<p>`;
            } else {
                document.getElementById(otvtag).innerHTML += `<p src='images/Blank.png' class="false">${Агио[i]}<p>`;
                
            }
        }
    }
});

Randomer();