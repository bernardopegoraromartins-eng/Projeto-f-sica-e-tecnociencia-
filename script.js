// Banco de dados das estruturas do olho
const structuresData = {
    'cornea': {
        title: 'Córnea',
        description: 'A córnea é a camada transparente frontal do olho, com formato arredondado e curvatura precisa. É composta por cinco camadas de tecido e não possui vasos sanguíneos, recebendo nutrientes diretamente das lágrimas e do humor aquoso.',
        function: 'Refratar (desviar) os raios de luz que entram no olho, sendo responsável por cerca de 2/3 do poder de foco total do olho. Sua transparência e curvatura são essenciais para uma visão nítida.'
    },
    'iris': {
        title: 'Íris',
        description: 'A íris é a parte colorida do olho, formada por tecido muscular e pigmentado. Localiza-se entre a córnea e o cristalino, e sua cor varia de pessoa para pessoa (azul, castanho, verde, etc.) devido à quantidade de melanina presente.',
        function: 'Controlar o tamanho da pupila através de músculos dilatadores e constrictores, regulando a quantidade de luz que entra no olho. Em ambientes claros, contrai-se; em ambientes escuros, dilata-se.'
    },
    'pupila': {
        title: 'Pupila',
        description: 'A pupila é a abertura circular preta no centro da íris. Na verdade, não é uma estrutura física, mas sim um orifício que permite a passagem da luz. Seu tamanho varia automaticamente conforme a luminosidade do ambiente.',
        function: 'Permitir a entrada de luz no olho. Funciona como o diafragma de uma câmera fotográfica, ajustando-se automaticamente para controlar o volume de luz que atinge a retina.'
    },
    'cristalino': {
        title: 'Cristalino',
        description: 'O cristalino é uma lente biconvexa transparente e flexível, localizada atrás da íris. É composto por proteínas cristalinas organizadas de forma precisa e é envolvido por uma cápsula elástica. Com a idade, pode perder elasticidade (presbiopia) ou ficar opaco (catarata).',
        function: 'Focalizar a imagem na retina através do processo de acomodação visual. Muda de forma (fica mais curvo para perto e mais plano para longe) para ajustar o foco conforme a distância do objeto observado.'
    },
    'humor-aquoso': {
        title: 'Humor Aquoso',
        description: 'O humor aquoso é um líquido transparente e aquoso que preenche a câmara anterior do olho (entre a córnea e o cristalino). É produzido continuamente pelo corpo ciliar e drenado pelo canal de Schlemm, mantendo pressão intraocular constante.',
        function: 'Manter a forma da parte frontal do olho, nutrir a córnea e o cristalino (que não têm vasos sanguíneos), e manter a pressão intraocular adequada para o funcionamento correto do olho.'
    },
    'humor-vitreo': {
        title: 'Humor Vítreo',
        description: 'O humor vítreo é um gel transparente e viscoso que preenche cerca de 80% do globo ocular (entre o cristalino e a retina). É composto por 99% de água, com colágeno e ácido hialurônico formando sua estrutura gelatinosa.',
        function: 'Manter a forma esférica do globo ocular, amortecer impactos físicos, e manter a retina pressionada contra a parede posterior do olho. Também permite a passagem da luz até a retina.'
    },
    'retina': {
        title: 'Retina',
        description: 'A retina é a camada interna do olho, sensível à luz, composta por milhões de células fotorreceptoras (cones e bastonetes). Os cones são responsáveis pela visão de cores e detalhes; os bastonetes pela visão em baixa luminosidade e movimento.',
        function: 'Captar a imagem formada pela luz e convertê-la em impulsos elétricos nervosos. Funciona como o "filme" ou "sensor" de uma câmera, transformando estímulos luminosos em sinais que serão interpretados pelo cérebro.'
    },
    'coroide': {
        title: 'Coroide',
        description: 'A coroide é uma camada vascular rica em vasos sanguíneos e pigmentos escuros, localizada entre a esclera e a retina. Sua cor escura vem da melanina, que ajuda a absorver o excesso de luz.',
        function: 'Nutrir a retina externa (especialmente os fotorreceptores) através de sua rica vascularização, e absorver o excesso de luz para evitar reflexos internos que prejudicariam a qualidade da imagem.'
    },
    'esclera': {
        title: 'Esclera',
        description: 'A esclera é a camada externa branca, fibrosa e resistente do olho, popularmente conhecida como "branco dos olhos". É composta por colágeno denso e forma a parte posterior e lateral do globo ocular, continuando-se com a córnea na parte frontal.',
        function: 'Proteger as estruturas internas delicadas do olho, manter a forma esférica do globo ocular, e servir como ponto de inserção para os músculos extraoculares que movimentam o olho.'
    },
    'nervo-optico': {
        title: 'Nervo Óptico',
        description: 'O nervo óptico é um feixe com cerca de 1 milhão de fibras nervosas que se origina na retina e se conecta diretamente ao cérebro. É considerado uma extensão do sistema nervoso central, não um nervo periférico comum.',
        function: 'Transmitir os impulsos nervosos visuais da retina até o cérebro (especificamente até o córtex visual occipital), onde as informações serão processadas e interpretadas como imagens.'
    },
    'fovea': {
        title: 'Fóvea',
        description: 'A fóvea é uma pequena depressão na região central da mácula (parte central da retina), com apenas 1,5 mm de diâmetro. É a região com maior concentração de cones (cerca de 200.000 por mm²) e sem bastonetes.',
        function: 'Proporcionar a máxima acuidade visual (visão detalhada e nítida). É usada quando focamos diretamente em um objeto para ver detalhes finos, como ler, reconhecer rostos ou realizar tarefas que exigem precisão visual.'
    },
    'musculos-ciliares': {
        title: 'Músculos Ciliares',
        description: 'Os músculos ciliares são fibras musculares lisas que formam o corpo ciliar, localizado atrás da íris. Estão conectados ao cristalino através dos zônulas de Zinn (fibras suspensoras).',
        function: 'Controlar a acomodação visual (foco) ao contrair-se ou relaxar. Quando contraídos, relaxam as zônulas e o cristalino fica mais curvo (foco para perto). Quando relaxados, esticam as zônulas e o cristalino fica mais plano (foco para longe).'
    }
};

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    const infoDisplay = document.getElementById('infoDisplay');
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Função para exibir informações
    function showPartInfo(partKey) {
        const data = structuresData[partKey];
        
        if (!data) {
            console.error('Parte não encontrada:', partKey);
            return;
        }
        
        // Remove classe active de todos os itens
        legendItems.forEach(item => item.classList.remove('active'));
        
        // Adiciona classe active no item clicado
        const activeItem = document.querySelector(`[data-part="${partKey}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Cria o conteúdo HTML
        const contentHTML = `
            <div class="info-content">
                <h2>${data.title}</h2>
                <p class="description">${data.description}</p>
                <div class="function-box">
                    <strong>🎯 Função Principal:</strong>
                    <p>${data.function}</p>
                </div>
            </div>
        `;
        
        // Atualiza o display
        infoDisplay.innerHTML = contentHTML;
        
        // Scroll suave até a seção de informações (em mobile)
        if (window.innerWidth <= 768) {
            infoDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
