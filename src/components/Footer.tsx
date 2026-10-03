import React from 'react';
import { TipoModalInfo } from './ModalInfo';
import { Zap, ArrowUp } from 'lucide-react';

interface FooterProps {
  onAbrirInfo: (tipo: TipoModalInfo) => void;
  onVoltarAoTopo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAbrirInfo, onVoltarAoTopo }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-8 pb-10 border-t border-stone-800" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4">
        {/* Linha superior com logo resumido e voltar ao topo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight">
                <span className="text-red-500">Notícias</span>{' '}
                <span className="text-white">Mundiais</span>
              </span>
              <span className="text-stone-500 text-xs font-mono">• Edição Global</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              "Informação rápida. O mundo em foco."
            </p>
          </div>

          <button
            onClick={onVoltarAoTopo}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Voltar ao topo</span>
          </button>
        </div>

        {/* Linha de links e direitos reservados */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-stone-400 text-center md:text-left">
            © 2026 Notícias Mundiais — Todos os direitos reservados.
          </p>

          <nav aria-label="Links Institucionais" className="flex items-center space-x-6">
            <button
              onClick={() => onAbrirInfo('sobre')}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Sobre
            </button>
            <button
              onClick={() => onAbrirInfo('contacto')}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Contacto
            </button>
            <button
              onClick={() => onAbrirInfo('privacidade')}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
          </nav>
        </div>

        {/* Indicador de sustentabilidade e performance web */}
        <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center justify-center text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400" />
            Página otimizada para baixo consumo de dados e alta velocidade de resposta.
          </span>
        </div>
      </div>
    </footer>
  );
};
