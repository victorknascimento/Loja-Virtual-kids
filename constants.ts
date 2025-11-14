
import { Product } from './types';

export const STORE_PHONE = "5585999195930";
export const STORE_ADDRESS = "R. Maria Júlia, 676 - Bom jardim, Fortaleza";

export const OPERATING_HOURS = {
  morning: { start: 8, end: 12 },
  afternoon: { start: 14, end: 18 },
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Conjunto Verão Menina',
    description: 'Lindo conjunto de blusa e shorts para os dias quentes de verão. 100% algodão.',
    price: 89.90,
    imageUrl: 'https://picsum.photos/seed/prod1/400/400',
    category: 'Meninas'
  },
  {
    id: '2',
    name: 'Vestido Floral Infantil',
    description: 'Vestido rodado com estampa floral colorida. Perfeito para festas e passeios.',
    price: 129.90,
    imageUrl: 'https://picsum.photos/seed/prod2/400/400',
    category: 'Meninas'
  },
  {
    id: '3',
    name: 'Camiseta Dinossauro Menino',
    description: 'Camiseta divertida com estampa de dinossauro que brilha no escuro.',
    price: 59.90,
    imageUrl: 'https://picsum.photos/seed/prod3/400/400',
    category: 'Meninos'
  },
  {
    id: '4',
    name: 'Bermuda Jeans Infantil',
    description: 'Bermuda jeans com lavagem moderna e tecido confortável. Super versátil.',
    price: 79.90,
    imageUrl: 'https://picsum.photos/seed/prod4/400/400',
    category: 'Meninos'
  },
  {
    id: '5',
    name: 'Macacão Bebê Unissex',
    description: 'Macacão de malha suave, ideal para o conforto do seu bebê. Com botões de pressão.',
    price: 69.90,
    imageUrl: 'https://picsum.photos/seed/prod5/400/400',
    category: 'Bebês'
  },
  {
    id: '6',
    name: 'Sandália Infantil Colorida',
    description: 'Sandália divertida e confortável para as aventuras do dia a dia.',
    price: 49.90,
    imageUrl: 'https://picsum.photos/seed/prod6/400/400',
    category: 'Calçados'
  },
  {
    id: '7',
    name: 'Conjunto Moletom Menino',
    description: 'Conjunto de moletom flanelado, quentinho e estiloso para o inverno.',
    price: 149.90,
    imageUrl: 'https://picsum.photos/seed/prod7/400/400',
    category: 'Meninos'
  },
  {
    id: '8',
    name: 'Legging Estampada Menina',
    description: 'Legging confortável com estampa de unicórnios. Ideal para brincar.',
    price: 45.90,
    imageUrl: 'https://picsum.photos/seed/prod8/400/400',
    category: 'Meninas'
  },
  {
    id: '9',
    name: 'Body Bebê Manga Longa',
    description: 'Kit com 2 bodies de manga longa em algodão egípcio.',
    price: 79.90,
    imageUrl: 'https://picsum.photos/seed/prod9/400/400',
    category: 'Bebês'
  },
  {
    id: '10',
    name: 'Tênis de Led Infantil',
    description: 'Tênis com luzes de led que piscam a cada passo. A diversão é garantida!',
    price: 119.90,
    imageUrl: 'https://picsum.photos/seed/prod10/400/400',
    category: 'Calçados'
  },
  {
    id: '11',
    name: 'Polo Infantil Menino',
    description: 'Camisa polo em piquet, perfeita para ocasiões especiais.',
    price: 69.90,
    imageUrl: 'https://picsum.photos/seed/prod11/400/400',
    category: 'Meninos'
  },
  {
    id: '12',
    name: 'Jardineira Jeans Menina',
    description: 'Jardineira jeans super charmosa e ajustável. Combina com tudo.',
    price: 110.00,
    imageUrl: 'https://picsum.photos/seed/prod12/400/400',
    category: 'Meninas'
  }
];
