/**
 * ============================================
 * SISTEMA DE INFORMAÇÕES DO OLHO HUMANO
 * ============================================
 * Este script gerencia a exibição de informações
 * detalhadas sobre cada estrutura do olho quando
 * o usuário clica nos cards da legenda.
 * ============================================
 */

// Banco de dados completo das estruturas do olho
const structuresDatabase = {
    'cornea': {
        title: 'Córnea',
        icon: '👁️',
        color: '#b8d4e3',
        description: {
            title: 'O que é a Córnea?',
            text: 'A córnea é a camada transparente e curva que forma a parte frontal do olho. É composta por cinco camadas distintas de tecido e não possui vasos sanguíneos, recebendo nutrientes diretamente das lágrimas e do humor aquoso. Sua transparência é essencial para a visão, e sua curvatura precisa é responsável por grande parte do poder de refração do olho.'
        },
        function: {
            title: 'Função Principal',
            text: 'Refratar (desviar) os raios de luz que entram no olho. A córnea é responsável por aproximadamente 2/3 (cerca de 65-75%) do poder total de foco do olho. Sua curvatura e transparência permitem que a luz seja corretamente direcionada para o cristalino e, posteriormente, para a retina. Qualquer irregularidade na córnea (como astigmatismo) pode causar distorções na visão.'
        }
    },
    
    'iris': {
        title: 'Íris',
        icon: '🎨',
        color: '#6b8e23',
        description: {
            title: 'O que é a Íris?',
            text: 'A íris é a estrutura circular e colorida do olho, localizada entre a córnea e o cristalino. É composta por tecido muscular e pigmentado, contendo dois músculos principais: o esfíncter da pupila (que contrai) e o dilatador da pupila (que expande). A cor da íris varia de pessoa para pessoa (azul, castanho, verde, âmbar, etc.) devido à quantidade e distribuição de melanina presente em suas células.'
        },
        function: {
            title: 'Função Principal',
            text: 'Controlar o tamanho da pupila e regular a quantidade de luz que entra no olho. Funciona como o diafragma de uma câmera fotográfica: em ambientes muito iluminados, a íris se contrai (miose), diminuindo a pupila para proteger a retina; em ambientes escuros, ela se dilata (midríase), aumentando a pupila para permitir maior entrada de luz. Esse processo é automático e controlado pelo sistema nervoso autônomo.'
        }
    },
    
    'pupila': {
        title: 'Pupila',
        icon: '',
        color: '#000000',
        description: {
            title: 'O que é a Pupila?',
            text: 'A pupila é a abertura circular preta no centro da íris. Tecnicamente, não é uma estrutura física, mas sim um orifício que permite a passagem da luz para o interior do olho. Sua cor preta se deve ao fato de que a maior parte da luz que entra é absorvida pelos tecidos internos do olho. O tamanho da pupila varia automaticamente conforme a luminosidade do ambiente, controle exercido pelos músculos da íris.'
        },
        function: {
            title: 'Função Principal',
            text: 'Permitir a entrada de luz no olho e controlar a quantidade de radiação luminosa que atinge a retina. Funciona de forma semelhante à abertura de uma câmera fotográfica: quando está dilatada (em ambientes escuros), permite maior entrada de luz; quando está contraída (em ambientes claros), reduz a entrada de luz para proteger as estruturas sensíveis do olho. Também ajuda a melhorar a profundidade de campo da visão.'
        }
    },
    
    'cristalino': {
        title: 'Cristalino',
        icon: '🔍',
        color: '#e8f4f8',
        description: {
            title: 'O que é o Cristalino?',
            text: 'O cristalino é uma lente biconvexa (curvada em ambos os lados), transparente e flexível, localizada imediatamente atrás da íris e da pupila. É composto por proteínas cristalinas organizadas de forma precisa e envolvido por uma cápsula elástica. É mantido em posição pelos músculos ciliares através de fibras suspensoras chamadas zônulas de Zinn. Com o avançar da idade, o cristalino pode perder elasticidade (causando presbiopia) ou ficar opaco (desenvolvendo catarata).'
        },
        function: {
            title: 'Função Principal',
            text: 'Focalizar a imagem na retina através do processo de acomodação visual. O cristalino muda de forma dinamicamente: quando contraímos os músculos ciliares para ver objetos próximos, o cristalino fica mais curvo e espesso (aumentando seu poder de refração); quando relaxamos esses músculos para ver objetos distantes, ele fica mais plano e fino. Esse mecanismo permite que enxerguemos nitidamente em diferentes distâncias.'
        }
    },
    
    'humor-aquoso': {
        title: 'Humor Aquoso',
        icon: '',
        color: '#e0f0ff',
        description: {
            title: 'O que é o Humor Aquoso?',
            text: 'O humor aquoso é um líquido transparente e aquoso que preenche a câmara anterior do olho (o espaço entre a córnea e o cristalino). É produzido continuamente pelo corpo ciliar (a uma taxa de aproximadamente 2-3 µl por minuto) e drenado pelo canal de Schlemm, mantendo um equilíbrio dinâmico. Sua composição é semelhante à do plasma sanguíneo, mas com maior concentração de ácido ascórbico (vitamina C) para proteger o olho contra danos oxidativos.'
        },
        function: {
            title: 'Função Principal',
            text: 'Manter a forma da parte frontal do olho, nutrir a córnea e o cristalino (que não possuem vasos sanguíneos próprios), remover resíduos metabólicos dessas estruturas e manter a pressão intraocular adequada (normalmente entre 10-21 mmHg). A pressão adequada é essencial para manter a forma esférica do olho e o funcionamento correto de todas as estruturas oculares.'
        }
    },
    
    'humor-vitreo': {
        title: 'Humor Vítreo',
        icon: '',
        color: '#f0f8ff',
        description: {
            title: 'O que é o Humor Vítreo?',
            text: 'O humor vítreo é um gel transparente, viscoso e avascular que preenche aproximadamente 80% do volume do globo ocular (cerca de 4 ml), ocupando o espaço entre o cristalino e a retina. É composto por 99% de água, com o 1% restante consistindo em colágeno tipo II, ácido hialurônico e outras moléculas que formam sua estrutura gelatinosa. Diferente do humor aquoso, o vítreo não é renovado continuamente e permanece praticamente o mesmo desde o nascimento.'
        },
        function: {
            title: 'Função Principal',
            text: 'Manter a forma esférica do globo ocular, amortecer impactos físicos contra o olho, e manter a retina pressionada firmemente contra a parede posterior do olho (essencial para o descolamento de retina não ocorrer). Também permite a passagem da luz até a retina sem dispersão e serve como reserva metabólica. Com a idade, pode sofrer liquefação, causando as "moscas volantes" (floaters).'
        }
    },
    
    'retina': {
        title: 'Retina',
        icon: '',
        color: '#8b4513',
        description: {
            title: 'O que é a Retina?',
            text: 'A retina é a camada interna do olho, sensível à luz, composta por milhões de células fotorreceptoras especializadas e neurônios. Contém aproximadamente 120 milhões de bastonetes (responsáveis pela visão em baixa luminosidade e detecção de movimento) e 6-7 milhões de cones (responsáveis pela visão de cores e detalhes finos). A retina é, na verdade, uma extensão do sistema nervoso central e faz parte do cérebro embrionário.'
        },
        function: {
            title: 'Função Principal',
            text: 'Captar a imagem formada pela luz que entra no olho e convertê-la em impulsos elétricos nervosos. Funciona como o sensor ou filme de uma câmera fotográfica: os fotorreceptores (cones e bastonetes) absorvem os fótons de luz e iniciam uma cascata de reações químicas que geram sinais elétricos. Esses sinais são processados por outras células da retina e transmitidos ao cérebro através do nervo óptico, onde serão interpretados como imagens visuais.'
        }
    },
    
    'coroide': {
        title: 'Coroide',
        icon: '',
        color: '#2c1810',
        description: {
            title: 'O que é a Coroide?',
            text: 'A coroide é uma camada vascular rica em vasos sanguíneos e pigmentos escuros (melanina), localizada entre a esclera (camada externa) e a retina (camada interna). É uma das estruturas mais vascularizadas do corpo humano, com fluxo sanguíneo extremamente alto. Sua cor escura vem da alta concentração de melanina, que ajuda a absorver o excesso de luz e evitar reflexos internos no olho.'
        },
        function: {
            title: 'Função Principal',
            text: 'Nutrir a retina externa (especialmente os fotorreceptores - cones e bastonetes) através de sua rica vascularização, fornecendo oxigênio e nutrientes essenciais. Também absorve o excesso de luz que passa pela retina, evitando reflexos internos que prejudicariam a qualidade da imagem (funciona como o interior preto de uma câmera fotográfica). Além disso, ajuda a regular a temperatura do olho.'
        }
    },
    
    'esclera': {
        title: 'Esclera',
        icon: '🛡️',
        color: '#f4e4c1',
        description: {
            title: 'O que é a Esclera?',
            text: 'A esclera é a camada externa branca, fibrosa, resistente e opaca do olho, popularmente conhecida como "branco dos olhos". É composta por colágeno denso e fibras elásticas organizadas de forma irregular, o que lhe confere grande resistência mecânica. Forma aproximadamente 5/6 da parte posterior e lateral do globo ocular, continuando-se com a córnea transparente na parte frontal. Tem espessura variável, sendo mais espessa na parte posterior (cerca de 1 mm) e mais fina na região equatorial.'
        },
        function: {
            title: 'Função Principal',
            text: 'Proteger as estruturas internas delicadas do olho contra lesões físicas e traumas, manter a forma esférica do globo ocular (essencial para o foco correto da luz), e servir como ponto de inserção para os seis músculos extraoculares que movimentam o olho em todas as direções. Também protege contra a entrada de microrganismos e ajuda a manter a pressão intraocular adequada.'
        }
    },
    
    'nervo-optico': {
        title: 'Nervo Óptico',
        icon: '🔌',
        color: '#f5deb3',
        description: {
            title: 'O que é o Nervo Óptico?',
            text: 'O nervo óptico é um feixe com aproximadamente 1 a 1,2 milhão de fibras nervosas (axônios) que se origina na retina e se conecta diretamente ao cérebro. Tem cerca de 5 cm de comprimento e é considerado uma extensão do sistema nervoso central (não um nervo periférico comum), sendo envolvido pelas mesmas membranas que protegem o cérebro (meninges). É o segundo par de nervos cranianos e é essencial para a visão.'
        },
        function: {
            title: 'Função Principal',
            text: 'Transmitir os impulsos nervosos visuais da retina até o cérebro, especificamente até o córtex visual occipital (localizado na parte posterior do cérebro), onde as informações serão processadas, interpretadas e transformadas em imagens conscientes. O nervo óptico carrega informações sobre forma, cor, movimento, brilho e contraste. Danos ao nervo óptico podem causar perda visual irreversível, pois as fibras nervosas não se regeneram.'
        }
    },
    
    'fovea': {
        title: 'Fóvea',
        icon: '🎯',
        color: '#ffd700',
        description: {
            title: 'O que é a Fóvea?',
            text: 'A fóvea (ou fóvea centralis) é uma pequena depressão na região central da mácula (parte central da retina), com apenas 1,5 mm de diâmetro. É a região com maior concentração de cones (cerca de 200.000 cones por mm²) e praticamente não possui bastonetes. Na fóvea, as outras camadas da retina são deslocadas lateralmente, permitindo que a luz incida diretamente sobre os fotorreceptores, maximizando a acuidade visual.'
        },
        function: {
            title: 'Função Principal',
            text: 'Proporcionar a máxima acuidade visual (visão detalhada, nítida e de alta resolução). É usada quando focamos diretamente em um objeto para ver detalhes finos, como ler texto pequeno, reconhecer rostos, costurar, realizar trabalhos manuais precisos ou observar detalhes em imagens. Representa menos de 1% da área total da retina, mas é responsável pela maior parte da nossa percepção visual detalhada.'
        }
    },
    
    'musculos-ciliares': {
        title: 'Músculos Ciliares',
        icon: '💪',
        color: '#8b4513',
        description: {
            title: 'O que são os Músculos Ciliares?',
            text: 'Os músculos ciliares são fibras musculares lisas (involuntárias) que formam o corpo ciliar, uma estrutura em forma de anel localizada atrás da íris. Estão conectados ao cristalino através das zônulas de Zinn (fibras suspensoras elásticas). Quando contraídos ou relaxados, alteram a tensão dessas fibras, modificando assim a forma do cristalino. São controlados pelo sistema nervoso parassimpático.'
        },
        function: {
            title: 'Função Principal',
            text: 'Controlar a acomodação visual (processo de foco) ao contrair-se ou relaxar. Quando contraídos (para ver objetos próximos), relaxam as zônulas de Zinn, permitindo que o cristalino fique mais curvo e espesso (aumentando seu poder de refração). Quando relaxados (para ver objetos distantes), esticam as zônulas, achatando o cristalino. Esse mecanismo permite que enxerguemos nitidamente em diferentes distâncias, ajustando o foco automaticamente.'
        }
    }
};

/**
 * ============================================
 * INICIALIZAÇÃO DO SISTEMA
 * ============================================
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Sistema de informações do olho humano inicializado');
    
    // Seleciona elementos do DOM
    const infoContainer = document.getElementById('infoContainer');
    const legendCards = document.querySelectorAll('.legend-card');
    
    // Verifica se os elementos existem
    if (!infoContainer) {
        console.error('❌ Erro: Elemento #infoContainer não encontrado no HTML');
        return;
    }
    
    if (legendCards.length === 0) {
        console.error('❌ Erro: Nenhum card de legenda encontrado no HTML');
        return;
    }
    
    console.log(`✅ Encontrados ${legendCards.length} cards interativos`);
    
    /**
     * Função para exibir informações de uma estrutura
     * @param {string} structureKey - Chave da estrutura no banco de dados
     */
    function displayStructureInfo(structureKey) {
        console.log(`📌 Exibindo informações: ${structureKey}`);
        
        const structureData = structuresDatabase[structureKey];
        
        if (!structureData) {
            console.error(` Estrutura não encontrada: ${structureKey}`);
            return;
        }
        
        // Remove classe 'active' de todos os cards
        legendCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Adiciona classe 'active' no card clicado
        const activeCard = document.querySelector(`[data-structure="${structureKey}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        // Cria o HTML completo das informações
        const infoHTML = `
            <div class="info-content">
                <div class="info-header">
                    <div class="info-icon" style="background-color: ${structureData.color}20; border: 3px solid ${structureData.color}">
                        ${structureData.icon}
                    </div>
                    <h2 class="info-title">${structureData.title}</h2>
                </div>
                
                <div class="info-description">
                    <h4>${structureData.description.title}</h4>
                    <p>${structureData.description.text}</p>
                </div>
                
                <div class="info-function">
                    <h4>${structureData.function.title}</h4>
                    <p>${structureData.function.text}</p>
                </div>
            </div>
        `;
        
        // Atualiza o container com animação
        infoContainer.innerHTML = infoHTML;
        
        // Scroll suave até a seção de informações (em dispositivos móveis)
        if (window.innerWidth <= 768) {
            const infoSection = document.getElementById('infoSection');
            if (infoSection) {
                setTimeout(() => {
                    infoSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 300);
            }
        }
    }
    
    /**
     * Adiciona eventos de clique em cada card
     */
    legendCards.forEach(card => {
        // Evento de clique com mouse
        card.addEventListener('click', function() {
            const structureKey = this.getAttribute('data-structure');
            displayStructureInfo(structureKey);
        });
        
        // Evento de tecla Enter (acessibilidade)
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const structureKey = this.getAttribute('data-structure');
                displayStructureInfo(structureKey);
            }
        });
    });
    
    /**
     * Efeito de destaque inicial (opcional)
     */
    setTimeout(() => {
        if (infoContainer.querySelector('.info-placeholder')) {
            infoContainer.style.animation = 'pulse 2s ease-in-out';
        }
    }, 2000);
    
    console.log('✅ Sistema pronto! Clique nos cards para ver informações.');
});

/**
 * ============================================
 * ANIMAÇÕES ADICIONAIS
 * ============================================
 */

// Adiciona animação de pulse dinamicamente
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
            transform: scale(1);
        }
        50% {
            box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(animationStyle);

console.log(' Animações carregadas com sucesso');            infoDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Adiciona evento de clique em cada item da legenda
    legendItems.forEach(item => {
        item.addEventListener('click', function() {
            const partKey = this.getAttribute('data-part');
            showPartInfo(partKey);
        });
    });
});
