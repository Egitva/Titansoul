var draw = document.getElementById("draw");
var counter = 1;
deck = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F7",
    "F7",
    "F8",
]
hand = []
draw.onclick = function() {
    if (deck.length > 0) {
        let texto = `images/Cards/undefined.png`;
    let randomChar = 0;
    while (texto === `images/Cards/undefined.png`) {
        randomChar = Math.floor(Math.random() * deck.length);
        texto = `images/Cards/${deck[randomChar]}.png`;
    };
    document.getElementById("cards").innerHTML += `<img id="carda" class="carda" src='${texto}'>`;
    deck.splice(randomChar, 1);
    }
}
