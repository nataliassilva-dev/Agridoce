export interface TortaFlavor {
  id: string;
  name: string;
  description: string;
  highlight?: string;
  image?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: 'barquetes' | 'folhados' | 'empadas' | 'tropical';
  description?: string;
  image?: string;
}

export interface AntepastoItem {
  id: string;
  name: string;
  price500g: number;
  price1kg: number;
  description: string;
  image?: string;
}

export interface TacaGourmetItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  ingredients: string[];
  description: string;
  image?: string;
}

export const CATALOG_IMAGES = {
  cover: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_19.08.06_54432116.jpeg',
  logoSeal: '/assets/aistudio/WhatsApp_Image1_2026-10-19_at_19.08.06_96f0e25a.jpeg',
  logoScript: '/assets/aistudio/WhatsApp_Image2_2026-10-19_at_19.08.06_f70cb6c1.jpeg',
  quicheCherry: '/assets/aistudio/WhatsApp_Image8_2026-10-19_at_20.07.00_1fbca627.jpeg',
  quicheBalcony: '/assets/aistudio/WhatsApp_Image11_2026-10-19_at_20.08.42_97467a2e.jpeg',
  quicheStand: '/assets/aistudio/WhatsApp_Image10_2026-10-19_at_20.07.02_f605d745.jpeg',
  miniQuicheBoxBiquinho: '/assets/aistudio/WhatsApp_Image11_2026-10-19_at_20.07.02_bbbb0612.jpeg',
  miniQuicheHand: '/assets/aistudio/WhatsApp_Image5_2026-10-19_at_20.07.00_4b1eb621.jpeg',
  miniQuicheFullTray: '/assets/aistudio/WhatsApp_Image4_2026-10-19_at_20.06.59_ad7b2b18.jpeg',
  miniQuicheBookDisplay: '/assets/aistudio/WhatsApp_Image14_2026-10-19_at_20.09.53_6cd8c26d.jpeg',
  folhadosBox: '/assets/aistudio/WhatsApp_Image7_2026-10-19_at_20.07.00_8115e787.jpeg',
  folhadosGorgonzola: '/assets/aistudio/WhatsApp_Image6_2026-10-19_at_20.07.00_43f14392.jpeg',
  barquetesTower: '/assets/aistudio/WhatsApp_Image9_2026-10-19_at_20.07.01_f6a5ed29.jpeg',
  antepastoCarneMaluca: '/assets/aistudio/WhatsApp_Image13_2026-10-19_at_20.09.52_17638946.jpeg',
  tacaGourmet: '/assets/aistudio/WhatsApp_Image12_2026-10-19_at_20.08.43_009d3a08.jpeg',
};

export const DEADLINES = {
  natal: 'Até 10 de dezembro',
  reveillon: 'Até 15 de dezembro',
  warning: 'As encomendas estão sujeitas à disponibilidade da agenda de produção.',
};

export const HOW_IT_WORKS = {
  confirmation: {
    title: 'Confirmação do Pedido',
    text: 'Para confirmar sua encomenda, solicitamos o pagamento de no mínimo 50% do valor total como sinal. O valor restante deverá ser pago no momento da entrega ou retirada.',
  },
  delivery: {
    title: 'Retirada ou Entrega',
    text: 'Você pode optar por retirar seu pedido no nosso endereço ou receber por delivery, mediante consulta de disponibilidade e taxa de entrega.',
  },
  changes: {
    title: 'Alterações e Cancelamentos',
    text: 'Solicitações de alteração deverão ser feitas com antecedência e estarão sujeitas à viabilidade de produção.\n\nEm caso de cancelamento, entre em contato conosco o quanto antes. As condições de reembolso serão avaliadas conforme o estágio de produção, os custos já assumidos e a legislação aplicável.',
  },
  closingMessage: 'Será um prazer fazer parte das suas celebrações!',
};

export const TORTA_SIZES = [
  { id: '14cm', name: 'Pequena (14cm)', slices: '04 fatias', price: 55.00, bestFor: 'Aperitivo ou mesa intimista' },
  { id: '25cm', name: 'Média (25cm)', slices: '12 fatias', price: 120.00, bestFor: 'Ceias médias de família' },
  { id: '30cm', name: 'Grande (30cm)', slices: '16 fatias', price: 150.00, bestFor: 'A grande ceia e celebrações' },
];

export const TORTA_FLAVORS: TortaFlavor[] = [
  {
    id: 'torta-frango-catupiry',
    name: 'Frango com Catupiry',
    description: 'Frango desfiado com tempero aromático de ervas finas, envolvido em Catupiry cremoso legítimo e massa pâte brisée amanteigada.',
    highlight: 'Clássico Imbatível',
  },
  {
    id: 'torta-peru-abacaxi',
    name: 'Peito de Peru com Abacaxi',
    description: 'Tradição natalina perfeita: peito de peru nobre defumado, abacaxi caramelizado e toque suave de especiarias festivas.',
    highlight: 'Especial de Natal',
  },
  {
    id: 'torta-lombinho-frutas-vermelhas',
    name: 'Lombinho com Geleia de Frutas Vermelhas e Cream Cheese',
    description: 'Lombo suíno suculento com o contraste aveludado do cream cheese e o brilho agridoce da nossa geleia artesanal.',
    highlight: 'Assinatura Agridoce',
  },
  {
    id: 'torta-04-queijos',
    name: '04 Queijos com Cebola no Azeite',
    description: 'Harmonização de queijos nobres fundidos, realçados pela doçura da cebola finamente confitada no azeite de oliva extravirgem.',
  },
  {
    id: 'torta-queijo-reino-damasco',
    name: 'Queijo Reino com Geleia de Damasco',
    description: 'A nobreza e intensidade do queijo do reino curado com a delicadeza frutada e suave acidez do damasco turco.',
    highlight: 'Favorito Gourmet',
  },
  {
    id: 'torta-carne-sol-coalho',
    name: 'Carne de Sol com Queijo Coalho',
    description: 'O sabor da terra: carne de sol artesanalmente desfiada e puxada na manteiga de garrafa com cubinhos de queijo coalho dourado.',
  },
  {
    id: 'torta-carne-seca-banana',
    name: 'Carne Seca com Banana',
    description: 'Combinação clássica afetiva de carne seca desfiada e temperada com banana da terra macia em ponto de ouro.',
  },
  {
    id: 'torta-carne-seca-abobora',
    name: 'Carne Seca com Creme de Abóbora',
    description: 'Massa crocante com recheio cremoso e aveludado de abóbora cabotiá assada e carne seca bem dessalgada.',
  },
  {
    id: 'torta-costelinha-barbecue',
    name: 'Costelinha Suína com Barbecue e Cebola Caramelizada',
    description: 'Costelinha assada lentamente até desmanchar, regada com molho barbecue artesanal e cebola dourada na manteiga.',
    highlight: 'Suculenta & Marcante',
  },
  {
    id: 'torta-cupim-creamcheese',
    name: 'Cupim com Cream Cheese e Cebola Caramelizada',
    description: 'Corte nobre de cupim assado por horas em fogo brando, finalizado com cream cheese fresco e toque agridoce.',
  },
  {
    id: 'torta-costela-bovina',
    name: 'Costela Bovina com Cream Cheese',
    description: 'Costela de corte premium desfiada em textura ultra macia e envolvida em cream cheese aveludado de primeira linha.',
  },
  {
    id: 'torta-bacalhau',
    name: 'Bacalhau',
    description: 'Lascas de bacalhau nobre com azeite extravirgem, cebola roxa, azeitonas pretas e toque de salsinha fresca.',
    highlight: 'Tradição Festiva',
  },
  {
    id: 'torta-camarao',
    name: 'Camarão',
    description: 'Camarões selecionados salteados com alho dourado, tomates frescos, alho-poró e ervas da nossa horta.',
    highlight: 'Sofisticação',
  },
  {
    id: 'torta-camarao-gorgonzola',
    name: 'Camarão com Gorgonzola',
    description: 'Camarões graúdos envolvidos em creme aveludado com as notas marcantes e elegantes do queijo gorgonzola.',
  },
  {
    id: 'torta-salmao-maracuja',
    name: 'Salmão com Redução de Maracujá',
    description: 'Salmão fresco grelhado em lascas macias, contrastado pela harmonia agridoce de redução artesanal de maracujá.',
    highlight: 'Autêntico Agridoce',
  },
];

export const SALGADOS_FOLHADOS: ProductItem[] = [
  {
    id: 'folhado-guanabara-peru',
    name: 'Guanabara de peito de peru com cream cheese',
    price: 3.30,
    category: 'folhados',
    description: 'Massa folhada francesa super leve com peito de peru defumado e cream cheese.',
  },
  {
    id: 'folhado-guanabara-4queijos',
    name: 'Guanabara de 04 queijos',
    price: 3.30,
    category: 'folhados',
    description: 'Massa folhada dourada e crocante recheada com mix nobre de quatro queijos.',
  },
  {
    id: 'folhado-camarao',
    name: 'Folhado de camarão',
    price: 3.50,
    category: 'folhados',
    description: 'Camarão refogado no azeite com temperos aromáticos envolto em lâminas folhadas.',
  },
  {
    id: 'folhado-gorgonzola-pimenta',
    name: 'Folhado de gorgonzola com geleia de pimenta',
    price: 3.30,
    category: 'folhados',
    description: 'Intensidade do gorgonzola equilibrada com geleia de pimenta agridoce e alecrim.',
  },
  {
    id: 'folhado-frango',
    name: 'Folhado de frango',
    price: 3.00,
    category: 'folhados',
    description: 'Frango suculento desfiado com temperos caseiros e massa folhada artesanal.',
  },
];

export const BARQUETES: ProductItem[] = [
  {
    id: 'barquete-pate-frango',
    name: 'Patê de frango',
    price: 2.50,
    category: 'barquetes',
    description: 'Barquete crocante com patê suave de frango temperado e decoração delicada.',
  },
  {
    id: 'barquete-camarao-catupiry',
    name: 'Camarão com catupiry',
    price: 2.90,
    category: 'barquetes',
    description: 'Camarão salteado finalizado com Catupiry e gratinado suave.',
  },
  {
    id: 'barquete-ricota-tomate-seco',
    name: 'Ricota com tomate seco',
    price: 2.50,
    category: 'barquetes',
    description: 'Creme de ricota fresca com tomates secos artesanais e orégano.',
  },
  {
    id: 'barquete-lombinho-frutas-vermelhas',
    name: 'Lombinho com cream cheese e geleia de frutas vermelhas',
    price: 2.50,
    category: 'barquetes',
    description: 'A união sofisticada de lombinho defumado, cream cheese cremoso e geleia.',
  },
  {
    id: 'barquete-salmao-ricota-maracuja',
    name: 'Salmão com creme de ricota e redução de maracujá',
    price: 2.90,
    category: 'barquetes',
    description: 'Salmão premium com ricota aerada e redução doce e cítrica de maracujá.',
  },
];

export const EMPADAS_MINIQUICHES: {
  price: number;
  unitText: string;
  salgadas: string[];
  doces: string[];
  especialTropical: { name: string; price: number; description: string };
} = {
  price: 2.30,
  unitText: 'R$ 2,30 a unidade',
  salgadas: [
    'Frango',
    'Peito de peru com abacaxi',
    'Bacalhau',
    'Camarão',
    'Costelinha com barbecue e cebola caramelizada',
    'Costela bovina com cream cheese',
    'Carne seca com banana',
    'Bacon com cebola caramelizada e queijo coalho',
  ],
  doces: [
    'Doce de leite',
    'Doce de leite com nozes',
  ],
  especialTropical: {
    name: 'Tropical',
    price: 2.30,
    description: 'Peito de peru + abacaxi caramelizado + uvas passas selecionadas. Uma explosão natalina e refrescante!',
  },
};

export const ANTEPASTOS: AntepastoItem[] = [
  {
    id: 'antepasto-vinagrete-lombinho',
    name: 'Vinagrete de lombinho agridoce',
    price500g: 70.00,
    price1kg: 130.00,
    description: 'Lombinho nobre desfiado com pimentões coloridos, cebola fresca, azeite extravirgem e toque agridoce secreto.',
  },
  {
    id: 'antepasto-caponata-berinjela',
    name: 'Caponata de berinjela',
    price500g: 60.00,
    price1kg: 115.00,
    description: 'Berinjelas assadas lentamente com azeite, pimentões, uvas passas, castanhas e ervas aromáticas.',
  },
  {
    id: 'antepasto-carne-maluca',
    name: 'Carne maluca',
    price500g: 75.00,
    price1kg: 140.00,
    description: 'Carne bovina de primeira desfiada, marinada em molho rico com azeitonas fatiadas, pimentões, cebola e azeite nobre.',
    image: CATALOG_IMAGES.antepastoCarneMaluca,
  },
  {
    id: 'antepasto-tomate-confit',
    name: 'Tomate confit com creme de ricota artesanal',
    price500g: 70.00,
    price1kg: 130.00,
    description: 'Tomatinhos confitados lentamente em azeite de oliva e ervas frescas, servidos com creme de ricota artesanal da casa.',
  },
];

export const TACAS_GOURMET: TacaGourmetItem[] = [
  {
    id: 'taca-camarao-caprese',
    name: 'Camarão Caprese',
    weight: '1.250g',
    price: 180.00,
    ingredients: [
      'Camarão selecionado',
      'Molho pesto artesanal',
      'Tomate confit',
      'Nozes e castanhas picadas',
      'Creme de ricota artesanal',
      'Cream cheese cremoso',
    ],
    description: 'Apresentação nobre em taça de pedestal. Camadas aromáticas de camarão suculento ao pesto genovês, contraste de tomates confitados e crocância de castanhas nobres.',
    image: CATALOG_IMAGES.tacaGourmet,
  },
  {
    id: 'taca-salmao-agridoce',
    name: 'Salmão Agridoce',
    weight: '1.250g',
    price: 180.00,
    ingredients: [
      'Salmão grelhado',
      'Alho poró confitado',
      'Tomate confit',
      'Geleia de maracujá especial',
      'Crocante de nozes',
      'Creme de ricota artesanal',
      'Cream cheese',
    ],
    description: 'Salmão fresco grelhado em lascas nobres com perfume de alho poró, tomates confit e o brilho tropical da geleia de maracujá sobre bases aveludadas.',
    image: CATALOG_IMAGES.tacaGourmet,
  },
  {
    id: 'taca-mix-agridoce',
    name: 'Mix Agridoce',
    weight: '1.250g',
    price: 180.00,
    ingredients: [
      'Salame italiano curado',
      'Pepperoni',
      'Lombinho defumado',
      'Geleia de pimenta artesanal',
      'Mix de castanhas picadas',
      'Creme de ricota artesanal',
      'Cream cheese',
    ],
    description: 'Para amantes de charcutaria fina: charcutaria nobre italiana com a picância elegante da geleia de pimenta e a textura aveludada do cream cheese.',
    image: CATALOG_IMAGES.tacaGourmet,
  },
];
