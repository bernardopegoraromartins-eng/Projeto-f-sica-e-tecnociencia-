const structures = {
    'cornea': { title: 'Córnea', text: 'Camada transparente frontal que refrata a luz.' },
    'iris': { title: 'Íris', text: 'Controla o tamanho da pupila e a entrada de luz.' },
    'pupila': { title: 'Pupila', text: 'Abertura que permite a passagem da luz.' },
    'cristalino': { title: 'Cristalino', text: 'Lente que focaliza a imagem na retina.' },
    'humor-aquoso': { title: 'Humor aquoso', text: 'Líquido que mantém a forma da parte frontal do olho.' },
    'humor-vitreo': { title: 'Humor vítreo', text: 'Gel transparente que preenche o globo ocular e mantém sua forma.' },
    'retina': { title: 'Retina', text: 'Camada sensível à luz que capta a imagem e a envia ao cérebro.' },
    'coroide': { title: 'Coroide', text: 'Camada vascular que nutre a retina e absorve o excesso de luz.' },
    'esclera': { title: 'Esclera', text: 'Camada externa branca, resistente e protetora do olho.' },
    'nervo-optico': { title: 'Nervo óptico', text: 'Transmite os impulsos nervosos visuais do olho para o cérebro.' },
    'fovea': { title: 'Fóvea', text: 'Pequena depressão na retina com máxima acuidade visual (visão detalhada).' },
    'musculos-ciliares': { title: 'Músculos ciliares', text: 'Controlam a acomodação (foco) do cristalino para perto ou longe.' }
};

const structureInfo = document.querySelector('.structure-info');
const infoTitle = structureInfo.querySelector('h3');
const infoText = structureInfo.querySelector('p');

document.querySelectorAll('.structure-path, .legend-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const structure = this.getAttribute('data-structure');
        const data = structures[structure];
        if (data) {
            infoTitle.textContent = data.title;
            infoText.textContent = data.text;
            structureInfo.style.display = 'block';
            
            const rect = this.getBoundingClientRect();
            const tooltipWidth = 300;
            const spaceOnRight = window.innerWidth - rect.right;
            
            if (spaceOnRight < tooltipWidth + 20) {
                structureInfo.style.left = (rect.left - tooltipWidth - 20) + 'px';
            } else {
                structureInfo.style.left = (rect.right + 20) + 'px';
            }
            
            structureInfo.style.top = rect.top + 'px';
        }
    });

    item.addEventListener('mouseleave', function() {
        structureInfo.style.display = 'none';
    });
});

const lightRays = document.querySelectorAll('.light-ray');
lightRays.forEach((ray, index) => {
    ray.style.animationDelay = `${index * 0.2}s`;
});

window.addEventListener('resize', function() {
    structureInfo.style.display = 'none';
});

document.querySelectorAll('.structure-path').forEach(element => {
    element.addEventListener('click', function() {
        const structure = this.getAttribute('data-structure');
        console.log(`Estrutura selecionada: ${structure}`);
        
        this.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            this.style.filter = 'none';
        }, 300);
    });
});
