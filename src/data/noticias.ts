import { Noticia } from '../types/noticia';

/**
 * Estrutura centralizada de dados de notícias do portal Notícias Mundiais.
 * Utiliza imagens estáticas locais vetorizadas em SVG, extremamente leves (2-5 KB)
 * que carregam instantaneamente sem falhas de rede externa e com consumo mínimo de dados.
 */
export const noticiasIniciais: Noticia[] = [
  {
    id: 'noticia-destaque-1',
    destaque: true,
    titulo: 'Moçambique prepara novas iniciativas para impulsionar a transformação digital',
    categoria: 'Moçambique',
    data: '28 Setembro 2026',
    hora: '14:15',
    imagem: '/images/digital-mozambique.svg',
    imagemAlt: 'Inovação e infraestrutura de fibra óptica e rede digital em Moçambique',
    resumo: 'O Governo e parceiros do sector privado anunciaram um pacote estratégico para expandir a conectividade de banda larga para zonas rurais, incentivar startups locais e modernizar os serviços públicos electrónicos em todo o território moçambicano.',
    conteudoCompleto: [
      'O Governo de Moçambique, em estreita cooperação com parceiros multilaterais e empresas do sector privado de telecomunicações, oficializou esta semana um plano abrangente destinado a acelerar a inclusão e a maturidade digital no país até ao final da década.',
      'A estratégia prioriza a expansão das redes de fibra óptica e torres de comunicação para distritos do interior nas províncias de Nampula, Zambézia e Niassa, reduzindo as assimetrias regionais de conectividade.',
      'Paralelamente, foi anunciado um fundo de aceleração para jovens programadores e empreendedores locais, com foco em soluções agrotech, pagamentos móveis e telemedicina adaptadas às realidades comunitárias.',
      'Especialistas do sector destacam que a aposta na interoperabilidade de serviços governamentais electrónicos deverá reduzir custos operacionais, acelerar a abertura de empresas e aumentar a transparência fiscal.'
    ],
    autor: 'Redacção Maputo',
    tempoLeitura: '3 min',
    tags: ['Moçambique', 'Transformação Digital', 'Inovação', 'Economia']
  },
  {
    id: 'noticia-eco-1',
    destaque: false,
    titulo: 'Novo movimento no mercado financeiro chama atenção dos investidores',
    categoria: 'Economia',
    data: '28 Setembro 2026',
    hora: '12:30',
    imagem: '/images/economia.svg',
    imagemAlt: 'Gráfico em ascensão do mercado financeiro e bolsas internacionais',
    resumo: 'Ajustes nas taxas de juro de referência e o comportamento das matérias-primas energéticas geram novas ondas de realocação de capital em mercados emergentes africanos.',
    conteudoCompleto: [
      'As bolsas internacionais e os mercados de dívida soberana registaram movimentações expressivas nesta sessão após a divulgação dos dados de inflação acumulada e novas previsões para o preço do barril de petróleo e gás natural.',
      'Analistas indicam que fundos institucionais estão a aumentar a exposição a títulos de curto prazo e investimentos em infraestruturas sustentáveis, buscando protecção contra oscilações cambiais.'
    ],
    autor: 'Secção de Mercados',
    tempoLeitura: '2 min',
    tags: ['Finanças', 'Investimentos', 'Bolsas']
  },
  {
    id: 'noticia-mundo-1',
    destaque: false,
    titulo: 'Cimeira global do clima debate metas rigorosas para transição energética',
    categoria: 'Mundo',
    data: '28 Setembro 2026',
    hora: '11:05',
    imagem: '/images/clima.svg',
    imagemAlt: 'Parque de turbinas eólicas e painéis solares para geração de energia limpa',
    resumo: 'Representantes de mais de 90 países reúnem-se para debater financiamento verde e transferência de tecnologias limpas para nações em desenvolvimento.',
    conteudoCompleto: [
      'A abertura dos trabalhos contou com apelos urgentes de chefes de Estado de nações insulares e costeiras para o cumprimento efectivo dos fundos de perdas e danos climáticos.',
      'O documento preliminar estabelece prazos para a descarbonização industrial e incentivos para a expansão de baterias de longa duração e hidrogénio verde.'
    ],
    autor: 'Agência Internacional',
    tempoLeitura: '3 min',
    tags: ['Clima', 'Energia Limpa', 'Cúpula']
  },
  {
    id: 'noticia-tec-1',
    destaque: false,
    titulo: 'Novos avanços em microchips reduzem o consumo de energia em centros de dados em 40%',
    categoria: 'Tecnologia',
    data: '28 Setembro 2026',
    hora: '09:45',
    imagem: '/images/tecnologia-chips.svg',
    imagemAlt: 'Microchip processador de silício ultra-eficiente de 1.8nm',
    resumo: 'Arquitectura de transístores de 1.8nm desenvolvida por consórcio tecnológico promete alívio considerável sobre a demanda eléctrica de servidores modernos.',
    conteudoCompleto: [
      'A indústria de semicondutores anunciou hoje a entrada em produção piloto da nova litografia que promete alta performance computacional mantendo a dissipação térmica em níveis mínimos.',
      'A mudança é crucial para telecomunicações, inteligência de ponta e infraestruturas em nuvem operadas em regiões com restrições na rede eléctrica.'
    ],
    autor: 'Canal Tech',
    tempoLeitura: '2 min',
    tags: ['Hardware', 'Chips', 'Sustentabilidade']
  },
  {
    id: 'noticia-desporto-1',
    destaque: false,
    titulo: 'Selecção nacional intensifica preparação táctica para a fase decisiva de apuramento',
    categoria: 'Desporto',
    data: '28 Setembro 2026',
    hora: '08:20',
    imagem: '/images/desporto.svg',
    imagemAlt: 'Relvado de futebol e preparação desportiva da selecção',
    resumo: 'A equipa técnica realizou o primeiro treino com o grupo completo, focando na solidez defensiva e na transição rápida para os próximos confrontos.',
    conteudoCompleto: [
      'O estágio em Maputo decorre com intensidade máxima. O seleccionador elogiou o comprometimento físico dos atletas e a rápida integração dos jovens que actuam nos campeonatos locais.',
      'Os bilhetes para o jogo de sábado já estão disponíveis através dos canais digitais oficiais e nos postos móveis autorizados.'
    ],
    autor: 'Desporto 360',
    tempoLeitura: '2 min',
    tags: ['Futebol', 'Selecção', 'Apuramento']
  },
  {
    id: 'noticia-moz-2',
    destaque: false,
    titulo: 'Porto de Maputo atinge novo marco de eficiência na movimentação de mercadorias',
    categoria: 'Moçambique',
    data: '27 Setembro 2026',
    hora: '17:40',
    imagem: '/images/porto-maputo.svg',
    imagemAlt: 'Navio porta-contentores e guindastes no Porto de Maputo',
    resumo: 'Modernização de cais e digitalização dos despachos aduaneiros reduziram o tempo médio de atracação de navios cargueiros em 28%.',
    conteudoCompleto: [
      'A Sociedade de Desenvolvimento do Porto de Maputo divulgou os resultados do terceiro trimestre, confirmando um aumento consistente na movimentação de carga geral e granéis minerais.',
      'O corredor logístico reafirma a sua posição como um dos nós de trânsito comercial mais competitivos para as economias do hinterland da África Austral.'
    ],
    autor: 'Redacção Notícias Mundiais',
    tempoLeitura: '3 min',
    tags: ['Economia', 'Logística', 'Porto de Maputo']
  },
  {
    id: 'noticia-eco-2',
    destaque: false,
    titulo: 'Produção agrícola familiar regista aumento com apoio de sistemas de irrigação a energia solar',
    categoria: 'Economia',
    data: '27 Setembro 2026',
    hora: '15:10',
    imagem: '/images/agricultura-solar.svg',
    imagemAlt: 'Cultivo agrícola irrigado com apoio de energia solar sustentável',
    resumo: 'Pequenos produtores das províncias de Manica e Sofala aumentam rendimento de colheitas através de microcrédito e bombas de água solares.',
    conteudoCompleto: [
      'A introdução de bombas de água movidas a energia fotovoltaica eliminou a dependência de combustíveis fósseis para mais de 3.000 famílias rurais.',
      'A produção de hortícolas em época de seca garantiu estabilidade de preços nos mercados municipais e reforçou a segurança alimentar local.'
    ],
    autor: 'Agricultura & Sociedade',
    tempoLeitura: '2 min',
    tags: ['Agricultura', 'Energia Solar', 'Sustentabilidade']
  },
  {
    id: 'noticia-tec-2',
    destaque: false,
    titulo: 'Sistemas de pagamentos móveis batem recorde de transacções instantâneas na região',
    categoria: 'Tecnologia',
    data: '27 Setembro 2026',
    hora: '10:30',
    imagem: '/images/mobile-money.svg',
    imagemAlt: 'Transação instantânea de mobile money via telemóvel',
    resumo: 'A interoperabilidade entre carteiras móveis e contas bancárias tradicionais permitiu um crescimento de 35% no volume diário de transferências.',
    conteudoCompleto: [
      'A facilidade de envio e recebimento de valores sem necessidade de agências bancárias físicas continua a ser o maior catalisador de inclusão financeira em Moçambique e nos países vizinhos.',
      'Comissões mais baixas e validação biométrica em terminais móveis aumentaram a confiança e a segurança do utilizador comum.'
    ],
    autor: 'Inovação Financeira',
    tempoLeitura: '2 min',
    tags: ['Fintech', 'Mobile Money', 'Inclusão']
  }
];

export async function obterNoticias(): Promise<Noticia[]> {
  return Promise.resolve(noticiasIniciais);
}
