let currentModalCard = null;

async function searchCards() {
    const query = document.getElementById('search-input').value.trim();
    const grid = document.getElementById('cards-grid');
    grid.innerHTML = '<p>Загрузка...</p>';

    let url = 'http://localhost:4000/api/data';
    if (query) url += `?name=${encodeURIComponent(query)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        renderCards(data.data || [], grid);
    } catch (e) {
        grid.innerHTML = '<p style="color:red">Ошибка загрузки</p>';
    }
}

function renderCards(cards, container) {
    container.innerHTML = ''; // очищаем grid

    if (!cards || cards.length === 0) {
        container.innerHTML = '<p>Ничего не найдено</p>';
        return;
    }

    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card';

        // Важно: добавляем базовый URL, потому что в JSON лежит относительный путь
        let imageUrl = card.card_images?.[0]?.image_url || '';
        
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = 'http://localhost:4000' + imageUrl;
        }

        div.innerHTML = `
            <img src="${imageUrl || 'https://via.placeholder.com/200'}" 
                 alt="${card.name || 'Без названия'}"
                 onerror="this.src='https://via.placeholder.com/200'">
            <h3>${card.name || 'Без названия'}</h3>
        `;

        // Клик по карточке
        div.onclick = () => showCardModal(card);

        container.appendChild(div);
    });
}

function showCardModal(card) {
    currentModalCard = card;
    const modal = document.getElementById('card-modal');
    const body = document.getElementById('modal-body');

    let img = card.card_images?.[0]?.image_url || '';
        
    if (img && !img.startsWith('http')) {
        img = 'http://localhost:4000' + img;
    }
    
    body.innerHTML = `
        <img src="${img}" style="width:280px; float: left; border-radius:16px; margin-right:1rem;">
        <h2 style="text-align:center; margin:10px 0;">${card.name}</h2>
        <p style="text-align:center; color:#facc15;">${card.type}</p>
        <p style="padding:15px; background:#222; border-radius:12px; font-size:0.95rem;">${card.desc}</p>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('card-modal').style.display = 'none';
}

function addCurrentToDeckFromModal() {
    if (currentModalCard) {
        window.parentDeck = window.parentDeck || { main: [], extra: [], side: [] };
        window.parentDeck.main.push(currentModalCard);
        alert(`${currentModalCard.name} добавлена в колоду!`);
        closeModal();
    }
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    searchCards();
}

// Загрузка при старте
window.onload = () => {
    searchCards();
};