// Aguarda página carregar completamente
window.addEventListener('load', function() {
    console.log('✅ Página carregada!');
    
    // Banco de dados das estruturas
    var structuresData = {
        'cornea': {
            title: 'Córnea',
            icon: '👁️',
            color: '#b8d4e3',
            description: 'A córnea é a camada transparente e curva que forma a parte frontal do olho. É composta por cinco camadas de tecido e não possui vasos sanguíneos.',
            function: 'Refratar (desviar) os raios de luz que entram no olho. É responsável por cerca de 2/3 do poder de foco total do olho.'
        },
        'iris': {
            title: 'Íris',
            icon: '🎨',
            color: '#6b8e23',
            description: 'A íris é a estrutura circular e colorida do olho, localizada entre a córnea e o cristalino. É composta por tecido muscular e pigmentado.',
            function: 'Controlar o tamanho da pupila e regular a quantidade de luz que entra no olho. Funciona como o diafragma de uma câmera fotográfica.'
        },
        'pupila': {
            title: 'Pupila',
            icon: '⚫',
            color: '#000000',
            description: 'A pupila é a abertura circular preta no centro da íris. É um orifício que permite a passagem da luz para o interior do olho.',
            function: 'Permitir a entrada de luz no olho e controlar a quantidade de radiação luminosa que atinge a retina.'
        },
        'cristalino': {
            title: 'Cristalino',
            icon: '🔍',
            color: '#e8f4f8',
            description: 'O cristalino é uma lente biconvexa, transparente e flexível, localizada imediatamente atrás da íris e da pupila.',
            function: 'Focalizar a imagem na retina através do processo de acomodação visual, mudando de forma para focar em diferentes distâncias.'
        },
        'humor-aquoso': {
            title: 'Humor Aquoso',
            icon: '💧',
            color: '#e0f0ff',
            description: 'O humor aquoso é um líquido transparente que preenche a câmara anterior do olho (entre a córnea e o cristalino).',
            function: 'Manter a forma da parte frontal do olho, nutrir a córnea e o cristalino, e manter a pressão intraocular adequada.'
        },
        'humor-vitreo': {
            title: 'Humor Vítreo',
            icon: '💎',
            color: '#f0f8ff',
            description: 'O humor vítreo é um gel transparente que preenche aproximadamente 80% do volume do globo ocular (entre o cristalino e a retina).',
            function: 'Manter a forma esférica do globo ocular, amortecer impactos físicos e manter a retina pressionada contra a parede posterior.'
        },
        'retina': {
            title: 'Retina',
            icon: '',
            color: '#8b4513',
            description: 'A retina é a camada interna do olho, sensível à luz, composta por milhões de células fotorreceptoras (cones e bastonetes).',
            function: 'Captar a imagem formada pela luz e convertê-la em impulsos elétricos nervosos que serão enviados ao cérebro.'
        },
        'coroide': {
            title: 'Coroide',
            icon: '🩸',
            color: '#2c1810',
            description: 'A coroide é uma camada vascular rica em vasos sanguíneos, localizada entre a esclera e a retina.',
            function: 'Nutrir a retina externa através de sua rica vascularização e absorver o excesso de luz para evitar reflexos internos.'
        },
        'esclera': {
            title: 'Esclera',
            icon: '️',
            color: '#f4e4c1',
            description: 'A esclera é a camada externa branca, fibrosa e resistente do olho, conhecida como "branco dos olhos".',
            function: 'Proteger as estruturas internas do olho, manter a forma esférica do globo ocular e servir como ponto de inserção para os músculos.'
        },
        'nervo-optico': {
            title: 'Nervo Óptico',
            icon: '🔌',
            color: '#f5deb3',
            description: 'O nervo óptico é um feixe com aproximadamente 1 milhão de fibras nervosas que se origina na retina e conecta ao cérebro.',
            function: 'Transmitir os impulsos nervosos visuais da retina até o cérebro, onde serão processados e interpretados como imagens.'
        },
        'fovea': {
            title: 'Fóvea',
            icon: '🎯',
            color: '#ffd700',
            description: 'A fóvea é uma pequena depressão na região central da retina, com alta concentração de cones (cerca de 200.000 por mm²).',
            function: 'Proporcionar a máxima acuidade visual (visão detalhada e nítida) para ler, reconhecer rostos e ver detalhes finos.'
        },
        'musculos-ciliares': {
            title: 'Músculos Ciliares',
            icon: '💪',
            color: '#8b4513',
            description: 'Os músculos ciliares são fibras musculares lisas que formam o corpo ciliar, localizado atrás da íris.',
            function: 'Controlar a acomodação visual ao contrair-se ou relaxar, mudando a forma do cristalino para focar em diferentes distâncias.'
        }
    };

    // Encontra elementos
    var infoContainer = document.getElementById('infoContainer');
    var cards = document.querySelectorAll('.legend-card');
    
    console.log('📦 infoContainer:', infoContainer);
    console.log('📦 Cards encontrados:', cards.length);
    
    if (!infoContainer) {
        console.error('❌ ERRO: infoContainer não existe!');
        return;
    }
    
    if (cards.length === 0) {
        console.error('❌ ERRO: Nenhum card encontrado!');
        return;
    }
    
    // Função para mostrar informação
    function showInfo(structureKey) {
        console.log('👆 Clicou em:', structureKey);
        
        var data = structuresData[structureKey];
        
        if (!data) {
            console.error('❌ Dados não encontrados para:', structureKey);
            return;
        }
        
        console.log('✅ Dados encontrados:', data.title);
        
        // Remove active de todos
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active');
        }
        
        // Adiciona active no atual
        var activeCard = document.querySelector('[data-structure="' + structureKey + '"]');
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        // Cria HTML
        var html = '<div class="info-content">';
        html += '<div class="info-header">';
        html += '<div class="info-icon" style="background-color: ' + data.color + '20; border: 3px solid ' + data.color + '">';
        html += '<span style="font-size: 2em;">' + data.icon + '</span>';
        html += '</div>';
        html += '<h2 class="info-title">' + data.title + '</h2>';
        html += '</div>';
        
        html += '<div class="info-description">';
        html += '<h4>O que é?</h4>';
        html += '<p>' + data.description + '</p>';
        html += '</div>';
        
        html += '<div class="info-function">';
        html += '<h4>🎯 Função Principal</h4>';
        html += '<p>' + data.function + '</p>';
        html += '</div>';
        
        html += '</div>';
        
        // Atualiza container
        infoContainer.innerHTML = html;
        console.log('✅ Informação atualizada com sucesso!');
    }
    
    // Adiciona clique em cada card
    for (var i = 0; i < cards.length; i++) {
        (function(index) {
            var card = cards[index];
            var structureKey = card.getAttribute('data-structure');
            
            console.log('📌 Card', index, ':', structureKey);
            
            card.addEventListener('click', function() {
                console.log('🖱️ Clique detectado!');
                showInfo(structureKey);
            });
            
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    showInfo(structureKey);
                }
            });
        })(i);
    }
    
    console.log('✅ Sistema inicializado com sucesso!');
});
<script src="script.js"></script>
