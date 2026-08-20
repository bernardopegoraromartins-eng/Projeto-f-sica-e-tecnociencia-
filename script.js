/* ============================================
   ÓPTICA DA VISÃO – ESTRUTURA DO OLHO HUMANO
   Arquivo: script.js
   ============================================ */

'use strict';

// ============================================
// DADOS DAS ESTRUTURAS ANATÔMICAS
// ============================================
const STRUCTURE_DATA = {
    cornea: {
        title: 'Córnea',
        icon: '👁️',
        text: 'Camada transparente e curvada na parte frontal do olho. É responsável por aproximadamente 2/3 da refração da luz que entra no olho, funcionando como uma lente fixa. Possui cerca de 0,5 mm de espessura.',
        color: '#b8d4e3'
    },
    iris: {
        title: 'Íris',
        icon: '',
        text: 'Estrutura muscular colorida que controla o diâmetro da pupila. Em ambientes claros, contrai-se para reduzir a entrada de luz; no escuro, dilata-se para permitir mais luz. Sua cor varia entre indivíduos.',
        color: '#4a7c9b'
    },
    pupila: {
        title: 'Pupila',
        icon: '⚫',
        text: 'Abertura circular no centro da íris por onde a luz entra no olho. Seu tamanho varia de 2 a 8 mm de diâmetro, ajustando-se automaticamente à intensidade luminosa através do reflexo pupilar.',
        color: '#1a1a1a'
    },
    cristalino: {
        title: 'Cristalino',
        icon: '🔍',
        text: 'Lente biconvexa transparente e flexível localizada atrás da íris. Ajusta sua curvatura (acomodação) para focalizar objetos a diferentes distâncias na retina. Com a idade, pode perder flexibilidade (presbiopia).',
        color: '#7fb3d3'
    },
    'humor-aquoso': {
        title: 'Humor Aquoso',
        icon: '💧',
        text: 'Líquido claro que preenche a câmara anterior do olho (entre córnea e cristalino). Mantém a pressão intraocular e nutre a córnea e o cristalino. É produzido continuamente e drenado pelo canal de Schlemm.',
        color: '#e8f4f8'
    },
    'humor-vitreo': {
        title: 'Humor Vítreo',
        icon: '🟡',
        text: 'Substância gelatinosa transparente que preenche a câmara vítrea (entre cristalino e retina). Mantém a forma esférica do globo ocular e transmite a luz até a retina. Compõe cerca de 99% de água.',
        color: '#fff5e6'
    },
    retina: {
        title: 'Retina',
        icon: '📡',
        text: 'Camada interna sensível à luz, composta por fotorreceptores (cones e bastonetes). Converte estímulos luminosos em impulsos nervosos que são enviados ao cérebro. Contém cerca de 120 milhões de bastonetes e 6 milhões de cones.',
        color: '#e8b896'
    },
    coroide: {
        title: 'Coroide',
        icon: '🩸',
        text: 'Camada vascular entre a esclera e a retina. Contém numerosos vasos sanguíneos que fornecem oxigênio e nutrientes à retina externa. Sua pigmentação escura absorve luz dispersa, evitando reflexos internos.',
        color: '#c9956b'
    },
    esclera: {
        title: 'Esclera',
        icon: '🛡️',
        text: 'Camada externa branca, fibrosa e resistente do globo ocular. Protege as estruturas internas e mantém a forma do olho. É contínua com a córnea na parte frontal e representa 5/6 da superfície ocular.',
        color: '#d4a574'
    },
    'nervo-optico': {
        title: 'Nervo Óptico',
        icon: '⚡',
        text: 'Feixe de aproximadamente 1 milhão de fibras nervosas que transmite os impulsos elétricos da retina para o córtex visual do cérebro, onde a imagem é processada. O ponto de saída forma o "ponto cego".',
        color: '#f39c12'
    },
    fovea: {
        title: 'Fóvea',
        icon: '🎯',
        text: 'Pequena depressão no centro da mácula, na retina. Contém alta concentração de cones, sendo a região de máxima acuidade visual e percepção de cores. É onde a imagem é focalizada durante a visão direta.',
        color: '#d4896a'
    },
    'musculos-ciliares': {
        title: 'Músculos Ciliares',
        icon: '💪',
        text: 'Músculos circulares que controlam a forma do cristalino através dos zônulas (ligamentos suspensórios). Contraem-se para visão próxima (cristalino mais curvo) e relaxam para visão distante.',
        color: '#8b6f47'
    }
};

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================
const AppState = {
    activeStructure: null,
    isTooltipVisible: false,
    animationFrameId: null,
    lightRayDelay: 0.2
};

// ============================================
// SELEÇÃO DE ELEMENTOS DOM
// ============================================
const DOM = {
    tooltip: null,
    tooltipTitle: null,
    tooltipText: null,
    svgStructures: null,
    legendItems: null,
    lightRays: null,
    container: null
};

// ============================================
// INICIALIZAÇÃO
// ============================================
function init() {
    try {
        cacheDOMElements();
        setupEventListeners();
        setupLightRayAnimation();
        setupScrollAnimations();
        console.log('✅ Óptica da Visão inicializado com sucesso');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
    }
}

function cacheDOMElements() {
    DOM.tooltip = document.getElementById('structureInfo');
    DOM.tooltipTitle = document.getElementById('infoTitle');
    DOM.tooltipText = document.getElementById('infoText');
    DOM.svgStructures = document.querySelectorAll('.structure-path');
    DOM.legendItems = document.querySelectorAll('.legend-item');
    DOM.lightRays = document.querySelectorAll('.light-ray');
    DOM.container = document.querySelector('.container');
}

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    },

    getMousePosition(event) {
        return {
            x: event.clientX,
            y: event.clientY
        };
    },

    calculateTooltipPosition(x, y, tooltipWidth = 320, tooltipHeight = 200) {
        const margin = 20;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = x + margin;
        let top = y - tooltipHeight / 2;

        // Ajustar se sair da tela à direita
        if (left + tooltipWidth > viewportWidth) {
            left = x - tooltipWidth - margin;
        }

        // Ajustar se sair da tela em cima ou embaixo
        if (top < margin) {
            top = margin;
        } else if (top + tooltipHeight > viewportHeight) {
            top = viewportHeight - tooltipHeight - margin;
        }

        // Garantir que não saia à esquerda
        if (left < margin) {
            left = margin;
        }

        return { left, top };
    },

    highlightElement(element, duration = 300) {
        if (!element) return;
        element.classList.add('active');
        element.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            element.classList.remove('active');
            element.style.filter = '';
        }, duration);
    }
};

// ============================================
// GERENCIAMENTO DE TOOLTIP
// ============================================
const TooltipManager = {
    show(structureKey, x, y) {
        const data = STRUCTURE_DATA[structureKey];
        if (!data) return;

        DOM.tooltipTitle.innerHTML = `${data.icon} ${data.title}`;
        DOM.tooltipText.textContent = data.text;

        const position = Utils.calculateTooltipPosition(x, y);
        DOM.tooltip.style.left = `${position.left}px`;
        DOM.tooltip.style.top = `${position.top}px`;
        DOM.tooltip.style.display = 'block';

        AppState.isTooltipVisible = true;
        AppState.activeStructure = structureKey;

        // Sincronizar destaque
        this.syncHighlight(structureKey);
    },

    hide() {
        DOM.tooltip.style.display = 'none';
        AppState.isTooltipVisible = false;
        AppState.activeStructure = null;
        this.clearHighlights();
    },

    syncHighlight(structureKey) {
        this.clearHighlights();

        // Destacar no SVG
        DOM.svgStructures.forEach(el => {
            if (el.dataset.structure === structureKey) {
                el.classList.add('active');
            }
        });

        // Destacar na legenda
        DOM.legendItems.forEach(item => {
            if (item.dataset.structure === structureKey) {
                item.style.borderColor = 'var(--cor-primaria)';
                item.style.boxShadow = 'var(--sombra-suave)';
            }
        });
    },

    clearHighlights() {
        DOM.svgStructures.forEach(el => el.classList.remove('active'));
        DOM.legendItems.forEach(item => {
            item.style.borderColor = '';
            item.style.boxShadow = '';
        });
    }
};

// ============================================
// INTERATIVIDADE SVG
// ============================================
function setupSVGInteractivity() {
    DOM.svgStructures.forEach(element => {
        // Mouse enter
        element.addEventListener('mouseenter', (e) => {
            const structure = element.dataset.structure;
            const pos = Utils.getMousePosition(e);
            TooltipManager.show(structure, pos.x, pos.y);
        });

        // Mouse move (atualizar posição do tooltip)
        element.addEventListener('mousemove', Utils.throttle((e) => {
            if (AppState.isTooltipVisible) {
                const pos = Utils.getMousePosition(e);
                const position = Utils.calculateTooltipPosition(pos.x, pos.y);
                DOM.tooltip.style.left = `${position.left}px`;
                DOM.tooltip.style.top = `${position.top}px`;
            }
        }, 50));

        // Mouse leave
        element.addEventListener('mouseleave', () => {
            TooltipManager.hide();
        });

        // Click
        element.addEventListener('click', (e) => {
            const structure = element.dataset.structure;
            Utils.highlightElement(element);
            console.log(`🔬 Estrutura selecionada: ${structure}`);

            // Efeito de ripple
            createRippleEffect(e, element);
        });

        // Suporte a teclado (acessibilidade)
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', `Ver informações sobre ${STRUCTURE_DATA[element.dataset.structure]?.title || 'estrutura'}`);

        element.addEventListener('focus', (e) => {
            const rect = element.getBoundingClientRect();
            const structure = element.dataset.structure;
            TooltipManager.show(structure, rect.right, rect.top);
        });

        element.addEventListener('blur', () => {
            TooltipManager.hide();
        });
    });
}

// ============================================
// INTERATIVIDADE DA LEGENDA
// ============================================
function setupLegendInteractivity() {
    DOM.legendItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const structure = item.dataset.structure;
            const rect = item.getBoundingClientRect();
            TooltipManager.show(structure, rect.right, rect.top + rect.height / 2);
        });

        item.addEventListener('mouseleave', () => {
            TooltipManager.hide();
        });

        item.addEventListener('click', () => {
            const structure = item.dataset.structure;
            Utils.highlightElement(item);

            // Rolar até o elemento SVG correspondente
            const svgElement = document.querySelector(`.structure-path[data-structure="${structure}"]`);
            if (svgElement) {
                svgElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => Utils.highlightElement(svgElement, 800), 500);
            }
        });
    });
}

// ============================================
// ANIMAÇÃO DOS RAIOS DE LUZ
// ============================================
function setupLightRayAnimation() {
    if (!DOM.lightRays || DOM.lightRays.length === 0) return;

    DOM.lightRays.forEach((ray, index) => {
        ray.style.animationDelay = `${index * AppState.lightRayDelay}s`;
        ray.style.animationDuration = '2s';
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    const animatableElements = document.querySelectorAll('.legend-item, .light-diagram, .main-diagram');
    animatableElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// EFEITO RIPPLE NO CLICK
// ============================================
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Adicionar keyframe do ripple dinamicamente
function addRippleKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// EVENT LISTENERS GLOBAIS
// ============================================
function setupEventListeners() {
    // Fechar tooltip ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.structure-path') && 
            !e.target.closest('.legend-item') && 
            !e.target.closest('.structure-info')) {
            TooltipManager.hide();
        }
    });

    // Fechar tooltip ao rolar
    window.addEventListener('scroll', Utils.debounce(() => {
        if (AppState.isTooltipVisible) {
            TooltipManager.hide();
        }
    }, 100));

    // Redimensionamento da janela
    window.addEventListener('resize', Utils.debounce(() => {
        TooltipManager.hide();
    }, 250));

    // Tecla Escape para fechar tooltip
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            TooltipManager.hide();
        }
    });

    // Configurar interatividade específica
    setupSVGInteractivity();
    setupLegendInteractivity();
}

// ============================================
// MODO DE ESTUDO (BÔNUS)
// ============================================
const StudyMode = {
    isActive: false,
    currentIndex: 0,
    structures: Object.keys(STRUCTURE_DATA),

    start() {
        this.isActive = true;
        this.currentIndex = 0;
        this.showNext();
        console.log('📚 Modo de estudo iniciado');
    },

    stop() {
        this.isActive = false;
        TooltipManager.hide();
        console.log('️ Modo de estudo finalizado');
    },

    showNext() {
        if (!this.isActive) return;

        const structureKey = this.structures[this.currentIndex];
        const data = STRUCTURE_DATA[structureKey];
        const svgElement = document.querySelector(`.structure-path[data-structure="${structureKey}"]`);

        if (svgElement) {
            const rect = svgElement.getBoundingClientRect();
            TooltipManager.show(structureKey, rect.right + 20, rect.top);
            Utils.highlightElement(svgElement, 2000);
        }

        this.currentIndex = (this.currentIndex + 1) % this.structures.length;
    },

    toggle() {
        if (this.isActive) {
            this.stop();
        } else {
            this.start();
        }
    }
};

// Expor StudyMode globalmente para uso no console
window.StudyMode = StudyMode;

// ============================================
// INICIALIZAÇÃO AO CARREGAR
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        addRippleKeyframes();
        init();
    });
} else {
    addRippleKeyframes();
    init();
}

// ============================================
// API PÚBLICA (para uso no console)
// ============================================
window.EyeDiagram = {
    showStructure: (key) => {
        if (STRUCTURE_DATA[key]) {
            const el = document.querySelector(`.structure-path[data-structure="${key}"]`);
            if (el) {
                const rect = el.getBoundingClientRect();
                TooltipManager.show(key, rect.right + 20, rect.top);
                Utils.highlightElement(el, 1500);
            }
        } else {
            console.log('Estruturas disponíveis:', Object.keys(STRUCTURE_DATA));
        }
    },
    listStructures: () => {
        console.table(
            Object.entries(STRUCTURE_DATA).map(([key, data]) => ({
                chave: key,
                nome: data.title,
                cor: data.color
            }))
        );
    },
    startStudyMode: () => StudyMode.start(),
    stopStudyMode: () => StudyMode.stop()
};

console.log('%c🔬 Óptica da Visão', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cUse window.EyeDiagram para interagir via console', 'color: #764ba2;');
