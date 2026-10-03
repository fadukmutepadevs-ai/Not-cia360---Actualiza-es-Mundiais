import React from 'react';
import { Noticia } from '../types/noticia';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { tratarErroImagem } from '../utils/imageFallback';

interface UltimasNoticiasProps {
  noticias: Noticia[];
  onAbrirNoticia: (noticia: Noticia) => void;
  modoEconomiaDados: boolean;
  tituloSecao?: string;
}

export const UltimasNoticias: React.FC<UltimasNoticiasProps> = ({
  noticias,
  onAbrirNoticia,
  modoEconomiaDados,
  tituloSecao = 'Últimas Notícias',
}) => {
  if (noticias.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded p-8 text-center my-6">
        <p className="text-stone-600 font-medium text-sm">
          Nenhuma notícia encontrada para os critérios selecionados.
        </p>
      </div>
    );
  }

  return (
    <section className="mb-10" aria-labelledby="ultimas-noticias-heading">
      <div className="flex items-center justify-between border-b-2 border-stone-900 pb-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-700"></span>
          <h2
            id="ultimas-noticias-heading"
            className="text-xl sm:text-2xl font-black text-stone-900 uppercase tracking-tight"
          >
            {tituloSecao}
          </h2>
        </div>
        <span className="text-xs text-stone-500 font-medium">
          {noticias.length} {noticias.length === 1 ? 'notícia' : 'notícias'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {noticias.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-stone-200 rounded p-4 sm:p-5 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all group"
          >
            <div>
              {/* Cabeçalho da Notícia: Categoria e Data/Hora */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2 gap-2 flex-wrap">
                <span className="font-bold text-red-700 uppercase tracking-wide text-[11px] bg-red-50 px-2 py-0.5 rounded">
                  {item.categoria}
                </span>

                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {item.data}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {item.hora}
                  </span>
                </div>
              </div>

              {/* Corpo com Título, Resumo e Imagem Opcional */}
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-stone-900 text-base sm:text-lg leading-snug mb-2 group-hover:text-red-700 transition-colors">
                    <button
                      onClick={() => onAbrirNoticia(item)}
                      className="text-left cursor-pointer hover:underline"
                    >
                      {item.titulo}
                    </button>
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3">
                    {item.resumo}
                  </p>
                </div>

                {!modoEconomiaDados && item.imagem && (
                  <div className="shrink-0 w-24 h-20 sm:w-28 sm:h-24 bg-stone-100 rounded overflow-hidden">
                    <img
                      src={item.imagem}
                      alt={item.imagemAlt}
                      loading="lazy"
                      decoding="async"
                      width="112"
                      height="96"
                      onError={(e) => tratarErroImagem(e, item.categoria)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                {item.tempoLeitura} • {item.autor}
              </span>

              <button
                onClick={() => onAbrirNoticia(item)}
                className="text-xs font-bold text-red-700 hover:text-red-800 inline-flex items-center gap-1 cursor-pointer"
                aria-label={`Ler notícia completa: ${item.titulo}`}
              >
                <span>Ler mais</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
