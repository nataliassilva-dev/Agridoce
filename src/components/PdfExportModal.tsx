import React from 'react';
import { FileDown, X, CheckCircle, Printer, Sparkles } from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPdf: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  onConfirmPdf,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in no-print"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-[#e8dfd3] rounded-2xl shadow-2xl overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#072a1f] p-5 text-white flex items-center justify-between border-b border-[#cfa24b]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0b3b2c] border border-[#cfa24b]/40 rounded-lg text-[#dfb55f]">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#fcfaf7]">
                Salvar Catálogo em PDF
              </h3>
              <span className="text-xs text-[#dfb55f]">
                3 Páginas Oficiais de Natal e Réveillon
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <p className="text-sm text-stone-700 leading-relaxed">
              O catálogo da <strong>Agridoce Gourmet</strong> já está diagramado em <strong>3 páginas A4 perfeitas</strong> com fotos em alta definição, cardápio de tortas, entradas, taças gourmet e regras de encomenda.
            </p>
          </div>

          <div className="bg-[#fcfaf7] border border-[#dfd5c5] rounded-xl p-4 space-y-2.5 text-xs text-stone-700">
            <div className="font-semibold text-[#0b3b2c] text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#b3822c]" />
              <span>Dicas para o melhor PDF:</span>
            </div>
            <ul className="space-y-2 text-stone-600 pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  No campo <strong>Destino</strong> da tela que vai abrir, selecione <strong>"Salvar como PDF"</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Em <strong>Mais definições</strong>, certifique-se de marcar <strong>"Gráficos de segundo plano"</strong> para preservar as cores e fotos douradas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Margens: marque <strong>"Padrão"</strong> ou <strong>"Nenhuma"</strong> para preenchimento ideal.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConfirmPdf();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#dfb55f] to-[#cfa24b] text-[#072a1f] hover:brightness-105 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Abrir e Salvar em PDF Agora</span>
          </button>
        </div>
      </div>
    </div>
  );
};
