// ===== WEBSITE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Wedding Website Loaded Successfully!');
    
    // Set tanggal pernikahan 4 hari dari sekarang
    setWeddingDate();
    
    // Immediately hide loading screen after a short delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }
        
        // Enable body scrolling
        document.body.style.overflow = 'auto';
        
        // Auto play music
        const musicPlayer = document.getElementById('weddingMusic');
        if (musicPlayer) {
            musicPlayer.volume = 0.7;
            musicPlayer.play().catch(e => console.log('Auto-play blocked:', e));
        }
        
        // Initialize all features
        initializeWebsite();
    }, 1500);
});

function setWeddingDate() {
    const today = new Date();
    const weddingDate = new Date(today);
    weddingDate.setDate(today.getDate() + 4);
    
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = weddingDate.getDate();
    const month = months[weddingDate.getMonth()];
    const year = weddingDate.getFullYear();
    
    const dateString = `${day} ${month} ${year}`;
    
    const navDate = document.getElementById('navDate');
    const heroDate = document.getElementById('heroDate');
    const rsvpDeadline = document.getElementById('rsvpDeadline');
    const footerDate = document.getElementById('footerDate');
    
    if (navDate) navDate.textContent = dateString;
    if (heroDate) heroDate.textContent = dateString;
    if (rsvpDeadline) rsvpDeadline.textContent = `Mohon konfirmasi kehadiran Anda sebelum ${dateString}`;
    if (footerDate) footerDate.textContent = dateString;
    
    const eventDay1 = document.getElementById('eventDay1');
    const eventDay2 = document.getElementById('eventDay2');
    const eventDay3 = document.getElementById('eventDay3');
    const eventMonth1 = document.getElementById('eventMonth1');
    const eventMonth2 = document.getElementById('eventMonth2');
    const eventMonth3 = document.getElementById('eventMonth3');
    
    if (eventDay1) eventDay1.textContent = day;
    if (eventDay2) eventDay2.textContent = day;
    if (eventDay3) eventDay3.textContent = day + 1;
    if (eventMonth1) eventMonth1.textContent = month;
    if (eventMonth2) eventMonth2.textContent = month;
    if (eventMonth3) eventMonth3.textContent = month;
}

function initializeWebsite() {
    initNavigation();
    initCountdown();
    initMusicPlayer();
    // Gallery function dihapus karena tidak ada foto
    initRSVPForm();
    initLocation();
    initWishes();
    initEventListeners();
    
    setTimeout(() => {
        showToast('✨ Selamat datang di undangan pernikahan kami!', 'success');
    }, 2000);
}

// ===== 1. NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-nav').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 2. COUNTDOWN TIMER =====
function initCountdown() {
    const today = new Date();
    const weddingDate = new Date(today);
    weddingDate.setDate(today.getDate() + 4);
    weddingDate.setHours(9, 0, 0, 0);
    
    const weddingTime = weddingDate.getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingTime - now;
        
        if (timeLeft < 0) {
            document.getElementById('countdown').innerHTML = `
                <div class="countdown-item">
                    <span class="number">00</span>
                    <span class="label">Hari</span>
                </div>
                <div class="wedding-message">
                    <p>🎉 Acara Sedang Berlangsung!</p>
                </div>
            `;
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== 3. MUSIC PLAYER =====
function initMusicPlayer() {
    const musicToggle = document.getElementById('toggleMusic');
    const musicPlayer = document.getElementById('weddingMusic');
    
    if (!musicToggle || !musicPlayer) return;
    
    musicPlayer.volume = 0.5;
    
    musicToggle.addEventListener('click', function() {
        if (musicPlayer.paused) {
            musicPlayer.play()
                .then(() => {
                    this.innerHTML = '<i class="fas fa-pause"></i> <span>Pause Musik</span>';
                    showToast('🎵 Musik dimulai', 'success');
                })
                .catch(error => {
                    showToast('❌ Musik tidak dapat diputar', 'error');
                    console.error('Music error:', error);
                });
        } else {
            musicPlayer.pause();
            this.innerHTML = '<i class="fas fa-music"></i> <span>Putar Musik</span>';
        }
    });
}

// ===== 4. RSVP FORM =====
function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (!rsvpForm) return;
    
    const decreaseBtn = document.getElementById('decreaseGuest');
    const increaseBtn = document.getElementById('increaseGuest');
    const guestCount = document.getElementById('guestCount');
    
    if (decreaseBtn && increaseBtn && guestCount) {
        decreaseBtn.addEventListener('click', () => {
            let value = parseInt(guestCount.value) || 1;
            if (value > 1) {
                guestCount.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            let value = parseInt(guestCount.value) || 1;
            if (value < 10) {
                guestCount.value = value + 1;
            }
        });
    }
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('guestName')?.value.trim(),
            email: document.getElementById('guestEmail')?.value.trim(),
            phone: document.getElementById('guestPhone')?.value.trim(),
            relation: document.getElementById('guestRelation')?.value,
            attendance: document.querySelector('input[name="attendance"]:checked')?.value,
            guests: guestCount?.value || 1,
            message: document.getElementById('guestMessage')?.value.trim()
        };
        
        if (!formData.name || !formData.email || !formData.attendance || !formData.relation) {
            showToast('Harap lengkapi semua field yang wajib!', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
            rsvps.push({
                ...formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
            
            showToast(`Terima kasih ${formData.name}! Konfirmasi berhasil dikirim.`, 'success');
            
            rsvpForm.reset();
            if (guestCount) guestCount.value = 1;
            
            updateRSVPStats();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    updateRSVPStats();
}

function updateRSVPStats() {
    const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    
    const total = rsvps.length;
    const attending = rsvps.filter(r => r.attendance === 'yes').length;
    const notAttending = rsvps.filter(r => r.attendance === 'no').length;
    const totalPeople = rsvps.reduce((sum, r) => {
        return sum + (r.attendance === 'yes' ? parseInt(r.guests) || 1 : 0);
    }, 0);
    
    const totalEl = document.getElementById('totalGuests');
    const attendingEl = document.getElementById('attendingGuests');
    const notAttendingEl = document.getElementById('notAttendingGuests');
    const peopleEl = document.getElementById('totalPeople');
    
    if (totalEl) totalEl.textContent = total;
    if (attendingEl) attendingEl.textContent = attending;
    if (notAttendingEl) notAttendingEl.textContent = notAttending;
    if (peopleEl) peopleEl.textContent = totalPeople;
}

// ===== 5. LOCATION =====
function initLocation() {
    const locationTabs = document.querySelectorAll('.location-tab');
    const getDirectionsBtn = document.getElementById('getDirections');
    const shareLocationBtn = document.getElementById('shareLocation');
    
    if (locationTabs.length) {
        locationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                locationTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const locationId = this.dataset.location;
                updateLocationDetails(locationId);
            });
        });
        
        if (locationTabs[0]) {
            locationTabs[0].classList.add('active');
            updateLocationDetails(locationTabs[0].dataset.location);
        }
    }
    
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.location-tab.active');
            if (!activeTab) return;
            
            const locationId = activeTab.dataset.location;
            const locations = {
                akad: '-6.326975,107.289621',
                resepsi: '-6.326975,107.289621',
                syukuran: '-6.326975,107.289621'
            };
            
            const coords = locations[locationId] || locations.akad;
            const url = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
            
            window.open(url, '_blank');
            showToast('Membuka Google Maps...', 'info');
        });
    }
    
    if (shareLocationBtn) {
        shareLocationBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.location-tab.active');
            if (!activeTab) return;
            
            const locationId = activeTab.dataset.location;
            const locationNames = {
                akad: 'Galuh Mas Karawang (Akad Nikah)',
                resepsi: 'Galuh Mas Karawang (Resepsi)',
                syukuran: 'Galuh Mas Karawang (Syukuran)'
            };
            
            const locationName = locationNames[locationId] || 'Acara Pernikahan';
            const shareText = `Lokasi ${locationName} untuk pernikahan Alfat & Bintang: ${window.location.href}#location`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Lokasi Pernikahan Alfat & Bintang',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(shareText)
                    .then(() => showToast('Link lokasi disalin!', 'success'))
                    .catch(() => showToast('Gagal menyalin link', 'error'));
            }
        });
    }
}

function updateLocationDetails(locationId) {
    const locations = {
        akad: {
            title: 'Galuh Mas Karawang (Akad Nikah)',
            time: '09:00 - 11:00 WIB',
            address: 'Jl. Galuh Mas Raya, Sukaharja, Telukjambe Timur, Karawang, Jawa Barat 41361',
            info: 'Gedung serbaguna utama, lantai 2'
        },
        resepsi: {
            title: 'Galuh Mas Karawang (Resepsi)',
            time: '18:00 - 21:00 WIB',
            address: 'Jl. Galuh Mas Raya, Sukaharja, Telukjambe Timur, Karawang, Jawa Barat 41361',
            info: 'Ballroom utama, dress code: Pastel colors / formal'
        },
        syukuran: {
            title: 'Galuh Mas Karawang (Syukuran)',
            time: '10:00 - 14:00 WIB',
            address: 'Jl. Galuh Mas Raya, Sukaharja, Telukjambe Timur, Karawang, Jawa Barat 41361',
            info: 'Area belakang gedung, khusus keluarga dan kerabat dekat'
        }
    };
    
    const location = locations[locationId] || locations.akad;
    
    const titleEl = document.getElementById('locationTitle');
    const timeEl = document.getElementById('locationTime');
    const addressEl = document.getElementById('locationAddress');
    const infoEl = document.getElementById('locationInfo');
    
    if (titleEl) titleEl.textContent = location.title;
    if (timeEl) timeEl.textContent = location.time;
    if (addressEl) addressEl.textContent = location.address;
    if (infoEl) infoEl.textContent = location.info;
}

// ===== 6. WISHES =====
function initWishes() {
    const wishForm = document.getElementById('wishForm');
    if (!wishForm) return;
    
    loadWishes();
    
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('wishName')?.value.trim();
        const message = document.getElementById('wishMessage')?.value.trim();
        
        if (!name || !message) {
            showToast('Harap isi nama dan ucapan!', 'error');
            return;
        }
        
        const newWish = {
            id: Date.now(),
            name,
            message,
            likes: 0,
            timeAgo: 'Baru saja'
        };
        
        const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
        wishes.unshift(newWish);
        localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
        
        addWishToWall(newWish);
        wishForm.reset();
        showToast('Ucapan berhasil dikirim! Terima kasih.', 'success');
    });
}

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    
    if (wishes.length === 0) {
        const sampleWishes = [
            {
                id: 1,
                name: "Budi Santoso",
                message: "Selamat menempuh hidup baru Alfat & Bintang. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
                likes: 12,
                timeAgo: "2 jam yang lalu"
            },
            {
                id: 2,
                name: "Ani Wijaya",
                message: "Selamat atas pernikahannya. Semoga langgeng sampai akhir hayat. Bahagia selalu!",
                likes: 8,
                timeAgo: "5 jam yang lalu"
            },
            {
                id: 3,
                name: "Dewi Lestari",
                message: "Barakallah untuk Alfat & Bintang. Semoga menjadi keluarga yang penuh berkah dan kebahagiaan.",
                likes: 15,
                timeAgo: "1 hari yang lalu"
            }
        ];
        
        localStorage.setItem('wedding_wishes', JSON.stringify(sampleWishes));
        sampleWishes.forEach(wish => addWishToWall(wish));
    } else {
        wishes.forEach(wish => addWishToWall(wish));
    }
}

function addWishToWall(wish) {
    const wishesWall = document.getElementById('wishesWall');
    if (!wishesWall) return;
    
    const wishElement = document.createElement('div');
    wishElement.className = 'wish-item';
    wishElement.setAttribute('data-id', wish.id);
    wishElement.innerHTML = `
        <div class="wish-header">
            <div class="wish-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="wish-info">
                <h4 class="wish-name">${escapeHtml(wish.name)}</h4>
                <span class="wish-time">${wish.timeAgo || 'Baru saja'}</span>
            </div>
        </div>
        <div class="wish-content">
            <p>${escapeHtml(wish.message)}</p>
        </div>
        <div class="wish-likes">
            <button class="like-btn" onclick="likeWish(${wish.id})">
                <i class="far fa-heart"></i> <span>${wish.likes || 0}</span>
            </button>
        </div>
    `;
    
    if (wishesWall.firstChild) {
        wishesWall.insertBefore(wishElement, wishesWall.firstChild);
    } else {
        wishesWall.appendChild(wishElement);
    }
}

window.likeWish = function(wishId) {
    const wishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    const wishIndex = wishes.findIndex(w => w.id === wishId);
    
    if (wishIndex !== -1) {
        wishes[wishIndex].likes = (wishes[wishIndex].likes || 0) + 1;
        localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
        
        const wishItem = document.querySelector(`.wish-item[data-id="${wishId}"]`);
        if (wishItem) {
            const likeSpan = wishItem.querySelector('.like-btn span');
            if (likeSpan) {
                likeSpan.textContent = wishes[wishIndex].likes;
            }
            
            const likeBtn = wishItem.querySelector('.like-btn');
            likeBtn.classList.add('liked');
            setTimeout(() => likeBtn.classList.remove('liked'), 300);
        }
        
        showToast('Terima kasih atas like-nya!', 'success');
    }
};

// ===== 7. EVENT LISTENERS =====
function initEventListeners() {
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', function() {
            const accountNumber = this.dataset.account;
            if (accountNumber) {
                navigator.clipboard.writeText(accountNumber)
                    .then(() => showToast('Nomor rekening disalin!', 'success'))
                    .catch(() => showToast('Gagal menyalin', 'error'));
            }
        });
    });
    
    document.querySelectorAll('.btn-calendar').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventName = this.dataset.event || 'Pernikahan Alfat & Bintang';
            const eventDate = this.dataset.date || '2026-03-10T18:00:00';
            const eventLocation = this.dataset.location || 'Jakarta';
            
            const startDate = new Date(eventDate);
            const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
            
            const formatDate = (date) => {
                return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, -3);
            };
            
            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&location=${encodeURIComponent(eventLocation)}&details=Acara pernikahan Alfat & Bintang`;
            
            window.open(calendarUrl, '_blank');
            showToast('Membuka Google Calendar...', 'info');
        });
    });
    
    const shareBtn = document.getElementById('shareInvitation');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const shareData = {
                title: 'Undangan Pernikahan Alfat & Bintang',
                text: 'Saya mengundang Anda untuk menghadiri pernikahan kami.',
                url: window.location.href
            };
            
            if (navigator.share) {
                navigator.share(shareData);
            } else {
                navigator.clipboard.writeText(shareData.url)
                    .then(() => showToast('Link undangan disalin!', 'success'))
                    .catch(() => showToast('Gagal menyalin link', 'error'));
            }
        });
    }
    
    const openInvitationBtn = document.getElementById('openInvitation');
    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', function() {
            document.getElementById('opening').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('galleryModal');
            if (modal && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        
        if (e.key === ' ' && !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            const musicToggle = document.getElementById('toggleMusic');
            if (musicToggle) musicToggle.click();
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

if (!document.getElementById('fadeOut-animation')) {
    const style = document.createElement('style');
    style.id = 'fadeOut-animation';
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100%); }
        }
        
        .like-btn.liked {
            animation: heartBeat 0.3s ease;
            color: var(--primary-color);
        }
        
        @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
}

setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && loadingScreen.style.opacity !== '0') {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        console.log('⚠️ Fallback: Loading screen hidden by timeout');
    }
}, 5000);

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        const musicPlayer = document.getElementById('weddingMusic');
        if (musicPlayer && !musicPlayer.paused) {
            musicPlayer.pause();
            const musicToggle = document.getElementById('toggleMusic');
            if (musicToggle) {
                musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Putar Musik</span>';
            }
        }
    }
});