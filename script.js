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
]
document.getElementById('generator').onclick = getRandomPhrase;

function getRandomPhrase() {
    var pass =''
    const randomChar = Math.floor(Math.random() * 4);
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
}