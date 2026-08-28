window.addEventListener('load', function() {
    console.log(' Script carregado!');
    
    var infoContainer = document.getElementById('infoContainer');
    console.log('📦 Container:', infoContainer);
    
    if (!infoContainer) {
        alert('ERRO: Não encontrei o infoContainer!');
        return;
    }
    
    var cards = document.querySelectorAll('.legend-card');
    console.log('📦 Cards encontrados:', cards.length);
    
    var structuresData = {
        'cornea': {
            title: 'Córnea',
            icon: '👁️',
            color: '#b8d4e3',
            description: 'A córnea é a camada transparente e curva que forma a parte frontal do olho.',
            function: 'Refratar os raios de luz. Responsável por 2/3 do poder de foco do olho.'
        },
        'iris': {
            title: 'Íris',
            icon: '🎨',
            color: '#6b8e23',
            description: 'A íris é a parte colorida do olho, localizada entre a córnea e o cristalino.',
            function: 'Controlar o tamanho da pupila e regular a quantidade de luz que entra.'
        },
        'pupila': {
            title: 'Pupila',
            icon: '',
            color: '#000000',
            description: 'A pupila é a abertura circular preta no centro da íris.',
            function: 'Permitir a entrada de luz no olho e controlar a quantidade que atinge a retina.'
        },
        'cristalino': {
            title: 'Cristalino',
            icon: '🔍',
            color: '#e8f4f8',
            description: 'O cristalino é uma lente transparente e flexível atrás da íris.',
            function: 'Focalizar a imagem na retina, mudando de forma para focar em diferentes distâncias.'
        },
        'humor-aquoso': {
            title: 'Humor Aquoso',
            icon: '💧',
            color: '#e0f0ff',
            description: 'Líquido transparente que preenche a câmara anterior do olho.',
            function: 'Manter a forma frontal do olho e nutrir a córnea e cristalino.'
        },
        'humor-vitreo': {
            title: 'Humor Vítreo',
            icon: '💎',
            color: '#f0f8ff',
            description: 'Gel transparente que preenche 80% do globo ocular.',
            function: 'Manter a forma do olho e amortecer impactos.'
        },
        'retina': {
            title: 'Retina',
            icon: '',
            color: '#8b4513',
            description: 'Camada interna sensível à luz com milhões de células fotorreceptoras.',
            function: 'Captar a imagem e converter em impulsos elétricos para o cérebro.'
        },
        'coroide': {
            title: 'Coroide',
            icon: '🩸',
            color: '#2c1810',
            description: 'Camada vascular entre a esclera e a retina.',
            function: 'Nutrir a retina e absorver o excesso de luz.'
        },
        'esclera': {
            title: 'Esclera',
            icon: '️',
            color: '#f4e4c1',
            description: 'Camada externa branca e resistente do olho.',
            function: 'Proteger as estruturas internas e manter a forma do olho.'
        },
        'nervo-optico': {
            title: 'Nervo Óptico',
            icon: '🔌',
            color: '#f5deb3',
            description: 'Feixe com 1 milhão de fibras nervosas que conecta a retina ao cérebro.',
            function: 'Transmitir os impulsos visuais da retina até o cérebro.'
        },
        'fovea': {
            title: 'Fóvea',
            icon: '🎯',
            color: '#ffd700',
            description: 'Pequena depressão na retina com alta concentração de cones.',
            function: 'Proporcionar visão detalhada e nítida.'
        },
        'musculos-ciliares': {
            title: 'Músculos Ciliares',
            icon: '💪',
            color: '#8b4513',
            description: 'Fibras musculares que formam o corpo ciliar.',
            function: 'Controlar o foco mudando a forma do cristalino.'
        }
    };
    
    function showInfo(key) {
        console.log('Clicou em:', key);
        var data = structuresData[key];
        
        if (!data) {
            console.error('Dados não encontrados para:', key);
            return;
        }
        
        // Remove active de todos
        cards.forEach(function(card) {
            card.classList.remove('active');
        });
        
        // Adiciona active no clicado
        var activeCard = document.querySelector('[data-structure="' + key + '"]');
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        // Cria o HTML
        var html = '<div class="info-content" style="animation: slideIn 0.5s ease;">';
        html += '<div class="info-header" style="display: flex; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #667eea;">';
        html += '<div style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2em; margin-right: 20px; background-color: ' + data.color + '30; border: 3px solid ' + data.color + ';">';
        html += data.icon;
        html += '</div>';
        html += '<h2 style="color: #667eea; font-size: 2.2em; margin: 0;">' + data.title + '</h2>';
        html += '</div>';
        
        html += '<div style="background: #ffffff; padding: 25px; border-radius: 15px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">';
        html += '<h4 style="color: #495057; font-size: 1.3em; margin-bottom: 12px; font-weight: 700;">O que é?</h4>';
        html += '<p style="color: #6c757d; font-size: 1.05em; line-height: 1.9;">' + data.description + '</p>';
        html += '</div>';
        
        html += '<div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); padding: 25px; border-radius: 15px; border-left: 5px solid #764ba2; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">';
        html += '<h4 style="color: #764ba2; font-size: 1.3em; margin-bottom: 12px; font-weight: 700;">🎯 Função Principal</h4>';
        html += '<p style="color: #495057; font-size: 1.05em; line-height: 1.9;">' + data.function + '</p>';
        html += '</div>';
        html += '</div>';
        
        // ATUALIZA O CONTAINER
        infoContainer.innerHTML = html;
        console.log('✅ Informação atualizada!');
    }
    
    // Adiciona eventos
    cards.forEach(function(card) {
        var key = card.getAttribute('data-structure');
        console.log('Card:', key);
        
        card.addEventListener('click', function() {
            console.log('🖱️ Clique!');
            showInfo(key);
        });
    });
    
    console.log('✅ Tudo pronto!');
});
