import './style.css'

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');

    if (preloader && loadingBar && loadingText) {
        setTimeout(() => {
            loadingBar.style.width = '100%';
            setTimeout(() => {
                loadingText.innerHTML = 'LUMINA CORE ONLINE<span class="blink-underscore">_</span>';
                loadingText.classList.remove('text-brand-cyan');
                loadingText.classList.add('text-brand-purple');
            }, 1000);
        }, 300);

        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.remove('locked');

            setTimeout(() => {
                document.querySelectorAll('.fade-in-delay-1').forEach(el => el.classList.add('active'));
            }, 200);
            setTimeout(() => {
                document.querySelectorAll('.fade-in-delay-2').forEach(el => el.classList.add('active'));
            }, 400);
            setTimeout(() => {
                document.querySelectorAll('.fade-in-delay-3').forEach(el => el.classList.add('active'));
            }, 600);
            setTimeout(() => {
                document.querySelectorAll('.fade-in-delay-4').forEach(el => el.classList.add('active'));
            }, 800);
        }, 2000);
    } else {
        // Fallback for pages without preloader (like Polityka Prywatności)
        document.body.classList.remove('locked');
        setTimeout(() => {
            document.querySelectorAll('.fade-in-delay-1').forEach(el => el.classList.add('active'));
        }, 100);
        setTimeout(() => {
            document.querySelectorAll('.fade-in-delay-2').forEach(el => el.classList.add('active'));
        }, 300);
        setTimeout(() => {
            document.querySelectorAll('.fade-in-delay-3').forEach(el => el.classList.add('active'));
        }, 500);
    }
});

// Dynamic Ambient Light
const ambientLight = document.getElementById('ambient-light');
if (ambientLight) {
    document.addEventListener('mousemove', (e) => {
        ambientLight.style.left = `${e.clientX}px`;
        ambientLight.style.top = `${e.clientY}px`;
    });
}

// Nawigacja na scrollu
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }

    lastScrollY = currentScrollY;
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

reveals.forEach(reveal => revealObserver.observe(reveal));

// Skaner widoczności (odpala animację gdy element pojawi się na ekranie)
const scanObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.glass-card, .btn-scan').forEach(el => scanObserver.observe(el));

// Modal Logic
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function openModal(data) {
    let html = '';

    if (data.type === 'project') {
        html = `
            <div id="modal-img-wrapper" class="w-full md:w-1/2 h-56 md:h-auto relative border-b md:border-b-0 md:border-r border-white/5 flex items-start justify-center bg-[#050505] shrink-0 overflow-hidden cursor-pointer transition-all duration-500">
                <div class="corner-decor absolute top-6 left-6 w-4 h-4 border-t border-l border-brand-cyan z-20 opacity-70 pointer-events-none hidden md:block transition-opacity duration-300"></div>
                <div class="corner-decor absolute bottom-6 right-6 w-4 h-4 border-b border-r border-brand-purple z-20 opacity-70 pointer-events-none hidden md:block transition-opacity duration-300"></div>
                <img id="modal-main-img" src="${data.img}" class="absolute inset-0 w-full h-full object-contain opacity-50 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100" alt="${data.title}">
                
                <button id="modal-img-close" class="absolute top-4 right-4 md:top-6 md:right-6 z-50 opacity-0 pointer-events-none transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 overflow-hidden bg-obsidian/40 backdrop-blur-sm group hover:border-brand-cyan/50">
                    <div class="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                    <svg class="w-4 h-4 relative z-10 text-white group-hover:text-brand-cyan transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div id="modal-text-wrapper" class="w-full md:w-1/2 flex flex-col bg-[#0a0a0a] transition-all duration-500 overflow-hidden">
                <div class="p-6 md:p-12 flex flex-col h-full w-full min-w-[300px]">
                    <div class="font-mono text-[10px] md:text-xs text-brand-cyan mb-4 tracking-[0.2em] uppercase pr-8 font-bold whitespace-nowrap">
                        PLACEHOLDER ARTIFACT LABEL ${data.year || '0000'}
                    </div>
                    <h3 class="font-display text-3xl md:text-5xl font-light mb-4 text-white whitespace-nowrap">${data.title}</h3>
                    <div class="h-[1px] w-12 bg-gradient-to-r from-brand-cyan to-brand-purple mb-6 opacity-70 shrink-0"></div>
                    <div class="text-cool-gray font-light leading-relaxed mb-8 text-sm md:text-base space-y-4">
                        <p>${data.desc}</p>
                        <p>${data.fulldesc}</p>
                    </div>
                    <div class="mt-auto">
                        <div class="grid grid-cols-2 gap-4 mb-6 border-t border-white/5 pt-6">
                            <div>
                                <div class="font-mono text-[9px] text-cool-gray uppercase tracking-widest mb-2">Status / Typ</div>
                                <div class="font-mono text-xs text-brand-cyan">${data.tag}</div>
                            </div>
                            <div>
                                <div class="font-mono text-[9px] text-cool-gray uppercase tracking-widest mb-2">Znacznik Czasu</div>
                                <div class="font-mono text-xs text-white">${data.year || '2024.EXC'}</div>
                            </div>
                        </div>
                        <div class="mb-6">
                            <div class="font-mono text-[9px] text-cool-gray uppercase tracking-widest mb-2">Tech Stack</div>
                            <div class="font-mono text-xs text-cool-gray leading-relaxed break-words">${data.tech}</div>
                        </div>
                        <a href="${data.link}" target="_blank" class="group relative inline-flex items-center justify-center w-full py-4 border border-white/10 overflow-hidden bg-transparent transition-all duration-300 hover:border-brand-cyan/50 btn-scan shrink-0">
                            <span class="relative z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white group-hover:text-brand-cyan transition-colors">
                                [ ZOBACZ LIVE ]
                            </span>
                            <div class="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </a>
                    </div>
                </div>
            </div>
        `;
    } else if (data.type === 'team') {
        html = `
            <div class="w-full md:w-1/2 h-[400px] md:h-auto relative border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center bg-[#050505] shrink-0 overflow-hidden">
                <div class="absolute top-6 left-6 w-4 h-4 border-t border-l border-brand-purple z-20 opacity-70 pointer-events-none hidden md:block"></div>
                <div class="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-brand-cyan z-20 opacity-70 pointer-events-none hidden md:block"></div>
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgyMHYyMEgxem0xOCAxOEwyIDEgMSAyMGgxOHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-30 z-10 pointer-events-none mix-blend-overlay"></div>
                <img src="${data.img}" class="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 hover:grayscale-0 hover:opacity-100 cursor-crosshair" alt="${data.name}">
            </div>
            <div class="w-full md:w-1/2 p-6 md:p-12 flex flex-col bg-[#0a0a0a]">
                <div class="font-mono text-[10px] md:text-xs text-brand-purple mb-4 tracking-[0.2em] uppercase pr-8 font-bold">
                    PERSONEL BAZY / CURATOR
                </div>
                <h3 class="font-display text-3xl md:text-5xl font-light mb-2 text-white">${data.name}</h3>
                <p class="font-mono text-[10px] text-brand-cyan tracking-widest uppercase mb-6">${data.role}</p>
                <div class="h-[1px] w-12 bg-gradient-to-r from-brand-cyan to-brand-purple mb-6 opacity-70"></div>
                <div class="text-cool-gray font-light leading-relaxed mb-8 text-sm md:text-base space-y-4">
                    <p>${data.fulldesc}</p>
                </div>
                <div class="mt-auto">
                    <div class="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                        <div>
                            <div class="font-mono text-[9px] text-cool-gray uppercase tracking-widest mb-2">Status</div>
                            <div class="font-mono text-xs text-brand-purple">Aktywny</div>
                        </div>
                        <div>
                            <div class="font-mono text-[9px] text-cool-gray uppercase tracking-widest mb-2">Główny Skillset</div>
                            <div class="font-mono text-xs text-white leading-relaxed break-words">${data.skills}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = html;

    if (data.type === 'project') {
        const imgWrapper = document.getElementById('modal-img-wrapper');
        const textWrapper = document.getElementById('modal-text-wrapper');
        const imgCloseBtn = document.getElementById('modal-img-close');
        const img = document.getElementById('modal-main-img');
        const corners = document.querySelectorAll('.corner-decor');

        const toggleExpand = (e) => {
            if (e && e.target.closest('#modal-img-close')) {
                e.stopPropagation();
                shrink();
                return;
            }
            if (!imgWrapper.classList.contains('expanded')) {
                expand();
            } else {
                shrink();
            }
        };

        const expand = () => {
            imgWrapper.classList.add('expanded');
            if (window.innerWidth < 768) {
                textWrapper.style.maxHeight = textWrapper.offsetHeight + 'px';
                void textWrapper.offsetHeight; // reflow
                textWrapper.style.maxHeight = '0px';
                imgWrapper.style.height = '80vh';
            } else {
                imgWrapper.style.width = '100%';
                textWrapper.style.width = '0%';
            }
            textWrapper.style.opacity = '0';
            
            imgCloseBtn.classList.remove('opacity-0', 'pointer-events-none');
            img.classList.remove('opacity-50', 'grayscale', 'hover:grayscale-0', 'hover:opacity-100');
            img.classList.add('opacity-100');
            corners.forEach(c => c.style.opacity = '0');
        };

        const shrink = () => {
            imgWrapper.classList.remove('expanded');
            if (window.innerWidth < 768) {
                imgWrapper.style.height = '';
                textWrapper.style.maxHeight = '2000px';
                setTimeout(() => {
                    if (!imgWrapper.classList.contains('expanded')) {
                        textWrapper.style.maxHeight = '';
                    }
                }, 500);
            } else {
                imgWrapper.style.width = '';
                textWrapper.style.width = '';
            }
            textWrapper.style.opacity = '';
            
            imgCloseBtn.classList.add('opacity-0', 'pointer-events-none');
            img.classList.add('opacity-50', 'grayscale', 'hover:grayscale-0', 'hover:opacity-100');
            img.classList.remove('opacity-100');
            corners.forEach(c => c.style.opacity = '');
        };

        imgWrapper.addEventListener('click', toggleExpand);
    }

    modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
    }, 50);

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modalOverlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }, 300);
}

document.querySelectorAll('.glass-card[data-type]').forEach(card => {
    card.addEventListener('click', () => {
        openModal(card.dataset);
    });
});

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('mjgweb_cookie_consent')) {
        const consentBanner = document.createElement('div');
        consentBanner.id = 'cookie-consent-banner';
        consentBanner.className = 'fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 transform translate-y-full transition-transform duration-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]';
        
        consentBanner.innerHTML = `
            <div class="text-cool-gray text-xs md:text-sm font-light max-w-4xl">
                Wykorzystujemy pliki cookies w celach statystycznych i analitycznych, aby stale udoskonalać nasze usługi. 
                Dalsze korzystanie z serwisu oznacza akceptację naszej <a href="/polityka.html" class="text-brand-cyan hover:text-brand-purple transition-colors underline decoration-brand-cyan/30 underline-offset-4">Polityki Prywatności</a>.
            </div>
            <button id="accept-cookies" class="group relative px-6 py-3 bg-white/5 border border-white/10 text-white font-mono text-[10px] md:text-xs uppercase tracking-widest rounded-full overflow-hidden hover:border-brand-cyan/50 transition-all duration-300 shrink-0 w-full md:w-auto">
                <span class="relative z-10 group-hover:text-brand-cyan transition-colors">Akceptuję</span>
                <div class="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </button>
        `;
        
        document.body.appendChild(consentBanner);
        
        // Show banner after a slight delay
        setTimeout(() => {
            consentBanner.classList.remove('translate-y-full');
        }, 2500); 
        
        document.getElementById('accept-cookies').addEventListener('click', () => {
            localStorage.setItem('mjgweb_cookie_consent', 'true');
            consentBanner.classList.add('translate-y-full');
            setTimeout(() => consentBanner.remove(), 700);
        });
    }
});

// Page Transition Logic
const transitionOverlay = document.createElement('div');
transitionOverlay.className = 'fixed inset-0 z-[99999] bg-[#050505] pointer-events-none transition-opacity duration-500 ease-in-out';

if (!document.getElementById('preloader')) {
    transitionOverlay.style.opacity = '1';
    document.body.appendChild(transitionOverlay);
    
    // Fade out overlay on load
    requestAnimationFrame(() => {
        setTimeout(() => {
            transitionOverlay.style.opacity = '0';
        }, 50);
    });
} else {
    transitionOverlay.style.opacity = '0';
    document.body.appendChild(transitionOverlay);
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || link.getAttribute('target') === '_blank') return;
    
    const isInternalPage = href.startsWith('/') || href.startsWith('./') || href.includes('.html');
    if (isInternalPage && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        transitionOverlay.style.opacity = '1';
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }
});
