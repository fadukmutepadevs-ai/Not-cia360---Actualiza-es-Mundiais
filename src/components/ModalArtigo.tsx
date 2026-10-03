import React, { useState, useEffect } from 'react';
import { Noticia } from '../types/noticia';
import { X, ArrowLeft, Calendar, Clock, Share2, Check, Tag } from 'lucide-react';
import { tratarErroImagem } from '../utils/imageFallback';

interface ModalArtigoProps {
  noticia: Noticia | null;
  onFechar: () => void;
  modoEconomiaDados: boolean;
}

export const ModalArtigo: React.FC<ModalArtigoProps> = ({
  noticia,
  onFechar,
  modoEconomiaDados,
}) => {
  const [tamanhoFonte, setTamanhoFonte] = useState<'normal' | 'medio' | 'grande'>('normal');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (noticia) {
      document.body.style.overflow = 'hidden';
      // Atualizar título temporariamente para acessibilidade
      document.title = `${noticia.titulo} — Notícias Mundiais`;
    } else {
      document.body.style.overflow = '';
      document.title = 'Notícias Mundiais — Informação rápida. O mundo em foco.';
    }

    return () => {
      document.body.style.overflow = '';
      document.title = 'Notícias Mundiais — Informação rápida. O mundo em foco.';
    };
  }, [noticia]);

  if (!noticia) return null;

  const handleCompartilhar = async () => {
    const shareData = {
      title: noticia.titulo,
      text: noticia.resumo,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Ignorar cancelamento
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${noticia.titulo} - ${window.location.href}`);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      } catch {
        // Fallback
      }
    }
  };

  const tamanhoClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    medio: 'text-lg sm:text-xl leading-relaxed',
    grande: 'text-xl sm:text-2xl leading-loose',
  }[tamanhoFonte];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex justify-center items-start overflow-y-auto p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div className="bg-white rounded-lg max-w-3xl w-full my-4 overflow-hidden shadow-2xl border border-stone-200">
        {/* Barra superior de acções */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onFechar}
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-red-700 font-bold text-xs sm:text-sm cursor-pointer p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao portal</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Ajuste de tamanho da fonte para leitura confortável */}
            <div className="hidden xs:flex items-center bg-stone-200 rounded p-0.5 text-xs font-bold text-stone-700">
              <button
                onClick={() => setTamanhoFonte('normal')}
                className={`px-2 py-0.5 rounded cursor-pointer ${tamanhoFonte === 'normal' ? 'bg-white shadow-xs' : 'hover:text-black'}`}
                title="Tamanho de texto normal"
              >
                A
              </button>
              <button
                onClick={() => setTamanhoFonte('medio')}
                className={`px-2 py-0.5 rounded cursor-pointer ${tamanhoFonte === 'medio' ? 'bg-white shadow-xs' : 'hover:text-black'}`}
                title="Tamanho de texto médio"
              >
                A+
              </button>
              <button
                onClick={() => setTamanhoFonte('grande')}
                className={`px-2 py-0.5 rounded cursor-pointer ${tamanhoFonte === 'grande' ? 'bg-white shadow-xs' : 'hover:text-black'}`}
                title="Tamanho de texto grande"
              >
                A++
              </button>
            </div>

            {/* Compartilhar */}
            <button
              onClick={handleCompartilhar}
              className="inline-flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-2 py-1 rounded cursor-pointer"
              title="Compartilhar notícia"
            >
              {copiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiado ? 'Copiado!' : 'Partilhar'}</span>
            </button>

            {/* Fechar */}
            <button
              onClick={onFechar}
              className="p-1 rounded text-stone-400 hover:text-stone-800 hover:bg-stone-200"
              aria-label="Fechar artigo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo do Artigo */}
        <article className="p-5 sm:p-8 md:p-10">
          <div className="mb-4">
            <span className="bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              {noticia.categoria}
            </span>
          </div>

          <h1
            id="modal-titulo"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-4"
          >
            {noticia.titulo}
          </h1>

          <div className="flex items-center gap-3 text-xs text-stone-500 pb-4 mb-6 border-b border-stone-200 flex-wrap">
            <span className="font-semibold text-stone-800">Por {noticia.autor}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {noticia.data}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {noticia.hora}
            </span>
            <span>•</span>
            <span>{noticia.tempoLeitura} de leitura</span>
          </div>

          {!modoEconomiaDados && (
            <figure className="mb-6 rounded overflow-hidden bg-stone-100">
              <img
                src={noticia.imagem}
                alt={noticia.imagemAlt}
                width="800"
                height="450"
                onError={(e) => tratarErroImagem(e, noticia.categoria)}
                className="w-full max-h-[420px] object-cover"
              />
              <figcaption className="text-xs text-stone-500 py-1.5 px-2 bg-stone-50 border-t border-stone-100">
                {noticia.imagemAlt}
              </figcaption>
            </figure>
          )}

          {/* Destaque / Lead */}
          <p className="text-base sm:text-lg font-medium text-stone-800 leading-relaxed mb-6 italic border-l-4 border-red-700 pl-4 py-1 bg-stone-50">
            {noticia.resumo}
          </p>

          {/* Parágrafos completos */}
          <div className={`space-y-4 text-stone-800 ${tamanhoClasses}`}>
            {noticia.conteudoCompleto.map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))}
          </div>

          {/* Tags */}
          {noticia.tags && (
            <div className="mt-8 pt-4 border-t border-stone-200">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Tópicos relacionados:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {noticia.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded"
                  >
                    <Tag className="w-3 h-3 text-stone-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-stone-200 flex justify-between items-center">
            <span className="text-xs text-stone-400">
              Notícias Mundiais • Informação rápida
            </span>
            <button
              onClick={onFechar}
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded cursor-pointer"
            >
              Fechar artigo
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
