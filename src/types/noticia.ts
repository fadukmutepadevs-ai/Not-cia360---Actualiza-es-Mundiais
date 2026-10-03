export type Categoria = 'Todas' | 'Moçambique' | 'Mundo' | 'Desporto' | 'Tecnologia' | 'Economia';

export interface Noticia {
  id: string;
  titulo: string;
  categoria: 'Moçambique' | 'Mundo' | 'Desporto' | 'Tecnologia' | 'Economia';
  data: string;
  hora: string;
  imagem: string;
  imagemAlt: string;
  resumo: string;
  conteudoCompleto: string[];
  destaque?: boolean;
  autor: string;
  tempoLeitura: string;
  tags?: string[];
}
