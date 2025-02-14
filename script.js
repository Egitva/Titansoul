// Массив с фразами
const phrases = [
    "Всё получится!",
    "Никогда не сдавайся!",
    "Успех ближе, чем кажется!",
    "Каждый день — новый шанс!",
    "Действуй, и всё получится!"
];

document.getElementById('generator').onclick = getRandomPhrase;

function getRandomPhrase() {
    var pass =''
    const randomIndex = Math.floor(Math.random() * phrases.length);
    pass = phrases[randomIndex];
    document.getElementById('out').innerHTML='<p>'+pass+'</p>';
}

document.getElementById('menu').onclick = Visibility;

function Visibility() {
    document.getElementById('sidenav').classList.add('hidden');
}