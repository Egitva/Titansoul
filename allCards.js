async function loadCards() {
    try {
        const response = await fetch('/get_text.php');
        const cards = await response.json();
        
        const container = document.getElementById('cardsContainer');
        container.innerHTML = cards.map(card => `
            <div class="card">
                <img src="${card.image_url}" alt="${card.card_name}">
                <h3>${card.card_name}</h3>
                <p>ID: ${card.id}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Ошибка загрузки карт:', error);
    }
}
loadCards();
