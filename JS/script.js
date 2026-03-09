// FUNÇÃO PARA FALLBACK DE IMAGENS
    function setImageFallback(imgElement, text) {
        const svgFallback = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="%23A0B0C0"><rect width="400" height="400" fill="%230C2340"/><text x="200" y="220" font-size="60" text-anchor="middle" fill="%23E9C46A" font-family="Bangers">${text}</text></svg>')`;
        imgElement.style.backgroundImage = svgFallback;
        imgElement.classList.add('img-fallback');
    }

    // APLICAR FALLBACK PARA CADA IMAGEM
    const imagensComFallback = [
        { elemento: document.getElementById('slide1-img'), texto: 'FINAL' },
        { elemento: document.getElementById('slide2-img'), texto: 'LUTAS' },
        { elemento: document.getElementById('slide3-img'), texto: 'BASE' },
        { elemento: document.getElementById('historia-img'), texto: 'HISTÓRIA' },
        { elemento: document.getElementById('presidente-img'), texto: 'R10' },
        { elemento: document.getElementById('jogador1-img'), texto: 'R10' },
        { elemento: document.getElementById('jogador2-img'), texto: 'LT' },
        { elemento: document.getElementById('jogador3-img'), texto: 'AA' },
        { elemento: document.getElementById('jogador4-img'), texto: 'MV' },
        { elemento: document.getElementById('jogador5-img'), texto: 'FP' },
        { elemento: document.getElementById('jogador6-img'), texto: 'CS' },
        { elemento: document.getElementById('jogador7-img'), texto: 'DG' },
        { elemento: document.getElementById('jogador8-img'), texto: 'BM' },
        { elemento: document.getElementById('jogador9-img'), texto: 'FL' },
        { elemento: document.getElementById('jogo1-img'), texto: '6X2' },
        { elemento: document.getElementById('jogo2-img'), texto: 'CLÁSSICO' },
        { elemento: document.getElementById('jogo3-img'), texto: 'ACAMP' },
        { elemento: document.getElementById('jogo4-img'), texto: 'TAÇA' },
        { elemento: document.getElementById('luta1-img'), texto: 'BOXE' },
        { elemento: document.getElementById('luta2-img'), texto: 'JIU' },
        { elemento: document.getElementById('luta3-img'), texto: 'SPAR' },
        { elemento: document.getElementById('luta4-img'), texto: 'PÓDIO' }
    ];

    imagensComFallback.forEach(item => {
        if (item.elemento) {
            // Verificar se a imagem carregou
            const img = new Image();
            const bgImage = item.elemento.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
            
            if (bgImage && bgImage !== 'none' && bgImage !== 'undefined') {
                img.src = bgImage;
                img.onload = () => {
                    // Imagem carregou, manter original
                    item.elemento.classList.remove('image-loading');
                };
                img.onerror = () => {
                    // Falha no carregamento, aplicar fallback
                    setImageFallback(item.elemento, item.texto);
                    item.elemento.classList.remove('image-loading');
                };
            } else {
                // Se não tem imagem definida, aplicar fallback direto
                setImageFallback(item.elemento, item.texto);
                item.elemento.classList.remove('image-loading');
            }
        }
    });

    // MENU HAMBÚRGUER - CORRIGIDO
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    const menuOverlay = document.getElementById('menuOverlay');
    
    // Função para fechar o menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura rolagem
    }

    // Função para abrir o menu
    function openMenu() {
        hamburger.classList.add('active');
        navList.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
    }

    // Toggle do menu ao clicar no hamburger
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navList.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fechar ao clicar no overlay
    menuOverlay.addEventListener('click', () => {
        closeMenu();
    });

    // Fechar ao clicar em um link do menu
    document.querySelectorAll('.nav-list li a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Prevenir que cliques dentro do menu fechem ele (bubbling)
    navList.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navList.classList.contains('active')) {
            closeMenu();
        }
    });

    // SLIDER COM SWIPE
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    const threshold = 50;

    function updateSlider() { 
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; 
    }

    nextBtn.addEventListener('click', () => { 
        currentIndex = (currentIndex + 1) % slides.length; 
        updateSlider(); 
    });

    prevBtn.addEventListener('click', () => { 
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; 
        updateSlider(); 
    });

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        slider.style.transition = 'none';
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
        const diff = endX - startX;
        const offset = -currentIndex * 100 + (diff / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.transition = 'transform 0.4s ease-out';
        
        const diff = endX - startX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            } else {
                currentIndex = (currentIndex + 1) % slides.length;
            }
        }
        updateSlider();
    });

    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        slider.style.transition = 'none';
        e.preventDefault();
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        endX = e.clientX;
        const diff = endX - startX;
        const offset = -currentIndex * 100 + (diff / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    });

    slider.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.transition = 'transform 0.4s ease-out';
        
        const diff = endX - startX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            } else {
                currentIndex = (currentIndex + 1) % slides.length;
            }
        }
        updateSlider();
    });

    slider.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            slider.style.transition = 'transform 0.4s ease-out';
            updateSlider();
        }
    });

    setInterval(() => { 
        if (!isDragging) {
            currentIndex = (currentIndex + 1) % slides.length; 
            updateSlider(); 
        }
    }, 15000);

    // BOTÃO VOLTAR AO TOPO
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });