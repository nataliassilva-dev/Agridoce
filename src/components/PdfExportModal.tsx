import React, { useState } from 'react';
import {
  FileDown,
  X,
  CheckCircle,
  Loader2,
  Printer,
  Sparkles,
  AlertCircle,
  Download,
  ExternalLink,
  Eye,
  Image as ImageIcon,
} from 'lucide-react';
import { generateDirectPdf, PdfGenerationProgress, GeneratedPdfResult } from '../utils/pdfGenerator';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prepareForPdf: () => void;
  restoreAfterPdf: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  prepareForPdf,
  restoreAfterPdf,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressInfo, setProgressInfo] = useState<PdfGenerationProgress>({
    status: 'idle',
    progress: 0,
    message: '',
  });
  const [pdfResult, setPdfResult] = useState<GeneratedPdfResult | null>(null);
  const [activeTab, setActiveTab] = useState<'download' | 'preview' | 'images'>('download');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentAppUrl = typeof window !== 'undefined' ? window.location.href : '#';

  const handleStartDirectDownload = async () => {
    setIsGenerating(true);
    setProgressInfo({
      status: 'preparing',
      progress: 5,
      message: 'Organizando as 3 páginas para o PDF...',
    });

    try {
      prepareForPdf();

      // Give 450ms for images and layout to settle
      await new Promise((resolve) => setTimeout(resolve, 450));

      const result = await generateDirectPdf((prog) => {
        setProgressInfo(prog);
      });

      setPdfResult(result);
      setIsGenerating(false);
    } catch (err: any) {
      console.error(err);
      setIsGenerating(false);
      setProgressInfo({
        status: 'error',
        progress: 0,
        message: 'Houve uma restrição de download no ambiente de visualização.',
      });
      restoreAfterPdf();
    }
  };

  const handleBrowserPrint = () => {
    prepareForPdf();
    onClose();
    setTimeout(() => {
      window.print();
    }, 350);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fade-in no-print"
      onClick={!isGenerating ? onClose : undefined}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#e8dfd3] rounded-2xl shadow-2xl overflow-hidden text-stone-800 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#072a1f] p-4 sm:p-5 text-white flex items-center justify-between border-b border-[#cfa24b]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0b3b2c] border border-[#cfa24b]/40 rounded-lg text-[#dfb55f]">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#fcfaf7]">
                Catálogo em PDF (3 Páginas)
              </h3>
              <span className="text-xs text-[#dfb55f]">
                Agridoce Gourmet • Natal & Réveillon
              </span>
            </div>
          </div>
          {!isGenerating && (
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Essential Notice: Opening in New Tab Bypass Sandbox */}
        <div className="bg-[#fcfaf7] border-b border-[#e8dfd3] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-[#b3822c] shrink-0" />
            <span>Para baixar direto sem bloqueio do painel de teste:</span>
          </div>
          <a
            href={currentAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0b3b2c] hover:text-[#072a1f] underline decoration-[#cfa24b] decoration-2"
          >
            <span>Abrir em Nova Aba</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {isGenerating ? (
            /* Progress view */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0b3b2c]/10 flex items-center justify-center text-[#0b3b2c]">
                <Loader2 className="w-8 h-8 animate-spin text-[#b3822c]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif-luxury text-xl font-bold text-[#072a1f]">
                  Gerando seu Catálogo em PDF...
                </h4>
                <p className="text-xs text-stone-600">
                  {progressInfo.message || 'Renderizando fotos e cardápio em alta definição...'}
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#b3822c] to-[#dfb55f] transition-all duration-300 rounded-full"
                    style={{ width: `${progressInfo.progress}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-stone-500 mt-1 block">
                  {progressInfo.progress}% concluído
                </span>
              </div>
            </div>
          ) : pdfResult ? (
            /* Generated Result with Multi-Option Viewer & Download */
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    Catálogo de 3 Páginas processado com sucesso!
                  </span>
                </div>
                <a
                  href={pdfResult.blobUrl}
                  download="Catalogo_Agridoce_Gourmet_Natal_Reveillon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#0b3b2c] text-white hover:bg-[#072a1f] rounded-lg font-bold flex items-center gap-1.5 shadow-2xs text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfb55f]" />
                  <span>Baixar Arquivo</span>
                </a>
              </div>

              {/* View mode tabs for the generated PDF */}
              <div className="flex border-b border-stone-200 gap-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('download')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'download'
                      ? 'border-b-2 border-[#0b3b2c] text-[#0b3b2c]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Opções de Download
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('images')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'images'
                      ? 'border-b-2 border-[#0b3b2c] text-[#0b3b2c]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Ver Imagens das 3 Páginas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'border-b-2 border-[#0b3b2c] text-[#0b3b2c]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Visualizador Integrado
                </button>
              </div>

              {activeTab === 'download' && (
                <div className="space-y-4 pt-1">
                  <div className="bg-[#fcfaf7] border border-[#e5dccf] rounded-xl p-4 space-y-3">
                    <h5 className="font-serif-luxury text-base font-bold text-[#072a1f]">
                      Escolha a forma mais conveniente para você:
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Option 1: Direct Link */}
                      <a
                        href={pdfResult.blobUrl}
                        download="Catalogo_Agridoce_Gourmet_Natal_Reveillon.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-[#dfd5c5] hover:border-[#0b3b2c] rounded-xl flex flex-col justify-between gap-2 shadow-2xs group cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-[#0b3b2c] group-hover:text-[#b3822c]">
                            <Download className="w-4 h-4" />
                            <span>Download do Arquivo .PDF</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Salva o arquivo completo de 3 páginas diretamente.
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700">
                          Clique para baixar
                        </span>
                      </a>

                      {/* Option 2: Open in new window */}
                      <a
                        href={pdfResult.dataUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-[#dfd5c5] hover:border-[#0b3b2c] rounded-xl flex flex-col justify-between gap-2 shadow-2xs group cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-[#0b3b2c] group-hover:text-[#b3822c]">
                            <Eye className="w-4 h-4" />
                            <span>Abrir PDF em Nova Aba</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Abre o visualizador nativo de PDF do seu navegador.
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-[#b3822c]">
                          Abrir leitor nativo
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp friendly tip */}
                  <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      Dica para enviar no WhatsApp:
                    </span>
                    <p className="leading-relaxed">
                      Você pode tanto anexar o arquivo <strong>PDF</strong> quanto salvar as <strong>3 imagens das páginas</strong> (na aba acima "Ver Imagens das 3 Páginas"), que muitos clientes adoram visualizar direto na galeria!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'images' && (
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>Clique na página para visualizar ou salvar a imagem:</span>
                    <div className="inline-flex gap-1">
                      {pdfResult.pageImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                            selectedImageIndex === idx
                              ? 'bg-[#0b3b2c] text-[#dfb55f]'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          Pág {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border border-stone-300 rounded-xl overflow-hidden bg-stone-100 flex flex-col items-center p-2 max-h-[380px] overflow-y-auto">
                    <img
                      src={pdfResult.pageImages[selectedImageIndex]}
                      alt={`Página ${selectedImageIndex + 1}`}
                      className="max-w-full h-auto rounded shadow-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-stone-500 italic">
                      Dica: você também pode clicar com o botão direito na imagem e escolher "Salvar imagem como...".
                    </span>
                    <a
                      href={pdfResult.pageImages[selectedImageIndex]}
                      download={`Catalogo_Agridoce_Pagina_${selectedImageIndex + 1}.jpg`}
                      className="px-3.5 py-2 bg-[#0b3b2c] text-white hover:bg-[#072a1f] rounded-lg font-bold flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#dfb55f]" />
                      <span>Baixar Imagem da Pág {selectedImageIndex + 1}</span>
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="border border-stone-300 rounded-xl overflow-hidden h-[360px] bg-stone-100">
                  <iframe
                    src={pdfResult.dataUri}
                    title="Catálogo PDF"
                    className="w-full h-full border-0"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Initial View */
            <>
              <p className="text-sm text-stone-700 leading-relaxed">
                Gere o arquivo PDF oficial com as <strong>3 páginas completas</strong> do catálogo festivo da <strong>Agridoce Gourmet</strong>.
              </p>

              <div className="bg-[#faf6ed] border border-[#dfd5c5] rounded-xl p-4 space-y-3">
                <div className="font-semibold text-[#072a1f] text-xs flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#b3822c]" />
                  <span>Como garantir o download sem bloqueios:</span>
                </div>
                <div className="text-xs text-stone-700 space-y-2">
                  <p>
                    1. <strong>Download Automático:</strong> Clique no botão dourado abaixo para gerar e baixar o arquivo <code>.pdf</code>.
                  </p>
                  <p>
                    2. <strong>Se o seu navegador bloquear o download dentro do painel:</strong> Abra o aplicativo em uma nova aba clicando em{' '}
                    <a
                      href={currentAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#0b3b2c] underline"
                    >
                      "Abrir em Nova Aba"
                    </a>{' '}
                    onde todas as permissões de download e impressão funcionam 100%.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isGenerating && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handleBrowserPrint}
              className="text-xs text-stone-600 hover:text-[#0b3b2c] font-medium flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir pelo Navegador (Ctrl+P)</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Fechar
              </button>

              {!pdfResult && (
                <button
                  type="button"
                  onClick={handleStartDirectDownload}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#dfb55f] to-[#cfa24b] text-[#072a1f] hover:brightness-105 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Download className="w-4 h-4 text-[#072a1f]" />
                  <span>Gerar e Baixar Catálogo</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
