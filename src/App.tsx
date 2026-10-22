import React, { useState } from 'react';
import { OrderProvider, useOrder } from './context/OrderContext';
import { Header } from './components/Header';
import { CatalogNavToolbar } from './components/CatalogNavToolbar';
import { Page1Tortas } from './components/Page1Tortas';
import { Page2Entradas } from './components/Page2Entradas';
import { Page3Celebracoes } from './components/Page3Celebracoes';
import { OrderDrawer } from './components/OrderDrawer';
import { PhotoLightbox } from './components/PhotoLightbox';
import { PdfExportModal } from './components/PdfExportModal';
import { ShoppingBag, ChevronLeft, ChevronRight, Phone, Clock, MapPin, Heart, FileDown } from 'lucide-react';

function CatalogContent() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'pages' | 'continuous'>('pages');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const { totalItems, totalValue, setIsCartOpen } = useOrder();

  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExecutePdfGeneration = () => {
    setViewMode('continuous');
    setSearchQuery('');
    setTimeout(() => {
      window.print();
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-800">
      {/* Top Header strictly adhering to Top Bar Contract */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenPdf={() => setIsPdfModalOpen(true)}
      />

      {/* Secondary Catalog Nav Toolbar */}
      <CatalogNavToolbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenPdf={() => setIsPdfModalOpen(true)}
      />

      {/* Main Catalog Display Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {viewMode === 'pages' ? (
          <div>
            {/* Quick Page Indicator Pills */}
            <div className="flex items-center justify-between mb-4 px-2 no-print">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-[#0b3b2c]">
                  Página {currentPage} de 3
                </span>
                <span>·</span>
                <span>
                  {currentPage === 1 && 'Tortas Salgadas & Quiches Artesanais'}
                  {currentPage === 2 && 'Folhados, Barquetes & Mini Quiches'}
                  {currentPage === 3 && 'Taças Gourmet, Antepastos & Como Encomendar'}
                </span>
              </div>

              {/* Prev / Next Page Quick Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                    currentPage === 1
                      ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                  title="Página Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage === 3}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                    currentPage === 3
                      ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                      : 'border-[#dfb55f] bg-[#0b3b2c] text-[#dfb55f] hover:bg-[#072a1f]'
                  }`}
                  title="Próxima Página"
                >
                  <span className="hidden sm:inline font-semibold">Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Page Component */}
            {currentPage === 1 && (
              <Page1Tortas
                searchQuery={searchQuery}
                onNextPage={handleNextPage}
                isContinuous={false}
              />
            )}
            {currentPage === 2 && (
              <Page2Entradas
                searchQuery={searchQuery}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                isContinuous={false}
              />
            )}
            {currentPage === 3 && (
              <Page3Celebracoes
                searchQuery={searchQuery}
                onPrevPage={handlePrevPage}
                isContinuous={false}
              />
            )}
          </div>
        ) : (
          /* Continuous Scroll: Shows all 3 pages one after another for full catalog browsing & PDF printing */
          <div className="space-y-10">
            <Page1Tortas searchQuery={searchQuery} isContinuous={true} />
            <Page2Entradas searchQuery={searchQuery} isContinuous={true} />
            <Page3Celebracoes searchQuery={searchQuery} isContinuous={true} />
          </div>
        )}
      </main>

      {/* Floating Bottom Bar for Mobile or Instant Order Action */}
      {totalItems > 0 && (
        <div className="sticky bottom-4 z-30 max-w-xl mx-auto w-full px-4 no-print animate-fade-in">
          <div className="bg-[#072a1f] text-[#fcfaf7] border border-[#cfa24b]/40 shadow-2xl rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#dfb55f]">
                  Sua Encomenda:
                </span>
                <span className="text-xs bg-[#0b3b2c] px-2 py-0.5 rounded text-stone-200 tabular-nums">
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <div className="font-serif-luxury text-xl font-bold text-white tabular-nums">
                Total: R$ {totalValue.toFixed(2).replace('.', ',')}
                <span className="text-xs font-normal text-stone-300 ml-2">
                  (Sinal 50%: R$ {(totalValue * 0.5).toFixed(2).replace('.', ',')})
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#dfb55f] to-[#cfa24b] text-[#072a1f] font-semibold text-xs sm:text-sm rounded-xl shadow hover:brightness-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Concluir</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#072a1f] text-stone-300 border-t border-[#cfa24b]/30 py-10 px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img
                src="/assets/aistudio/WhatsApp_Image1_2026-10-19_at_19.08.06_96f0e25a.jpeg"
                alt="Agridoce Gourmet"
                className="w-8 h-8 rounded-full border border-[#cfa24b]/40 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif-luxury text-2xl font-bold text-[#dfb55f]">
                Agridoce Gourmet
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm">
              Gastronomia artesanal para celebrar seus melhores momentos com requinte e sabor inesquecível.
            </p>
          </div>

          {/* Quick Info */}
          <div className="space-y-1.5 text-xs text-stone-300">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#dfb55f]">
              <Clock className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">Prazos de Encomenda:</span>
            </div>
            <p>Natal: Até 10 de Dezembro</p>
            <p>Réveillon: Até 15 de Dezembro</p>
            <p className="text-stone-400 italic">Sinal de 50% para confirmação</p>
          </div>

          {/* Closing message */}
          <div className="space-y-2 text-center md:text-right">
            <p className="font-serif-luxury italic text-base text-[#dfb55f]">
              “Será um prazer fazer parte das suas celebrações!”
            </p>
            <p className="text-[11px] text-stone-500">
              © {new Date().getFullYear()} Agridoce Gourmet. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <OrderDrawer />
      <PhotoLightbox />
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onConfirmPdf={handleExecutePdfGeneration}
      />
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <CatalogContent />
    </OrderProvider>
  );
}
