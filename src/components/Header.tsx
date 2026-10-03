import React, { useState } from 'react';
import { Categoria } from '../types/noticia';
import { Menu, X, Zap, Search, Globe, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  categoriaAtiva: Categoria;
  onSelecionarCategoria: (categoria: Categoria) => void;
  modoEconomiaDados: boolean;
  onAlternarEconomiaDados: () => void;
  busca: string;
  onAlterarBusca: (termo: string) => void;
}

const itensMenu: { label: string; categoria: Categoria }[] = [
  { label: 'Início', categoria: 'Todas' },
  { label: 'Moçambique', categoria: 'Moçambique' },
  { label: 'Mundo', categoria: 'Mundo' },
  { label: 'Desporto', categoria: 'Desporto' },
  { label: 'Tecnologia', categoria: 'Tecnologia' },
  { label: 'Economia', categoria: 'Economia' },
];

export const Header: React.FC<HeaderProps> = ({
  categoriaAtiva,
  onSelecionarCategoria,
  modoEconomiaDados,
  onAlternarEconomiaDados,
  busca,
  onAlterarBusca,
}) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarBusca, setMostrarBusca] = useState(false);

  const dataAtualFormatada = new Intl.DateTimeFormat('pt-MZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const handleSelectCategory = (cat: Categoria) => {
    onSelecionarCategoria(cat);
    setMenuAberto(false);
  };

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-30 shadow-xs">
      {/* Barra superior de status & velocidade */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1 px-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 tracking-wide font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase text-[11px] font-bold text-red-400">Actualizações em Tempo Real</span>
          <span className="hidden sm:inline text-stone-400">|</span>
          <span className="hidden sm:inline text-stone-300 capitalize">{dataAtualFormatada}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Alternador de Economia de Dados para internet lenta */}
          <button
            onClick={onAlternarEconomiaDados}
            title={modoEconomiaDados ? 'Desativar modo economia de dados' : 'Ativar modo economia de dados (oculta imagens para menor consumo)'}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              modoEconomiaDados
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-stone-300 hover:text-white bg-stone-800'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span className="hidden xs:inline">Modo Leve:</span>
            <span>{modoEconomiaDados ? 'Ativo' : 'Poupança'}</span>
          </button>
        </div>
      </div>

      {/* Identidade do Portal */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div>
          <button
            onClick={() => handleSelectCategory('Todas')}
            className="text-left group cursor-pointer"
            aria-label="Ir para a página inicial da Notícias Mundiais"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-black tracking-tight">
                <span className="text-red-700">Notícias</span>{' '}
                <span className="text-stone-900">Mundiais</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium tracking-tight">
              Informação rápida. O mundo em foco.
            </p>
          </button>
        </div>

        {/* Ferramentas rápidas de cabeçalho */}
        <div className="flex items-center gap-2">
          {/* Campo de pesquisa rápida */}
          <div className="relative">
            {mostrarBusca ? (
              <div className="flex items-center border border-stone-300 rounded bg-stone-50 px-2 py-1 text-sm">
                <Search className="w-4 h-4 text-stone-500 mr-1.5 shrink-0" />
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => onAlterarBusca(e.target.value)}
                  placeholder="Pesquisar notícias..."
                  className="bg-transparent border-none outline-none text-stone-800 text-xs sm:text-sm w-36 sm:w-52"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setMostrarBusca(false);
                    onAlterarBusca('');
                  }}
                  className="text-stone-400 hover:text-stone-700 p-0.5 ml-1"
                  aria-label="Fechar pesquisa"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setMostrarBusca(true)}
                className="p-1.5 text-stone-700 hover:text-red-700 hover:bg-stone-100 rounded transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                aria-label="Abrir pesquisa rápida"
                title="Pesquisar notícias"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Pesquisar</span>
              </button>
            )}
          </div>

          {/* Botão de Menu Compacto para Telas Móveis */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 text-stone-800 hover:bg-stone-100 rounded focus:outline-none"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu de navegação'}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Principal (Desktop) */}
      <nav className="hidden md:block bg-stone-100 border-t border-b border-stone-200" aria-label="Navegação Principal">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 sm:space-x-4">
            {itensMenu.map((item) => {
              const ativo = categoriaAtiva === item.categoria;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleSelectCategory(item.categoria)}
                    className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
                      ativo
                        ? 'border-red-700 text-red-700 bg-white'
                        : 'border-transparent text-stone-700 hover:text-red-700 hover:border-stone-300'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Ultra-rápido • Baixo consumo de dados</span>
          </div>
        </div>
      </nav>

      {/* Menu Compacto (Mobile Drawer) */}
      {menuAberto && (
        <div className="md:hidden bg-stone-100 border-b border-stone-300 px-4 py-3 shadow-inner">
          <div className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-2">
            Categorias
          </div>
          <div className="grid grid-cols-2 gap-2">
            {itensMenu.map((item) => {
              const ativo = categoriaAtiva === item.categoria;
              return (
                <button
                  key={item.label}
                  onClick={() => handleSelectCategory(item.categoria)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                    ativo
                      ? 'bg-red-700 text-white font-bold'
                      : 'bg-white text-stone-800 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
            <span>Actualizações Globais</span>
            <span>Notícias Mundiais © 2026</span>
          </div>
        </div>
      )}
    </header>
  );
};
