var pc = localStorage.getItem('page');
var pageCur = 0 + Number(pc);
pages28 = document.getElementById('pages28');
pages2 = document.getElementById('pages2');
pages8 = document.getElementById('pages8');
pages28.src = `mangaPages/CH1/TS${pageCur}.jpg`;
pages2.onclick = function() {
    pageCur+=1;
    pages28.src = `mangaPages/CH1/TS${pageCur}.jpg`;
    localStorage.setItem('page', pageCur);
}
pages8.onclick = function() {
    pageCur-=1;
    pages28.src = `mangaPages/CH1/TS${pageCur}.jpg`;
    localStorage.setItem('page', pageCur);
}