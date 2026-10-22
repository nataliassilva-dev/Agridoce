import { ShoppingBag, Printer, ExternalLink } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

interface HeaderProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  viewMode: 'pages' | 'continuous';
  setViewMode: (mode: 'pages' | 'continuous') => void;
  onOpenPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  viewMode,
  setViewMode,
  onOpenPdf,
}) => {
  const { totalItems, totalValue, setIsCartOpen } = useOrder();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '#';

  return (
    <header className="sticky top-0 z-40 bg-[#072a1f]/95 backdrop-blur-md border-b border-[#cfa24b]/30 text-[#fcfaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-full border border-[#cfa24b]/40 overflow-hidden flex items-center justify-center bg-[#0b3b2c] p-0.5 shadow-sm">
              <img
                src="/assets/aistudio/WhatsApp_Image1_2026-10-19_at_19.08.06_96f0e25a.jpeg"
                alt="Agridoce Gourmet"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif-luxury text-2xl md:text-3xl font-semibold tracking-wide text-[#dfb55f] group-hover:text-amber-300 transition-colors">
              Agridoce Gourmet
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-200">
            <button
              onClick={() => {
                setCurrentPage(1);
                if (viewMode === 'continuous') {
                  document.getElementById('pagina-1')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`hover:text-[#dfb55f] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 1 && viewMode === 'pages' ? 'text-[#dfb55f] border-b-2 border-[#dfb55f]' : ''
              }`}
            >
              Tortas & Quiches
            </button>
            <button
              onClick={() => {
                setCurrentPage(2);
                if (viewMode === 'continuous') {
                  document.getElementById('pagina-2')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`hover:text-[#dfb55f] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 2 && viewMode === 'pages' ? 'text-[#dfb55f] border-b-2 border-[#dfb55f]' : ''
              }`}
            >
              Folhados & Entradas
            </button>
            <button
              onClick={() => {
                setCurrentPage(3);
                if (viewMode === 'continuous') {
                  document.getElementById('pagina-3')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`hover:text-[#dfb55f] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 3 && viewMode === 'pages' ? 'text-[#dfb55f] border-b-2 border-[#dfb55f]' : ''
              }`}
            >
              Taças & Antepastos
            </button>
            <button
              onClick={() => {
                setCurrentPage(3);
                setTimeout(() => {
                  document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-[#dfb55f] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer"
            >
              Prazos & Encomendas
            </button>
          </nav>

          {/* Zone 3: 1 primary action & PDF helpers */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir catálogo em tela cheia / nova aba para download livre de bloqueios"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-white bg-[#0b3b2c] border border-[#cfa24b]/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#dfb55f]" />
              <span>Nova Aba</span>
            </a>

            <button
              onClick={onOpenPdf}
              title="Baixar ou Salvar o Catálogo em PDF"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#072a1f] bg-[#dfb55f] hover:bg-amber-300 rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Baixar em PDF</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide text-white bg-[#0b3b2c] border border-[#cfa24b]/50 rounded-lg shadow-sm hover:border-[#dfb55f] active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#dfb55f]" />
              <span className="hidden sm:inline">Minha Encomenda</span>
              {totalItems > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[11px] font-bold bg-[#dfb55f] text-[#072a1f] rounded-full tabular-nums">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
