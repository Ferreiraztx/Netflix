// 1. Álbuns de Fotos específicos para cada opção
const albumHistoria = [
    "IMG_7970.jpeg",
    "IMG_4763.jpeg",
    "IMG_6830.jpeg",
    "IMG_6883.JPG",
    "IMG_8260.JPG",
    "IMG_8267.JPG",
    "IMG_9118.jpeg",
    "IMG_2454.jpeg"
];

const albumMomentos = [
    "IMG_9856.jpeg",
    "IMG_9904.jpeg",
    "IMG_2413.jpeg",
    "MG_9909.jpeg",
    "IMG_2416.jpeg",
    "f85fc7ad-d2b2-487d-a22a-b4fd9c4b5f5b.JPG",
];

const albumSempre = [
    "13bd24de-f25c-4916-9703-b759d2d34145.JPG",
    "IMG_1898.jpeg",
    "IMG_2069.jpeg",
    "IMG_2085.jpeg",
    "IMG_2466.jpeg",
    "IMG_2472.jpeg",
    "IMG_7139.jpeg",
];

// 2. Conectando os álbuns às capas dos filmes
const imagens = [
    { 
        nome: "Início da Nossa História", 
        img: "IMG_6787_jpg.JPG", 
        album: albumHistoria,
        musica: "O Amor Coloriu- Luan Santana - Luan Santana (youtube)" // Nome da música do 1º álbum
    },
    { 
        nome: "Formando", 
        img: "IMG_2413.jpeg", 
        album: albumMomentos,
        musica: "Luan Santana - INCONDICIONAL (Registro Histórico) - Luan Santana (youtube).mp3" // Nome da música do 2º álbum
    },
    { 
        nome: "Para Sempre", 
        img: "IMG_1945.jpeg", 
        album: albumSempre,
        musica: "Luan Santana - SINAIS (Registro Histórico) - Luan Santana (youtube).mp3"   // Nome da música do 3º álbum
    }
];

// Criamos uma variável global para guardar a música escolhida
let musicaAtual = "";

// 3. Fotos que passam no fundo do banner principal
const fotosFundo = [
    "7f14491f-001e-4ee7-be4d-b56f55558a4e.JPG",
    "IMG_2424.jpeg",
    "IMG_2427.jpeg"
];

// Variáveis de controle
let indiceFundo = 0;
let albumAtual = []; 
let slideshowInterval;
let indiceSlide = 0;

// SELEÇÃO DE PERFIL
function selectProfile(name) {
    new Audio('netflix-tudum-sfx-n-c.mp3').play().catch(() => {});

    document.getElementById('profile-screen').style.display = "none";
    const main = document.getElementById('main-site');
    main.style.display = "block";
    
    setTimeout(() => {
        main.style.opacity = "1";
    }, 50);

    document.getElementById('user-welcome').innerText = "Olá, Clara!";
    
    carregarFilmes();
    iniciarBanner();
}

// LÓGICA DO BANNER ROTATIVO (FUNDO)
function iniciarBanner() {
    mudarFundo();
    setInterval(mudarFundo, 5000); 
}

function mudarFundo() {
    const bg = document.getElementById('banner-bg');
    if (bg) {
        const imgTemp = new Image();
        imgTemp.src = fotosFundo[indiceFundo];
        
        imgTemp.onload = function() {
            bg.style.backgroundImage = `url(${fotosFundo[indiceFundo]})`;
            indiceFundo = (indiceFundo + 1) % fotosFundo.length;
        };
    }
}

// CARREGAR AS OPÇÕES DE FILMES
function carregarFilmes() {
    const lista = document.getElementById('movie-list');
    if(lista.innerHTML !== "") return; 

    imagens.forEach(filme => {
        const img = document.createElement('img');
        img.src = filme.img;
        img.className = 'row__poster';
        img.onclick = () => openModal(filme);
        lista.appendChild(img);
    });
}

function openModal(filme) {
    document.getElementById('modal-title').innerText = filme.nome;
    document.getElementById('modal-img').style.backgroundImage = `url(${filme.img})`;
    document.getElementById('movie-modal').style.display = "flex";
    
    albumAtual = filme.album; 
    musicaAtual = filme.musica; // Guarda a música específica deste álbum
}

function closeModal() {
    document.getElementById('movie-modal').style.display = "none";
}

function startSlideshow() {
    closeModal(); 
    
    const player = document.getElementById('slideshow-player');
    const music = document.getElementById('bg-music');
    
    // MUDANÇA AQUI: Troca o arquivo de áudio antes de começar
    music.src = musicaAtual; 
    
    player.style.display = "flex";
    
    music.play().catch(() => console.log("Erro ao tocar música. Verifique o nome do arquivo."));
    
    indiceSlide = 0;
    mostrarProximoSlide();
    
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(mostrarProximoSlide, 4000); 
}

function mostrarProximoSlide() {
    const slideImg = document.getElementById('slide-img');
    
    // Usa o albumAtual (definido ao abrir o modal) em vez das fotos de fundo
    if (albumAtual.length > 0) {
        slideImg.style.backgroundImage = `url(${albumAtual[indiceSlide]})`;
        indiceSlide = (indiceSlide + 1) % albumAtual.length;
    }
}

function stopSlideshow() {
    const player = document.getElementById('slideshow-player');
    const music = document.getElementById('bg-music');
    
    player.style.display = "none";
    music.pause();
    music.currentTime = 0; 
    clearInterval(slideshowInterval);
}

// Configura o clique do botão "Assistir" do Modal
document.querySelector('.play-btn').onclick = startSlideshow;