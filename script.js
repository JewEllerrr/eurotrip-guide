const css = (name, fallback = "") =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

const iconFood = L.icon({
    iconUrl: 'icons/food.png',
    iconSize: [20, 20],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
});

const iconHotel = L.icon({
    iconUrl: 'icons/hotel.png',
    iconSize: [20, 20],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
});

const routeStyle = () => ({
    color: css('--route-color', '#601591'),
    weight: parseInt(css('--route-weight', '4'), 10),
    opacity: parseFloat(css('--route-opacity', '0.85')),
});

const numIconSize = () => {
    const s = parseInt(css('--num-size', '26'), 10);
    return [s, s];
};
const numIconAnchor = () => {
    const s = parseInt(css('--num-size', '26'), 10);
    const half = Math.round(s / 2);
    return [half, half];
};

const makeNumIcon = (label, extra = "") =>
    L.divIcon({
        html: `<div class="num ${extra}">${label}</div>`,
        className: '',
        iconSize: numIconSize(),
        iconAnchor: numIconAnchor()
    });

const makePoiIcon = (kind /* 'food' | 'hotel' */) =>
    L.divIcon({
        html: `<div class="poi poi--${kind}"></div>`,
        className: '',
        iconSize: [parseInt(css('--poi-size', '24'), 10), parseInt(css('--poi-size', '24'), 10)],
        iconAnchor: [parseInt(css('--poi-size', '24'), 10) / 2, parseInt(css('--poi-size', '24'), 10) / 2],
        popupAnchor: [0, -Math.round(parseInt(css('--poi-size', '24'), 10) * 0.7)]
    });

const addTiles = map =>
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

const addRoute = (map, coords) => L.polyline(coords, routeStyle()).addTo(map);
const addNumberedMarkers = (map, points) => {
    points.forEach(p => {
        L.marker([p.lat, p.lng], {icon: makeNumIcon(p.n)})
            .addTo(map)
            .bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
    });
};
const addPoiMarkers = (map, items, kind) => {
    items.forEach(i =>
        L.marker([i.lat, i.lng], {icon: kind === 'food' ? iconFood : iconHotel})
            .addTo(map)
            .bindPopup(`<strong>${i.name}</strong>`)
    );
};
const boundsOf = arrays => L.latLngBounds(arrays);
const fitAll = (map, arr) => map.fitBounds(boundsOf(arr), {padding: [18, 18]});

const tabs = document.querySelectorAll('nav a[data-day]');
const sections = [...document.querySelectorAll('main section')];

const mapInits = {
    day1: initDay1Map,
    day2: initDay2Map,
    day3: initDay3Map,
    day4: initDay4Map,
    day5: initDay5Map,
    day6: initDay6Map,
    day7: initDay7Map,
    day8: initDay8Map,
};

function switchTo(id) {
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-day') === id));
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    if (mapInits[id] && !window[`__${id}_map_inited`]) {
        mapInits[id]();
        window[`__${id}_map_inited`] = true;
    }
    history.replaceState(null, '', `#${id}`);
}

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();
        switchTo(tab.getAttribute('data-day'));
    });
});

document.querySelectorAll('.chip[data-day]').forEach(chip => {
    chip.addEventListener('click', e => {
        e.preventDefault();
        switchTo(chip.getAttribute('data-day'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fromHash = location.hash.replace('#', '');
    const initial = sections.some(s => s.id === fromHash) ? fromHash : 'day1';
    switchTo(initial);
});

// ---------------- DAY 1 ----------------
function initDay1Map() {
    const map = L.map('map-day1', {scrollWheelZoom: true}).setView([46.0511, 14.5065], 15);
    addTiles(map);

    const points = [
        {n: 1, name: "Хостел Ibis Styles Ljubljana Centre", lat: 46.055538, lng: 14.5074779},
        {n: 2, name: "Площадь Прешерна", lat: 46.051424, lng: 14.505995},
        {n: 3, name: "Тройной мост", lat: 46.051088, lng: 14.506245},
        {n: 4, name: "Мост Драконов", lat: 46.051938, lng: 14.510426},
        {n: 5, name: "Фуникулёр к замку (нижняя станция)", lat: 46.050179956075354, lng: 14.509708519883791},
        {n: 6, name: "Люблянский замок", lat: 46.04900486702223, lng: 14.508350216268578},
        {n: 7, name: "Старый город (Mestni trg)", lat: 46.050072646381345, lng: 14.50678379238868},
        {n: 8, name: "Парк Звезда", lat: 46.050211, lng: 14.503798},
        {n: 9, name: "Парк Тиволи (Jakopič Promenade)", lat: 46.053678, lng: 14.497527},
    ];

    addRoute(map, points.map(p => [p.lat, p.lng]));
    addNumberedMarkers(map, points);

    const food = [
        {name: "Gostilna Sokol", lat: 46.050279, lng: 14.507516},
        {name: "Druga Violina", lat: 46.046924, lng: 14.506731},
        {name: "Slovenska hiša – Figovec", lat: 46.055000, lng: 14.503056},
        {name: "Gostilna Šestica", lat: 46.053284, lng: 14.504043},
        {name: "Central Market / Pogačarjev & Vodnikov trg", lat: 46.051450, lng: 14.510350}
    ];

    const hotels = [
        {name: "Hostel Ibis Styles Ljubljana Centre", lat: 46.055538, lng: 14.5074779},
        {name: "Hotel Emonec", lat: 46.0506, lng: 14.5048},
        {name: "Hostel Tresor", lat: 46.0513, lng: 14.5055},
        {name: "B&B Hotel Ljubljana Park", lat: 46.0577, lng: 14.5136}
    ];

    addPoiMarkers(map, food, 'food');
    addPoiMarkers(map, hotels, 'hotel');

    setTimeout(() => map.invalidateSize(), 50);
}

// ---------------- DAY 2 ----------------
function initDay2Map() {
    // ---------- Bled ----------
    const bled = L.map('map-day2-bled', {scrollWheelZoom: true}).setView([46.364, 14.095], 13);
    addTiles(bled);

    const bledPoints = [
        {n: 1, name: 'Bled Bus Station (Avtobusna postaja Bled)', lat: 46.371197, lng: 14.106871},
        {n: 2, name: 'Набережная у Hotel Park (променад)', lat: 46.367717, lng: 14.109349},
        {n: 3, name: 'Остров Блед (Blejski otok)', lat: 46.36195, lng: 14.08972},
        {n: 4, name: 'Замок Блед (Bled Castle)', lat: 46.369773, lng: 14.100386},
    ];

    const bledFood = [
        {name: 'Kavarna Park (Blejska kremšnita)', lat: 46.367717, lng: 14.109349}
    ];

    addRoute(bled, bledPoints.map(p => [p.lat, p.lng]));
    addNumberedMarkers(bled, bledPoints);
    addPoiMarkers(bled, bledFood, 'food');
    fitAll(bled, [
        ...bledPoints.map(p => [p.lat, p.lng]),
        ...bledFood.map(f => [f.lat, f.lng])
    ]);

    // ---------- Mestre ----------
    const mestre = L.map('map-day2-venice', {scrollWheelZoom: true}).setView([45.486, 12.236], 13);
    addTiles(mestre);

    const mestrePoints = [
        {n: 1, name: 'Venezia Mestre FS (ж/д вокзал)', lat: 45.482600, lng: 12.231800},
        {n: 2, name: 'Piazza Erminio Ferretto (центр)', lat: 45.493950, lng: 12.241440},
    ];

    const mestreFood = [
        {name: 'Osteria Vecia Posta', lat: 45.486600, lng: 12.234667},
        {name: 'Soul Kitchen Café (у вокзала)', lat: 45.482300, lng: 12.233900},
    ];

    const mestreHotels = [
        {name: 'Hotel Plaza Venice (напротив вокзала)', lat: 45.482100, lng: 12.234900},
        {name: 'Anda Venice Hostel', lat: 45.483338, lng: 12.233114}
    ];

    addRoute(mestre, mestrePoints.map(p => [p.lat, p.lng]));
    addNumberedMarkers(mestre, mestrePoints);
    addPoiMarkers(mestre, mestreFood, 'food');
    addPoiMarkers(mestre, mestreHotels, 'hotel');

    fitAll(mestre, [
        ...mestrePoints.map(p => [p.lat, p.lng]),
        ...mestreFood.map(f => [f.lat, f.lng]),
        ...mestreHotels.map(h => [h.lat, h.lng])
    ]);

    setTimeout(() => {
        bled.invalidateSize();
        mestre.invalidateSize();
    }, 50);
}


// ---------------- DAY 3 ----------------
function initDay3Map() {
    // Venice
    const venEl = document.getElementById('map-day3-venice');
    if (venEl) {
        const ven = L.map(venEl, {scrollWheelZoom: true}).setView([45.4379, 12.3270], 14);
        addTiles(ven);

        const venPoints = [
            {n: 1, name: 'Stazione Venezia Santa Lucia (вокзал)', lat: 45.4410, lng: 12.3217},
            {n: 2, name: 'Santa Croce (район)', lat: 45.4395, lng: 12.3205},
            {n: 3, name: 'Ponte di Rialto', lat: 45.4381, lng: 12.3358},
            {n: 4, name: 'Piazza San Marco', lat: 45.4340, lng: 12.3390},
            {n: 5, name: 'Stazione Venezia Santa Lucia (возврат)', lat: 45.4410, lng: 12.3217},
        ];
        const venFood = [
            {name: 'Caffè del Doge (завтрак)', lat: 45.4370, lng: 12.3370},
            {name: 'Torrefazione Cannaregio (альтернатива)', lat: 45.4446, lng: 12.3277},
        ];

        addRoute(ven, venPoints.map(p => [p.lat, p.lng]));
        addNumberedMarkers(ven, venPoints);
        addPoiMarkers(ven, venFood, 'food');
        fitAll(ven, [...venPoints.map(p => [p.lat, p.lng]), ...venFood.map(f => [f.lat, f.lng])]);
        setTimeout(() => ven.invalidateSize(), 50);
    }

    // Florence
    const floEl = document.getElementById('map-day3');
    if (floEl) {
        const map = L.map(floEl, {scrollWheelZoom: true}).setView([43.7731, 11.2556], 14);
        addTiles(map);

        const points = [
            {n: 1, name: 'Firenze S. M. Novella (вокзал)', lat: 43.7760, lng: 11.2480},
            {n: 2, name: 'Mercato Centrale', lat: 43.7766, lng: 11.2531},
            {n: 3, name: 'Duomo (Santa Maria del Fiore)', lat: 43.7731, lng: 11.2556},
            {n: 4, name: 'Piazza della Signoria', lat: 43.7696, lng: 11.2558},
            {n: 5, name: 'Basilica di Santa Croce', lat: 43.7689, lng: 11.2627},
            {n: 6, name: 'Uffizi', lat: 43.7687, lng: 11.2550},
            {n: 7, name: 'Ponte Vecchio', lat: 43.7679, lng: 11.2531},
            {n: 8, name: 'Oltrarno (район)', lat: 43.7670, lng: 11.2468},
            {n: 9, name: 'Piazzale Michelangelo', lat: 43.7629, lng: 11.2659},
        ];
        const food = [
            {name: 'Mercato Centrale (обед)', lat: 43.7766, lng: 11.2533},
            {name: 'Trattoria ZaZa (ужин)', lat: 43.7767, lng: 11.2539},
            {name: 'All’Antico Vinaio (перекус)', lat: 43.7702, lng: 11.2578},
            {name: 'Gelateria La Carraia (мороженое)', lat: 43.7670, lng: 11.2464},
        ];

        addRoute(map, points.map(p => [p.lat, p.lng]));
        addNumberedMarkers(map, points);
        addPoiMarkers(map, food, 'food');
        fitAll(map, [...points.map(p => [p.lat, p.lng]), ...food.map(f => [f.lat, f.lng])]);
        setTimeout(() => map.invalidateSize(), 50);
    }
}

// ---------------- DAY 4 ----------------
function initDay4Map() {
    const el = document.getElementById('map-day4-rome');
    if (!el) return;

    const map = L.map(el, {scrollWheelZoom: true}).setView([41.8986, 12.4769], 14);
    addTiles(map);

    const points = [
        {n: 1, name: 'Roma Termini / Отель (старт)', lat: 41.9010, lng: 12.5018},
        {n: 2, name: 'Colosseo (Колизей)', lat: 41.8902, lng: 12.4922},
        {n: 3, name: 'Via dei Fori Imperiali (виды)', lat: 41.8929, lng: 12.4873},
        {n: 4, name: 'Piazza Venezia', lat: 41.8959, lng: 12.4823},
        {n: 5, name: 'Fontana di Trevi', lat: 41.9009, lng: 12.4833},
        {n: 6, name: 'Pantheon', lat: 41.8986, lng: 12.4769},
        {n: 7, name: 'Piazza Navona', lat: 41.8992, lng: 12.4731},
        {n: 8, name: 'Trastevere (ужин/прогулка)', lat: 41.8899, lng: 12.4708},
    ];
    const food = [
        {name: 'Da Enzo al 29 (римская классика)', lat: 41.8899, lng: 12.4703},
        {name: 'Tonnarello (карбонара/чика)', lat: 41.8906, lng: 12.4709},
        {name: 'Grazia & Graziella (ужин)', lat: 41.8898, lng: 12.4717},
        {name: 'Giolitti (джелато у Пантеона)', lat: 41.9016, lng: 12.4769},
        {name: 'Roscioli (закуски/паста)', lat: 41.8955, lng: 12.4722},
    ];

    addRoute(map, points.map(p => [p.lat, p.lng]));
    addNumberedMarkers(map, points);
    addPoiMarkers(map, food, 'food');

    fitAll(map, [...points.map(p => [p.lat, p.lng]), ...food.map(f => [f.lat, f.lng])]);
    setTimeout(() => map.invalidateSize(), 50);
}

// ---------------- DAY 5 ----------------
function initDay5Map() {
    // Rome
    const elCenter = document.getElementById('map-day5-center');
    if (elCenter) {
        const center = L.map(elCenter, {scrollWheelZoom: true}).setView([41.8926, 12.4870], 15);
        addTiles(center);

        const pointsCenter = [
            {n: 1, name: 'Colosseo (вход по слоту)', lat: 41.8902, lng: 12.4922},
            {n: 2, name: 'Arco di Costantino', lat: 41.8893, lng: 12.4924},
            {n: 3, name: 'Roman Forum (вход)', lat: 41.8921, lng: 12.4852},
            {n: 4, name: 'Palatino (viewpoints)', lat: 41.8899, lng: 12.4882},
            {n: 5, name: 'Ланч-зона у Форума', lat: 41.8939, lng: 12.4899},
        ];
        const foodCenter = [
            {name: 'La Prezzemolina (пицца al taglio)', lat: 41.8936, lng: 12.4892},
            {name: 'La Taverna dei Fori Imperiali', lat: 41.8939, lng: 12.4885},
            {name: 'Panella – L’Arte del Pane (завтрак)', lat: 41.8984, lng: 12.5052},
        ];

        addRoute(center, pointsCenter.map(p => [p.lat, p.lng]));
        addNumberedMarkers(center, pointsCenter);
        addPoiMarkers(center, foodCenter, 'food');
        fitAll(center, [...pointsCenter.map(p => [p.lat, p.lng]), ...foodCenter.map(f => [f.lat, f.lng])]);
        setTimeout(() => center.invalidateSize(), 50);
    }

    // Vatican
    const elVat = document.getElementById('map-day5-vatican');
    if (elVat) {
        const vat = L.map(elVat, {scrollWheelZoom: true}).setView([41.9022, 12.4539], 15);
        addTiles(vat);

        const pointsVat = [
            {n: 'A', name: 'Piazza San Pietro', lat: 41.9022, lng: 12.4573},
            {n: 'B', name: 'Basilica di San Pietro', lat: 41.9022, lng: 12.4539},
            {n: 'C', name: 'Vatican Museums (вход)', lat: 41.9065, lng: 12.4536},
            {n: 'D', name: 'Castel Sant’Angelo (снаружи)', lat: 41.9031, lng: 12.4663},
        ];
        const foodVat = [
            {name: 'Pizzarium Bonci (пицца)', lat: 41.9076, lng: 12.4459},
            {name: 'Pastasciutta (быстрая паста)', lat: 41.9048, lng: 12.4577},
            {name: 'Old Bridge Gelateria', lat: 41.9055, lng: 12.4568},
        ];

        addRoute(vat, pointsVat.map(p => [p.lat, p.lng]));

        pointsVat.forEach(p => {
            L.marker([p.lat, p.lng], {icon: makeNumIcon(p.n, 'letter')})
                .addTo(vat)
                .bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        addPoiMarkers(vat, foodVat, 'food');

        fitAll(vat, [...pointsVat.map(p => [p.lat, p.lng]), ...foodVat.map(f => [f.lat, f.lng])]);
        setTimeout(() => vat.invalidateSize(), 50);
    }
}

// ---------------- DAY 6 ----------------
function initDay6Map() {
    // Wien
    const elVie = document.getElementById('map-day6-vienna');
    if (elVie) {
        const vie = L.map(elVie, {scrollWheelZoom: true}).setView([48.2082, 16.3738], 14);
        addTiles(vie);

        const ptsVie = [
            {n: 1, name: 'Stephansplatz', lat: 48.2086, lng: 16.3731},
            {n: 2, name: 'Graben → Kohlmarkt', lat: 48.2088, lng: 16.3698},
            {n: 3, name: 'Hofburg (внешний двор)', lat: 48.2065, lng: 16.3656},
            {n: 4, name: 'Ringstraße (опера/ратуша)', lat: 48.2026, lng: 16.3696},
            {n: 5, name: 'Naschmarkt (ланч)', lat: 48.1989, lng: 16.3616},
            {n: 6, name: 'Schönbrunn (сад/дворец)', lat: 48.1845, lng: 16.3122},
            {n: 7, name: 'Wien Hbf (поезд)', lat: 48.1856, lng: 16.3773},
        ];
        const foodVie = [
            {name: 'Café Demel (кофе/штрудель)', lat: 48.2089, lng: 16.3687},
            {name: 'Naschmarkt Food Stalls', lat: 48.1993, lng: 16.3619},
            {name: 'Café Central (альтернатива)', lat: 48.2101, lng: 16.3656},
        ];

        addRoute(vie, ptsVie.map(p => [p.lat, p.lng]));
        addNumberedMarkers(vie, ptsVie);
        addPoiMarkers(vie, foodVie, 'food');
        fitAll(vie, [...ptsVie.map(p => [p.lat, p.lng]), ...foodVie.map(f => [f.lat, f.lng])]);
        setTimeout(() => vie.invalidateSize(), 50);
    }

    // Munchen
    const elMuc = document.getElementById('map-day6-munich');
    if (elMuc) {
        const muc = L.map(elMuc, {scrollWheelZoom: true}).setView([48.1372, 11.5756], 14);
        addTiles(muc);

        const ptsMuc = [
            {n: 'A', name: 'München Hbf (прибытие)', lat: 48.1402, lng: 11.5586},
            {n: 'B', name: 'Marienplatz', lat: 48.1372, lng: 11.5756},
            {n: 'C', name: 'Viktualienmarkt', lat: 48.1353, lng: 11.5760},
            {n: 'D', name: 'Hofbräuhaus (ужин)', lat: 48.1374, lng: 11.5796},
            {n: 'E', name: 'Englischer Garten (вход)', lat: 48.1470, lng: 11.5836},
        ];
        const foodMuc = [
            {name: 'Hofbräuhaus München', lat: 48.1374, lng: 11.5796},
            {name: 'Augustiner Stammhaus', lat: 48.1379, lng: 11.5712},
            {name: 'Viktualienmarkt Food Stalls', lat: 48.1356, lng: 11.5762},
        ];

        addRoute(muc, ptsMuc.map(p => [p.lat, p.lng]));
        ptsMuc.forEach(p => {
            L.marker([p.lat, p.lng], {icon: makeNumIcon(p.n, 'letter')})
                .addTo(muc)
                .bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        addPoiMarkers(muc, foodMuc, 'food');
        fitAll(muc, [...ptsMuc.map(p => [p.lat, p.lng]), ...foodMuc.map(f => [f.lat, f.lng])]);
        setTimeout(() => muc.invalidateSize(), 50);
    }
}

// ---------------- DAY 7 ----------------
function initDay7Map() {
    const el = document.getElementById('map-day7-amsterdam');
    if (!el) return;

    const map = L.map(el, {scrollWheelZoom: true}).setView([52.3728, 4.8930], 13.5);
    addTiles(map);

    const points = [
        {n: 1, name: 'Dam Square', lat: 52.3731, lng: 4.8922},
        {n: 2, name: 'Jordaan', lat: 52.3770, lng: 4.8830},
        {n: 3, name: 'Anne Frank Huis', lat: 52.3752, lng: 4.8839},
        {n: 4, name: 'De 9 Straatjes', lat: 52.3719, lng: 4.8850},
        {n: 5, name: 'Bloemenmarkt', lat: 52.3667, lng: 4.8910},
        {n: 6, name: 'Rijksmuseum / Van Gogh', lat: 52.3600, lng: 4.8850},
        {n: 7, name: 'Vondelpark (вход)', lat: 52.3579, lng: 4.8680},
        {n: 8, name: 'Amsterdam Centraal', lat: 52.3791, lng: 4.9003},
    ];
    const food = [
        {name: 'Winkel 43 (завтрак/пирог)', lat: 52.3756, lng: 4.8856},
        {name: 'Foodhallen (ланч)', lat: 52.3687, lng: 4.8716},
        {name: 'Van Wonderen Stroopwafels', lat: 52.3709, lng: 4.8894},
        {name: 'Restaurant Blauw (ужин рано)', lat: 52.3477, lng: 4.8577}
    ];

    addRoute(map, points.map(p => [p.lat, p.lng]));
    addNumberedMarkers(map, points);
    addPoiMarkers(map, food, 'food');
    fitAll(map, [...points.map(p => [p.lat, p.lng]), ...food.map(f => [f.lat, f.lng])]);
    setTimeout(() => map.invalidateSize(), 50);
}

// ---------------- DAY 8 ----------------
function initDay8Map() {
    // Paris
    const elPar = document.getElementById('map-day8-paris');
    if (elPar) {
        const par = L.map(elPar, {scrollWheelZoom: true}).setView([48.8589, 2.3469], 13.5);
        addTiles(par);

        const ptsPar = [
            {n: 1, name: 'Notre-Dame', lat: 48.8529, lng: 2.3500},
            {n: 2, name: 'Sainte-Chapelle', lat: 48.8554, lng: 2.3450},
            {n: 3, name: 'Louvre (двор/пирамида)', lat: 48.8610, lng: 2.3358},
            {n: 4, name: 'Jardin des Tuileries', lat: 48.8635, lng: 2.3270},
            {n: 5, name: 'Place de la Concorde', lat: 48.8656, lng: 2.3211},
            {n: 6, name: 'Arc de Triomphe', lat: 48.8738, lng: 2.2950},
            {n: 7, name: 'Gare de Lyon (TGV)', lat: 48.8443, lng: 2.3730},
        ];
        const foodPar = [
            {name: 'Bouillon Chartier', lat: 48.8720, lng: 2.3431},
            {name: 'L’As du Fallafel', lat: 48.8579, lng: 2.3619},
            {name: 'Boulangerie (завтрак у отеля)', lat: 48.8570, lng: 2.3520},
        ];

        addRoute(par, ptsPar.map(p => [p.lat, p.lng]));
        addNumberedMarkers(par, ptsPar);
        addPoiMarkers(par, foodPar, 'food');
        fitAll(par, [...ptsPar.map(p => [p.lat, p.lng]), ...foodPar.map(f => [f.lat, f.lng])]);
        setTimeout(() => par.invalidateSize(), 50);
    }

    // Lyon
    const elLyon = document.getElementById('map-day8-lyon');
    if (elLyon) {
        const lyon = L.map(elLyon, {scrollWheelZoom: true}).setView([45.7600, 4.8357], 13.5);
        addTiles(lyon);

        const ptsLyon = [
            {n: 'A', name: 'Place Bellecour', lat: 45.7578, lng: 4.8320},
            {n: 'B', name: 'Vieux Lyon', lat: 45.7620, lng: 4.8270},
            {n: 'C', name: 'Cathédrale Saint-Jean', lat: 45.7606, lng: 4.8277},
            {n: 'D', name: 'Bouchon (ужин)', lat: 45.7628, lng: 4.8272},
        ];
        const foodLyon = [
            {name: 'Le Bouchon des Filles', lat: 45.7706, lng: 4.8359},
            {name: 'Les Lyonnais (альтернатива)', lat: 45.7641, lng: 4.8339},
        ];

        addRoute(lyon, ptsLyon.map(p => [p.lat, p.lng]));
        ptsLyon.forEach(p => {
            L.marker([p.lat, p.lng], {icon: makeNumIcon(p.n, 'letter')})
                .addTo(lyon)
                .bindPopup(`<strong>${p.n}. ${p.name}</strong>`);
        });
        addPoiMarkers(lyon, foodLyon, 'food');
        fitAll(lyon, [...ptsLyon.map(p => [p.lat, p.lng]), ...foodLyon.map(f => [f.lat, f.lng])]);
        setTimeout(() => lyon.invalidateSize(), 50);
    }
}
