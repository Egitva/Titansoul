// js/deck.js
let currentDeck = {
    main: [],
    extra: [],
    side: []
};

let currentModalCardFromDeck = null; // если понадобится

// ====================== ПОИСК КАРТ ДЛЯ КОЛОДЫ ======================
async function searchForDeck() {
    const query = document.getElementById('deck-search-input').value.trim();
    const container = document.getElementById('deck-search-results');

    if (query.length < 2) {
        container.innerHTML = `<p style="color:#888; text-align:center; padding:20px;">Введите минимум 2 символа для поиска...</p>`;
        return;
    }

    container.innerHTML = `<p style="color:#facc15; text-align:center; padding:20px;">Загрузка...</p>`;

    try {
        let url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=60&offset=0';
        if (query) url += `&fname=${encodeURIComponent(query)}`;
        return url;
        const res = await fetch(url);
        const data = await res.json();

        container.innerHTML = '';

        if (!data.data || data.data.length === 0) {
            container.innerHTML = `<p style="color:#ef4444; text-align:center; padding:20px;">Ничего не найдено</p>`;
            return;
        }

        data.data.slice(0, 18).forEach(card => {
            const div = document.createElement('div');
            div.className = 'search-card';
            const imgUrl = card.card_images?.[0]?.image_url_small || 'https://via.placeholder.com/150';

            div.innerHTML = `
                <img src="${imgUrl}" alt="${card.name}">
                <p>${card.name}</p>
            `;

            div.onclick = () => {
                addToDeck(card);
                // Не очищаем поле поиска — удобно добавлять несколько карт
            };

            container.appendChild(div);
        });
    } catch (e) {
        console.error(e);
        container.innerHTML = `<p style="color:#ef4444; text-align:center;">Ошибка подключения к API</p>`;
    }
}

// ====================== ДОБАВЛЕНИЕ В КОЛОДУ ======================
function addToDeck(card) {
    const isExtra = /Fusion|Synchro|Xyz|Link|Pendulum/i.test(card.type || '');

    if (isExtra) {
        if (currentDeck.extra.length >= 15) {
            alert("Экстра колода заполнена (макс. 15 карт)");
            return;
        }
        currentDeck.extra.push(card);
    } else {
        if (currentDeck.main.length >= 40) {
            alert("Основная колода заполнена (макс. 40 карт)");
            return;
        }
        currentDeck.main.push(card);
    }

    renderDeck();
}

// ====================== РЕНДЕР КОЛОДЫ ======================
function renderDeck() {
    // Основная колода
    const mainContainer = document.getElementById('main-deck');
    mainContainer.innerHTML = '';
    currentDeck.main.forEach((card, index) => {
        mainContainer.appendChild(createDeckCard(card, index, 'main'));
    });
    document.getElementById('main-count').textContent = `(${currentDeck.main.length}/40)`;

    // Экстра колода
    const extraContainer = document.getElementById('extra-deck');
    extraContainer.innerHTML = '';
    currentDeck.extra.forEach((card, index) => {
        extraContainer.appendChild(createDeckCard(card, index, 'extra'));
    });
    document.getElementById('extra-count').textContent = `(${currentDeck.extra.length}/15)`;

    // Сайд колода
    const sideContainer = document.getElementById('side-deck');
    sideContainer.innerHTML = '';
    currentDeck.side.forEach((card, index) => {
        sideContainer.appendChild(createDeckCard(card, index, 'side'));
    });
    document.getElementById('side-count').textContent = `(${currentDeck.side.length}/15)`;
}

function createDeckCard(card, index, type) {
    const div = document.createElement('div');
    div.className = 'deck-card';
    
    const imgUrl = card.card_images?.[0]?.image_url_small || 'https://via.placeholder.com/100';

    div.innerHTML = `
        <img src="${imgUrl}" alt="${card.name}">
        <button class="remove-btn" onclick="removeFromDeck('${type}', ${index}); event.stopImmediatePropagation()">✕</button>
    `;

    return div;
}

window.removeFromDeck = function(type, index) {
    currentDeck[type].splice(index, 1);
    renderDeck();
};

// ====================== ОЧИСТКА КОЛОДЫ ======================
function clearDeck() {
    if (confirm('Вы действительно хотите полностью очистить колоду?')) {
        currentDeck = { main: [], extra: [], side: [] };
        renderDeck();
    }
}

// ====================== ЭКСПОРТ В PDF ======================
async function exportToPDF() {
    if (currentDeck.main.length === 0 && currentDeck.extra.length === 0 && currentDeck.side.length === 0) {
        alert("Колоды пуста!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('portrait', 'mm', 'a4');

    const marginTop = parseInt(document.getElementById('margin-top').value) || 10;
    const marginBottom = parseInt(document.getElementById('margin-bottom').value) || 10;
    const marginSide = parseInt(document.getElementById('margin-side').value) || 8;

    let y = marginTop;

    // Заголовок
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Yu-Gi-Oh! Колода", marginSide, y);
    y += 12;

    doc.setFontSize(12);
    doc.text(`Основная: ${currentDeck.main.length} | Экстра: ${currentDeck.extra.length} | Сайд: ${currentDeck.side.length}`, marginSide, y);
    y += 15;

    // Основная колода
    if (currentDeck.main.length > 0) {
        y = await renderDeckToPDF(doc, "Основная колода", currentDeck.main, y, marginSide, marginTop);
    }

    // Экстра колода
    if (currentDeck.extra.length > 0) {
        y = await renderDeckToPDF(doc, "Экстра колода", currentDeck.extra, y, marginSide, marginTop);
    }

    // Сайд колода
    if (currentDeck.side.length > 0) {
        y = await renderDeckToPDF(doc, "Сайд-дек", currentDeck.side, y, marginSide, marginTop);
    }

    doc.save('my_yugioh_deck.pdf');
    alert('PDF успешно сохранён!');
}

async function renderDeckToPDF(doc, title, cards, startY, marginSide, marginTop) {
    let y = startY;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, marginSide, y);
    y += 10;

    const cardWidth = 22;
    const cardHeight = 32;
    const spacing = 5;
    const cols = 7;

    for (let i = 0; i < cards.length; i++) {
        if (y > 270) { // новая страница
            doc.addPage();
            y = marginTop;
        }

        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = marginSide + col * (cardWidth + spacing);
        const cardY = y + row * (cardHeight + spacing + 8);

        const card = cards[i];
        const imgUrl = card.card_images?.[0]?.image_url_small;

        // Рамка
        doc.setDrawColor(250, 204, 21);
        doc.rect(x, cardY, cardWidth, cardHeight);

        // Название карты (если изображение не загрузилось)
        doc.setFontSize(6);
        doc.setTextColor(200, 200, 200);
        const shortName = card.name.length > 22 ? card.name.substring(0, 20) + '..' : card.name;
        doc.text(shortName, x + cardWidth/2, cardY + cardHeight + 5, { align: "center" });
    }

    return y + 50; // возвращаем новую позицию Y
}

// ====================== ИНИЦИАЛИЗАЦИЯ ======================
window.onload = () => {
    // Автозагрузка примера (по желанию)
    // searchForDeck(); // можно оставить пустым

    renderDeck();

    console.log('%cDeck Builder загружен успешно!', 'color: #facc15; font-size: 14px;');
};