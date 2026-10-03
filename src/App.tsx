/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Categoria, Noticia } from './types/noticia';
import { noticiasIniciais } from './data/noticias';
import { Header } from './components/Header';
import { CategoriasNav } from './components/CategoriasNav';
import { DestaquePrincipal } from './components/DestaquePrincipal';
import { UltimasNoticias } from './components/UltimasNoticias';
import { ModalArtigo } from './components/ModalArtigo';
import { ModalInfo, TipoModalInfo } from './components/ModalInfo';
import { Footer } from './components/Footer';
import { Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { obterNoticias } from './data/noticias';

export default function App() {
  // Lista de notícias (facilmente conectável a API/Banco de dados)
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciais);

  // Estados de navegação e filtros
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>('Todas');
  const [busca, setBusca] = useState<string>('');
  const [noticiaLeitor, setNoticiaLeitor] = useState<Noticia | null>(null);
  const [modalInfo, setModalInfo] = useState<TipoModalInfo>(null);
  const [aActualizar, setAActualizar] = useState<boolean>(false);

  // Actualização inteira do site (recarregamento total da página de forma instantânea)
  const handleActualizarSite = () => {
    if (aActualizar) return;
    setAActualizar(true);

    // Feedback imediato no botão e recarregamento integral da página
    setTimeout(() => {
      try {
        window.location.reload();
      } catch {
        window.location.href = window.location.href;
      }
    }, 120);
  };

  // Modo economia de dados com persistência em localStorage para acessos rápidos
  const [modoEconomiaDados, setModoEconomiaDados] = useState<boolean>(() => {
    try {
      return localStorage.getItem('noticia360_data_saver') === 'true';
    } catch {
      return false;
    }
  });

  const handleAlternarEconomiaDados = () => {
    setModoEconomiaDados((prev) => {
      const proximo = !prev;
      try {
        localStorage.setItem('noticia360_data_saver', String(proximo));
      } catch {
        // Ignorar em caso de restrições de storage
      }
      return proximo;
    });
  };

  // Rolagem suave e rápida ao topo
  const handleVoltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Contagem de notícias por categoria para navegação rápida
  const contagensPorCategoria = useMemo(() => {
    const mapa: Record<string, number> = { Todas: noticias.length };
    for (const item of noticias) {
      mapa[item.categoria] = (mapa[item.categoria] || 0) + 1;
    }
    return mapa;
  }, [noticias]);

  // Filtro de notícias com base na categoria ativa e termo de busca
  const noticiasFiltradas = useMemo(() => {
    let resultado = noticias;

    // Filtro por categoria
    if (categoriaAtiva !== 'Todas') {
      resultado = resultado.filter((n) => n.categoria === categoriaAtiva);
    }

    // Filtro por busca rápida
    if (busca.trim()) {
      const termo = busca.toLowerCase().trim();
      resultado = resultado.filter(
        (n) =>
          n.titulo.toLowerCase().includes(termo) ||
          n.resumo.toLowerCase().includes(termo) ||
          n.categoria.toLowerCase().includes(termo) ||
          (n.tags && n.tags.some((t) => t.toLowerCase().includes(termo)))
      );
    }

    return resultado;
  }, [noticias, categoriaAtiva, busca]);

  // Notícia principal em destaque
  // Se estiver em 'Todas' e sem busca, usa a notícia com flag destaque=true.
  // Se houver filtro de categoria e notícias disponíveis, destaca a primeira daquela categoria.
  const noticiaDestaque = useMemo(() => {
    if (busca.trim()) {
      return null; // Quando em busca, exibe todas em formato de lista direta
    }

    if (categoriaAtiva === 'Todas') {
      return noticias.find((n) => n.destaque) || noticias[0];
    }

    return noticiasFiltradas[0] || null;
  }, [noticias, noticiasFiltradas, categoriaAtiva, busca]);

  // Notícias secundárias para a seção "Últimas Notícias"
  const noticiasSecundarias = useMemo(() => {
    if (busca.trim()) {
      return noticiasFiltradas;
    }

    if (!noticiaDestaque) {
      return noticiasFiltradas;
    }

    // Exclui a que já está em destaque para evitar duplicação visual
    return noticiasFiltradas.filter((n) => n.id !== noticiaDestaque.id);
  }, [noticiasFiltradas, noticiaDestaque, busca]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Link de acessibilidade para saltar directo para o conteúdo */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-red-700 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Saltar para o conteúdo principal
      </a>

      {/* 1. HEADER */}
      <Header
        categoriaAtiva={categoriaAtiva}
        onSelecionarCategoria={(cat) => {
          setCategoriaAtiva(cat);
          setBusca('');
        }}
        modoEconomiaDados={modoEconomiaDados}
        onAlternarEconomiaDados={handleAlternarEconomiaDados}
        busca={busca}
        onAlterarBusca={setBusca}
      />

      {/* 4. BARRA DE CATEGORIAS */}
      <CategoriasNav
        categoriaAtiva={categoriaAtiva}
        onSelecionarCategoria={(cat) => {
          setCategoriaAtiva(cat);
          setBusca('');
        }}
        contagens={contagensPorCategoria}
      />

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main id="conteudo-principal" className="flex-1 max-w-6xl w-full mx-auto px-4 py-2 sm:py-4">
        {/* Aviso amigável caso busca activa */}
        {busca.trim() && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 mb-6 flex items-center justify-between text-xs sm:text-sm">
            <span>
              A pesquisar por: <strong>"{busca}"</strong> ({noticiasFiltradas.length} encontradas)
            </span>
            <button
              onClick={() => setBusca('')}
              className="text-red-700 font-bold hover:underline cursor-pointer"
            >
              Limpar pesquisa
            </button>
          </div>
        )}

        {/* Notificação discreta de modo poupança quando ativo */}
        {modoEconomiaDados && (
          <div className="bg-stone-100 border border-stone-300 rounded px-3 py-1.5 mb-5 flex items-center justify-between text-xs text-stone-700">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <strong>Modo Economia de Dados activo:</strong> Imagens desativadas para carregamento instantâneo e menor consumo do plano móvel.
            </span>
            <button
              onClick={handleAlternarEconomiaDados}
              className="text-red-700 font-semibold hover:underline cursor-pointer shrink-0 ml-2"
            >
              Ver imagens
            </button>
          </div>
        )}

        {/* 2. DESTAQUE PRINCIPAL */}
        {noticiaDestaque && !busca.trim() && (
          <DestaquePrincipal
            noticia={noticiaDestaque}
            onAbrirNoticia={(n) => setNoticiaLeitor(n)}
            modoEconomiaDados={modoEconomiaDados}
            onActualizarSite={handleActualizarSite}
            aActualizar={aActualizar}
          />
        )}

        {/* 3. ÚLTIMAS NOTÍCIAS */}
        <UltimasNoticias
          noticias={noticiasSecundarias}
          onAbrirNoticia={(n) => setNoticiaLeitor(n)}
          modoEconomiaDados={modoEconomiaDados}
          tituloSecao={
            busca.trim()
              ? `Resultados da Pesquisa (${noticiasFiltradas.length})`
              : categoriaAtiva === 'Todas'
              ? 'Últimas Notícias'
              : `Últimas de ${categoriaAtiva}`
          }
        />
      </main>

      {/* 5. RODAPÉ */}
      <Footer
        onAbrirInfo={(tipo) => setModalInfo(tipo)}
        onVoltarAoTopo={handleVoltarAoTopo}
      />

      {/* MODAL DE LEITURA COMPLETA DA NOTÍCIA */}
      {noticiaLeitor && (
        <ModalArtigo
          noticia={noticiaLeitor}
          onFechar={() => setNoticiaLeitor(null)}
          modoEconomiaDados={modoEconomiaDados}
        />
      )}

      {/* MODAL INSTITUCIONAL (SOBRE, CONTACTO, PRIVACIDADE) */}
      <ModalInfo
        tipo={modalInfo}
        onFechar={() => setModalInfo(null)}
      />
    </div>
  );
}
