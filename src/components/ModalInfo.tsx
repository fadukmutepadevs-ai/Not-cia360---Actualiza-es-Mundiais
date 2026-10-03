import React from 'react';
import { X, ShieldCheck, Mail, Info } from 'lucide-react';

export type TipoModalInfo = 'sobre' | 'contacto' | 'privacidade' | null;

interface ModalInfoProps {
  tipo: TipoModalInfo;
  onFechar: () => void;
}

export const ModalInfo: React.FC<ModalInfoProps> = ({ tipo, onFechar }) => {
  if (!tipo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-xl border border-stone-200">
        <div className="bg-stone-50 border-b border-stone-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-stone-900">
            {tipo === 'sobre' && <Info className="w-5 h-5 text-red-700" />}
            {tipo === 'contacto' && <Mail className="w-5 h-5 text-red-700" />}
            {tipo === 'privacidade' && <ShieldCheck className="w-5 h-5 text-red-700" />}
            <span className="capitalize">
              {tipo === 'sobre' && 'Sobre o Notícias Mundiais'}
              {tipo === 'contacto' && 'Contacto da Redacção'}
              {tipo === 'privacidade' && 'Política de Privacidade & Dados'}
            </span>
          </div>

          <button
            onClick={onFechar}
            className="text-stone-400 hover:text-stone-700 p-1 rounded"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 text-sm text-stone-700 space-y-3 leading-relaxed">
          {tipo === 'sobre' && (
            <>
              <p className="font-semibold text-stone-900">
                Notícias Mundiais — Informação rápida. O mundo em foco.
              </p>
              <p>
                O Notícias Mundiais é um portal de jornalismo concebido com foco estrito em rapidez, eficiência de dados e clareza informativa.
              </p>
              <p>
                A nossa missão é disponibilizar notícias verificadas sobre Moçambique, África e o Mundo com o menor tempo de carregamento possível, permitindo o acesso fluido mesmo em conexões móveis lentas ou limitadas.
              </p>
              <p className="text-xs text-stone-500 pt-2 border-t border-stone-100">
                Desenvolvido com arquitectura minimalista e zero scripts de rastreamento intrusivo.
              </p>
            </>
          )}

          {tipo === 'contacto' && (
            <>
              <p className="font-semibold text-stone-900">
                Fale com a equipa editorial
              </p>
              <p>
                Para sugestões de pauta, correcções, direito de resposta ou contactos institucionais:
              </p>
              <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1 text-xs sm:text-sm">
                <p><strong>Redacção Geral:</strong> redaccao@noticiasmundiais.mz</p>
                <p><strong>Maputo, Moçambique:</strong> Av. 25 de Setembro, Maputo</p>
                <p><strong>Horário de Plantão:</strong> 06:00 às 22:00 (CAT)</p>
              </div>
              <p className="text-xs text-stone-500">
                Respondemos a todas as mensagens com brevidade.
              </p>
            </>
          )}

          {tipo === 'privacidade' && (
            <>
              <p className="font-semibold text-stone-900">
                Compromisso com a Privacidade e Baixo Tráfego
              </p>
              <p>
                O portal Notícias Mundiais respeita integralmente a privacidade dos utilizadores.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Não utilizamos cookies de terceiros para publicidade comportamental invasiva.</li>
                <li>As preferências de leitura (como Modo Economia de Dados) são guardadas exclusivamente no navegador local do utilizador.</li>
                <li>Não recolhemos dados pessoais sensíveis sem autorização prévia e expressa.</li>
              </ul>
              <p className="text-xs text-stone-500 pt-2">
                Última actualização: Setembro de 2026.
              </p>
            </>
          )}
        </div>

        <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onFechar}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
