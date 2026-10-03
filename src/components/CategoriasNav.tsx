import React from 'react';
import { Categoria } from '../types/noticia';

interface CategoriasNavProps {
  categoriaAtiva: Categoria;
  onSelecionarCategoria: (categoria: Categoria) => void;
  contagens: Record<string, number>;
}

const listaCategorias: Categoria[] = [
  'Todas',
  'Moçambique',
  'Mundo',
  'Desporto',
  'Economia',
  'Tecnologia',
];

export const CategoriasNav: React.FC<CategoriasNavProps> = ({
  categoriaAtiva,
  onSelecionarCategoria,
  contagens,
}) => {
  return (
    <section className="bg-white border-y border-stone-200 py-2.5 my-4" aria-label="Filtrar por Categoria">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
            Categorias:
          </span>
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            {listaCategorias.map((cat, idx) => {
              const ativa = categoriaAtiva === cat;
              const count = contagens[cat] ?? 0;

              return (
                <React.Fragment key={cat}>
                  <button
                    onClick={() => onSelecionarCategoria(cat)}
                    className={`text-xs sm:text-sm px-2.5 py-1 rounded transition-colors font-medium whitespace-nowrap cursor-pointer ${
                      ativa
                        ? 'bg-red-700 text-white font-bold shadow-xs'
                        : 'text-stone-700 hover:text-red-700 hover:bg-stone-100'
                    }`}
                    aria-pressed={ativa}
                  >
                    {cat}
                    {count > 0 && cat !== 'Todas' && (
                      <span
                        className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                          ativa ? 'bg-red-800 text-white' : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                  {idx < listaCategorias.length - 1 && (
                    <span className="text-stone-300 select-none hidden sm:inline">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {categoriaAtiva !== 'Todas' && (
          <button
            onClick={() => onSelecionarCategoria('Todas')}
            className="text-xs text-red-700 hover:underline font-medium shrink-0 cursor-pointer"
          >
            Limpar filtro (Ver todas)
          </button>
        )}
      </div>
    </section>
  );
};
