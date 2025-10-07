// Global variables
let currentScreen = 'loading';
let typewriterInterval = null;
let isTyping = false;
let currentPhotoIndex = 0;
let tetrisGame = null; // Placeholder if needed

function initializeApp() {
    console.log("Initializing app...");
    simulateLoading();
}

function simulateLoading() {
    const progressFill = document.getElementById('progress-fill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressFill.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            transitionToMainScreen();
        }
    }, 50);
}

function transitionToMainScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');

    loadingScreen.classList.add('fade-out');

    setTimeout(() => {
        loadingScreen.classList.remove('active', 'fade-out', 'loading-complete');
        mainScreen.classList.add('active', 'screen-entering');
        currentScreen = 'main';

        setTimeout(() => {
            initializeMainScreen();
        }, 100);

        setTimeout(() => {
            mainScreen.classList.remove('screen-entering');
        }, 1200);
    }, 600);
}

function initializeMainScreen() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    const startBtn = document.querySelector('.start-btn');

    menuButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                const target = this.getAttribute('data-page');
                showScreen(target);
            }, 150);
        });
    });

    if (startBtn) {
        startBtn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

function showScreen(screenName) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;

        switch (screenName) {
            case 'message':
                setTimeout(() => initializeMessage(), 100);
                break;
            case 'gallery':
                setTimeout(() => initializeGallery(), 100);
                break;
            case 'music':
                setTimeout(() => initializeMusicPlayer(), 100);
                break;
            case 'tetris':
                setTimeout(() => {
                    if (tetrisGame && !tetrisGame.gameRunning) {
                        startTetrisGame();
                    }
                }, 100);
                break;
        }
    }
}

// Message Page
function initializeMessage() {
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }

    const messageScreen = document.getElementById('message-screen');
    const pageScreen = messageScreen.querySelector('.page-screen');
    if (pageScreen) {
        pageScreen.innerHTML = `
            <div class="page-header">Message</div>
            <div class="message-content"></div>
            <button class="skip-btn">SKIP</button>
        `;
        const skipBtn = pageScreen.querySelector('.skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', skipTypewriter);
        }
    }

    setTimeout(() => startTypewriter(), 300);
}

function startTypewriter() {
    const messageContent = document.querySelector('.message-content');
    if (!messageContent) return;

    const fullMessage = `Hi,

Happy Birthday!

Sayang, selamat ulang tahun ya…
Di dunia ini mungkin banyak orang yang kenal kamu,
tapi cuma satu yang benar-benar sayang kamu sepenuh hati — aku.

Aku nggak butuh alasan buat tetap di sampingmu,
cukup tahu kalau kamu ada, itu sudah cukup buat bahagiaku.

Semoga di hari spesialmu ini, kamu sadar…
kalau cinta yang paling tulus itu sedang menatapmu sekarang —
lewat kata-kata ini.

Aku sayang kamu, bukan karena hari ini ulang tahunmu,
tapi karena setiap detik bersamamu terasa seperti hadiah. 💖`;

    messageContent.innerHTML = '';
    let charIndex = 0;
    isTyping = true;

    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }

    typewriterInterval = setInterval(() => {
        if (charIndex < fullMessage.length) {
            const char = fullMessage[charIndex];
            messageContent.innerHTML += (char === '\n') ? '<br>' : char;
            charIndex++;
            messageContent.scrollTop = messageContent.scrollHeight;
        } else {
            clearInterval(typewriterInterval);
            isTyping = false;
        }
    }, 50);
}

function skipTypewriter() {
    if (isTyping && typewriterInterval) {
        clearInterval(typewriterInterval);
        const messageContent = document.querySelector('.message-content');
        if (messageContent) {
            const fullMessage = `Hi Cel,<br><br>Happy Birthday!<br><br>Hari ini aku pengen kamu ngerasain semua hal positif dan keajaiban yang cuma bisa didapetin kalo kamu ada di dunia ini. Semoga segala keinginanmu tercapai, apalagi yang kocak-kocak dan gak biasa, karena kamu tuh unik banget! Aku selalu percaya kalau kamu bisa melewati semua tantangan dengan kekuatan dan semangat yang luar biasa.<br><br>Terima kasih udah jadi bagian hidup aku yang paling berharga. Kamu bener-bener bikin hari-hari aku jadi lebih berarti dan penuh warna. Semoga di tahun yang baru ini, kamu makin bahagia, makin sukses, dan tentunya makin cantik (walaupun udah cantik banget sih!).<br><br>I love you so much! 💕`;
            messageContent.innerHTML = fullMessage;
            isTyping = false;
            messageContent.scrollTop = messageContent.scrollHeight;
        }
    }
}

// Gallery Page
function initializeGallery() {
    const galleryContent = document.querySelector('.gallery-content');
    if (!galleryContent) return;

    galleryContent.innerHTML = `
        <div class="photobox-header">
            <div class="photobox-dot red"></div>
            <span class="photobox-title">PHOTOBOX</span>
            <div class="photobox-dot green"></div>
        </div>
        <div class="photobox-progress">READY TO PRINT</div>
        <div class="photo-display">
            <div class="photo-placeholder">Press MULAI CETAK to start photo session</div>
        </div>
        <div class="photobox-controls">
            <button class="photo-btn">MULAI CETAK</button>
        </div>
    `;

    setTimeout(() => {
        const photoBtn = document.querySelector('.photo-btn');
        if (photoBtn) {
            photoBtn.addEventListener('click', startPhotoShow);
        }
    }, 100);
}

function startPhotoShow() {
  const photoDisplay = document.querySelector('.photo-display');
  if (!photoDisplay) return;

  const photos = [
    { text: 'Our First Date 💞', image: './images/photo1.jpg' },
    { text: 'Birthday Moment 🎂', image: './images/photo2.jpg' },
    { text: 'Adventure Time 🌟', image: './images/photo3.jpg' },
    { text: 'Cozy Together ❤️', image: './images/photo4.jpg' },
    { text: 'Sweet Memories 🥰', image: './images/photo5.jpg' },
    { text: 'Laugh Together 😂', image: './images/photo6.jpg' },
    { text: 'Perfect Day ☀️', image: './images/photo7.jpg' },
    { text: 'Love Forever 💖', image: './images/photo8.jpg' }
  ];

  photoDisplay.innerHTML = `
    <div class="photo-strip">
      <div class="photo-strip-header">PHOTOSTRIP SESSION</div>
      <div class="photo-frames-container">
        ${photos.map((photo, i) => `
          <div class="photo-frame" id="frame-${i + 1}">
            <img src="${photo.image}" alt="${photo.text}" />
            <div class="photo-caption">${photo.text}</div>
          </div>
        `).join('')}
      </div>
      <div class="photo-strip-footer">💕 BIRTHDAY MEMORIES 💕</div>
    </div>
  `;
}
