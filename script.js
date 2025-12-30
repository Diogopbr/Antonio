// ================================================
// ANIMAÇÕES E INTERAÇÕES
// ================================================

// Animação suave ao rolar a página
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adicionar animação de entrada aos elementos quando visíveis
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar seções de conteúdo
    const sections = document.querySelectorAll('.content-section, .card, .tip');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Sistema de progresso (salvamento local)
    initProgressTracking();
    
    // Adicionar efeito de hover nos cards
    addCardEffects();
    
    // Adicionar indicador de scroll
    addScrollIndicator();
});

// ================================================
// SISTEMA DE RASTREAMENTO DE PROGRESSO
// ================================================
function initProgressTracking() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`progress-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`progress-${index}`, this.checked);
            updateProgressBar();
        });
    });
    
    updateProgressBar();
}

function updateProgressBar() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = total > 0 ? (checked / total) * 100 : 0;
    
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.textContent = Math.round(percentage) + '%';
    }
}

// ================================================
// EFEITOS DE CARDS
// ================================================
function addCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ================================================
// INDICADOR DE SCROLL
// ================================================
function addScrollIndicator() {
    // Criar barra de progresso de leitura
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #6366f1, #06b6d4)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.2s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// ================================================
// BOTÃO VOLTAR AO TOPO
// ================================================
(function() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #06b6d4);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'scale(1)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'scale(0)';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
})();

// ================================================
// MENSAGENS MOTIVACIONAIS
// ================================================
const motivationalMessages = [
    "🚀 Continue assim! Cada linha de código é um passo adiante!",
    "💪 Programador bom é programador consistente!",
    "🎯 Você está no caminho certo!",
    "⭐ Errar faz parte do processo de aprendizado!",
    "🔥 1 hora por dia... você vai longe!",
    "🧠 Quanto mais você pratica, mais fácil fica!",
    "✨ O futuro é de quem programa!",
    "🎮 Aprender programação é como passar de fase em um jogo!"
];

function showMotivationalMessage() {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #6366f1, #06b6d4);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        z-index: 1000;
        font-weight: 600;
        max-width: 300px;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(messageBox);
    
    setTimeout(() => {
        messageBox.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 500);
    }, 4000);
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mostrar mensagem motivacional após 30 segundos e depois a cada 5 minutos
setTimeout(() => {
    showMotivationalMessage();
    setInterval(showMotivationalMessage, 300000); // 5 minutos
}, 30000); // 30 segundos

// ================================================
// EASTER EGG - CÓDIGO KONAMI
// ================================================
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        const messages = [
            "🎮 Código Konami ativado! Você é um verdadeiro programador!",
            "🚀 Easter egg encontrado! +100 pontos de programador!",
            "⭐ Parabéns! Você descobriu o segredo do site!"
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        // Confete
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
        
        // Mostrar mensagem
        setTimeout(() => {
            alert(message);
        }, 1000);
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: 1;
            z-index: 10000;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        const fallDuration = 3000 + Math.random() * 2000;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / fallDuration;
            
            if (progress < 1) {
                confetti.style.top = (progress * window.innerHeight) + 'px';
                confetti.style.transform = `rotate(${progress * 360}deg)`;
                confetti.style.opacity = 1 - progress;
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(confetti);
            }
        }
        
        animate();
    }
})();

// ================================================
// LOG DE BOAS-VINDAS NO CONSOLE
// ================================================
console.log('%c🚀 Guia de Programação do Antônio', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBem-vindo ao código-fonte! Curioso, hein? 😉', 'font-size: 14px; color: #06b6d4;');
console.log('%cIsso é um ótimo sinal para um programador!', 'font-size: 14px; color: #10b981;');
console.log('%cDica: Tente apertar ↑↑↓↓←→←→BA no teclado... 🎮', 'font-size: 12px; color: #f59e0b;');
