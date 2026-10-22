import React from 'react';
import { BookOpen, ScrollText, Calendar, Sparkles, Search } from 'lucide-react';
import { DEADLINES } from '../data/catalogData';

interface CatalogNavToolbarProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  viewMode: 'pages' | 'continuous';
  setViewMode: (mode: 'pages' | 'continuous') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenPdf: () => void;
}

export const CatalogNavToolbar: React.FC<CatalogNavToolbarProps> = ({
  currentPage,
  setCurrentPage,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onOpenPdf,
}) => {
  return (
    <div className="bg-[#f4efe6] border-b border-[#e5dccf] py-3.5 px-4 sm:px-6 lg:px-8 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Prazos quick pill-free banner */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700">
          <div className="flex items-center gap-1.5 font-medium text-[#0b3b2c]">
            <Calendar className="w-3.5 h-3.5 text-[#b3822c]" />
            <span className="font-semibold">Prazos de Encomenda:</span>
          </div>
          <span>
            <strong className="text-stone-900">Natal:</strong> {DEADLINES.natal}
          </span>
          <span className="text-stone-400" aria-hidden="true">·</span>
          <span>
            <strong className="text-stone-900">Réveillon:</strong> {DEADLINES.reveillon}
          </span>
          <span className="text-stone-400" aria-hidden="true">·</span>
          <span className="text-stone-500 italic">Vagas limitadas</span>
        </div>

        {/* Dynamic Controls: Mode switcher & Page tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sabor (ex: Camarão, Bacalhau)..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0b3b2c] w-40 sm:w-56 placeholder:text-stone-400 text-stone-800"
            />
          </div>

          {/* Quick PDF button */}
          <button
            onClick={onOpenPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] border border-[#cfa24b]/40 rounded-lg shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
            title="Salvar como PDF em alta resolução"
          >
            <ScrollText className="w-3.5 h-3.5 text-[#dfb55f]" />
            <span>Gerar PDF</span>
          </button>

          {/* View Mode Segmented Control */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-lg">
            <button
              onClick={() => setViewMode('pages')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'pages'
                  ? 'bg-white text-[#0b3b2c] shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Folhear por páginas (1 a 3)"
            >
              <BookOpen className="w-3 h-3 text-[#b3822c]" />
              <span>Por Página (1 a 3)</span>
            </button>
            <button
              onClick={() => setViewMode('continuous')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'continuous'
                  ? 'bg-white text-[#0b3b2c] shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Visualização contínua de todas as páginas"
            >
              <ScrollText className="w-3 h-3 text-[#b3822c]" />
              <span>Todas as Páginas</span>
            </button>
          </div>

          {/* Page Selector (active in page mode) */}
          {viewMode === 'pages' && (
            <div className="inline-flex p-1 bg-[#0b3b2c]/10 rounded-lg">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 1
                    ? 'bg-[#0b3b2c] text-[#dfb55f] shadow-xs font-bold'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Pág 1
              </button>
              <button
                onClick={() => {
                  setCurrentPage(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 2
                    ? 'bg-[#0b3b2c] text-[#dfb55f] shadow-xs font-bold'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Pág 2
              </button>
              <button
                onClick={() => {
                  setCurrentPage(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 3
                    ? 'bg-[#0b3b2c] text-[#dfb55f] shadow-xs font-bold'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Pág 3
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
