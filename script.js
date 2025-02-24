// Массив с фразами
img = document.getElementById("gi");
const Nelo = [
    "Нело изначально должен был быть расистом",
    "Огонь Нело, как и других огненных людей, выделяет кислород и не обжигает"
]
const Kiken = [
    "Изначалько Кейкен должен был быть психически нестабильным",
    "Кейкен пахнет ванилью"
]
const Rossa = [
    "Шляпа Россы изначально принадлежала Лойду",
    "В 16 лет, Росса могла бы стать чемпионом по боксу в среднем весе, но предпочла провести время с Кейкеном и Лойдом"
]
const Holden = [
    "Холден не сделал ничего плохого",
    "Холден имеет докторскую степень по биологии",
    "У Холдена в общем 3 дочери",
    "На момент 3 главы, Холдену 102 года",
    "Холден не стареет",
    "Рост Холдена - 282см",
    "Холден - Лучший друг Шенми"
]
const Shenmi = [
    "Шенми - лучший друг Холдена",
    "Шенми родился в семье тёмных магов",
    "Шенми является призмой",
    "Цвет души Шенми - белый"
]
const Loyd = [
    "Лойд - это брат Кейкена",
    "Цвет души Лойда - Зелёный",
    "Лойда назначили судьёй Гелу из-за сильного чувства справедливости, а не его способностей или силы"
]
document.getElementById('generator').onclick = getRandomPhrase;

function getRandomPhrase() {
    var pass =''
    const randomChar = Math.floor(Math.random() * 6);
    if (randomChar == 0) {
        const randomIndex = Math.floor(Math.random() * Nelo.length);
        pass = Nelo[randomIndex];
        img.src = "images/Chars/Nelo.jpg";
        document.getElementById('out').innerHTML='<p>'+pass+'</p>';
    }
    else if (randomChar == 1) {
        const randomIndex = Math.floor(Math.random() * Kiken.length);
        pass = Kiken[randomIndex];
        img.src = "images/Chars/Kiken.jpg";
        document.getElementById('out').innerHTML='<p>'+pass+'</p>';
    }
    else if (randomChar == 2) {
        const randomIndex = Math.floor(Math.random() * Rossa.length);
        pass = Rossa[randomIndex];
        img.src = "images/Chars/Rossa.jpg";
        document.getElementById('out').innerHTML='<p>'+pass+'</p>';
    }
    else if (randomChar == 3) {
        const randomIndex = Math.floor(Math.random() * Holden.length);
        pass = Holden[randomIndex];
        img.src = "images/Chars/Holden.jpg";
        document.getElementById('out').innerHTML='<p>'+pass+'</p>';
    }
    else if (randomChar == 4) {
        const randomIndex = Math.floor(Math.random() * Shenmi.length);
        pass = Shenmi[randomIndex];
        img.src = "images/Chars/Shenmi.jpg";
        document.getElementById('out').innerHTML='<p>'+pass+'</p>';
    }
    else if (randomChar == 5) {
        const randomIndex = Math.floor(Math.random() * Loyd.length);
        pass = Loyd[randomIndex];
        img.src = "images/Chars/Loyd.jpg";
        document.getElementById('out').innerHTML='<p>'+pass+'</p>';
    }
}