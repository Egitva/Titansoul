fetch('cards.json')
    .then(response => response.json())
    .then(cardsjson => console.log(cardsjson))
var canvase = document.getElementById("catalog");
cards = 21
for (let i = 0; i < cards.length; i++) {
texto = `images/Cards/${deck[1]}.png`;
asidecode_talker = `<img class="carda" src='${texto}'>`;
draw.onclick = function() {
    if (deck.length > 0) {
        let texto = `images/Cards/undefined.png`;
    let randomChar = 0;
    while (texto === `images/Cards/undefined.png`) {
        randomChar = Math.floor(Math.random() * deck.length);
        texto = `images/Cards/${deck[randomChar]}.png`;
    };
    document.getElementById("cards").innerHTML += `<img class="carda" src='${texto}'>`;
    hand.push(deck[randomChar]);
    deck.splice(randomChar, 1);
    }
}
document.getElementById("cards").addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('carda')) {
        let clickedCardSrc = event.target.src;
        canvase.innerHTML += `<img class="carda" id="goyda" src='${clickedCardSrc}'>`;
        event.target.remove();
        let cardIdMatch = clickedCardSrc.match(/\/([^\/]+)\.png$/);
        if (cardIdMatch) {
            let cardId = cardIdMatch[1];
            let index = hand.indexOf(cardId);
            if (index !== -1) {
                hand.splice(index, 1);
            }
        }
    }
});
choose.onclick = function() {
    for (let i = 0; i < deck.length; i++) {
        if (deck.length > 0) {
            let texto = `images/Cards/undefined.png`;
            let randomChar = 0;
        while (texto === `images/Cards/undefined.png`) {
            randomChar = Math.floor(Math.random() * deck.length);
            texto = `images/Cards/${deck[randomChar]}.png`;
        };
        document.getElementById("opis").innerHTML += `<img class="carda" id="cho" src='${texto}'>`;
        choose_list.push(deck);
    }
}}
document.getElementById("opis").addEventListener('click', (event) => {
    if (event.target2 && event.target.classList.contains('carda')) {
        let clickedCardSrc = event.target.src;
        document.getElementById("cards").innerHTML += `<img class="carda" src='${clickedCardSrc}'>`;
        event.target.remove();
        let cardIdMatch = clickedCardSrc.match(/\/([^\/]+)\.png$/);
        if (cardIdMatch) {
            let cardId = cardIdMatch[1];
            let index = choose_list.indexOf(cardId);
            if (index !== -1) {
                choose_list.splice(index, 1);
            }
        }
    }
});