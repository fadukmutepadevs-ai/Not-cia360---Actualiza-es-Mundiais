import React from 'react';
import { Noticia } from '../types/noticia';
import { Clock, Calendar, ArrowRight, Tag, RefreshCw } from 'lucide-react';
import { tratarErroImagem } from '../utils/imageFallback';

interface DestaquePrincipalProps {
  noticia: Noticia;
  onAbrirNoticia: (noticia: Noticia) => void;
  modoEconomiaDados: boolean;
  onActualizarSite?: () => void;
  aActualizar?: boolean;
}

export const DestaquePrincipal: React.FC<DestaquePrincipalProps> = ({
  noticia,
  onAbrirNoticia,
  modoEconomiaDados,
  onActualizarSite,
  aActualizar = false,
}) => {
  return (
    <article
      className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs hover:border-stone-300 transition-all mb-8"
      aria-labelledby="destaque-titulo"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Imagem do destaque ou visualizador leve */}
        <div className="lg:col-span-7 bg-stone-100 relative overflow-hidden flex items-center justify-center min-h-[240px] sm:min-h-[340px]">
          {modoEconomiaDados ? (
            <div className="p-8 text-center text-stone-500 w-full flex flex-col items-center justify-center">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded">
                Modo Poupança Ativo
              </span>
              <p className="text-xs text-stone-600 mt-2 max-w-sm">
                Imagem oculta para poupança de dados e carregamento instantâneo.
              </p>
            </div>
          ) : (
            <img
              src={noticia.imagem}
              alt={noticia.imagemAlt}
              width="800"
              height="450"
              fetchPriority="high"
              decoding="async"
              onError={(e) => tratarErroImagem(e, noticia.categoria)}
              className="w-full h-full object-cover max-h-[420px]"
            />
          )}

          {/* Barra superior de acção sobre a imagem: Categoria e Botão de Actualizar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <span className="bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md border border-red-800/40">
                {noticia.categoria}
              </span>
            </div>

            {onActualizarSite && (
              <div className="pointer-events-auto">
                <button
                  type="button"
                  onClick={onActualizarSite}
                  disabled={aActualizar}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold shadow-lg transition-all cursor-pointer border ${
                    aActualizar
                      ? 'bg-amber-600 text-white border-amber-500 scale-95 ring-2 ring-amber-300'
                      : 'bg-stone-900/90 hover:bg-red-700 text-white border-white/25 hover:border-red-400 backdrop-blur-xs active:scale-95'
                  }`}
                  title="Actualizar página e notícias em tempo recorde"
                  aria-label="Actualizar página do site"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      aActualizar
                        ? 'animate-spin text-white'
                        : 'text-emerald-400 group-hover:text-white'
                    }`}
                  />
                  <span>{aActualizar ? 'A actualizar...' : 'Actualizar site'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Informações da notícia em destaque */}
        <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-stone-500 mb-2.5 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {noticia.data}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {noticia.hora}
              </span>
              <span>•</span>
              <span className="text-stone-600 font-medium">
                {noticia.tempoLeitura}
              </span>
            </div>

            <h1
              id="destaque-titulo"
              className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight mb-3.5 hover:text-red-700 transition-colors"
            >
              <button
                onClick={() => onAbrirNoticia(noticia)}
                className="text-left cursor-pointer hover:underline"
              >
                {noticia.titulo}
              </button>
            </h1>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
              {noticia.resumo}
            </p>

            {noticia.tags && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {noticia.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">
              Por {noticia.autor}
            </span>

            <button
              onClick={() => onAbrirNoticia(noticia)}
              className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded transition-colors shadow-xs cursor-pointer group"
            >
              <span>Ler notícia</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
